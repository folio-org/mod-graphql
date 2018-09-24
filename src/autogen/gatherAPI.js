const _ = require('lodash');
const $RefParser = require('json-schema-ref-parser-sync');


function gatherComments(api, _options) {
  const comments = [];

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const val = api.specification[tag];
    comments.push([tag, typeof val === 'string' ? [val] : val]);
  });

  return comments;
}


// Converts the small, fixed set of well-known basic types from RAML
// These are documented at https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#scalar-types
// No attempt at this stage to support union types such as "nil | string".
//
function r2gBasicType(type) {
  const map = {
    'any': null,
    'string': 'String',
    'number': 'Float',
    'integer': 'Int',
    'boolean': 'Boolean',
    'date-only': null,
    'time-only': null,
    'datetime-only': null,
    'datetime': null,
    'file': null,
    'nil': null,
    // There is no JSON Schema equivalent of GraphQL's "ID" type
  };

  const res = map[type];
  if (res) {
    return res;
  } else if (res === null) {
    throw new Error(`use of unsupported RAML type '${type}'`);
  }

  if (type !== undefined) {
    console.warn(`no GraphQL map for JSON-Schema basic type '${type}'`);
  }

  return null;
}


// Converts schema-names, which function as types
function r2gDefinedType(type) {
  // A lot of our schemas have logical names that end with
  // ".json". That is an implementation detail that we don't need
  // polluting our GraphQL type names.
  // See https://github.com/folio-org/mod-inventory-storage/commit/b609ff9b64e62a9294a8c98bb9669f0834249ef2
  return `T${type.replace(/\.json$/, '').replace(/[.-]/, '_')}`;
}


function gatherType(jsonSchema) {
  let res;

  if (jsonSchema.type === 'array') {
    res = gatherType(jsonSchema.items || {});
    if (!res) return null;
    res[0]++; // increment level
  } else if (jsonSchema.type === 'object') {
    // eslint-disable-next-line no-use-before-define
    res = [0, gatherFields(jsonSchema)];
  } else {
    if (typeof jsonSchema.type === 'object') {
      // Problem caused by one of the eHoldings schemas
      throw new Error('type is an object: ' + JSON.stringify(jsonSchema.type, null, 2));
    }
    const inner = r2gBasicType(jsonSchema.type);
    if (!inner) return null;
    res = [0, inner];
  }

  if (jsonSchema['folio:isVirtual']) {
    res.push({
      base:      jsonSchema['folio:linkBase'],
      fromField: jsonSchema['folio:linkFromField'],
      toField:   jsonSchema['folio:linkToField'],
      include:   jsonSchema['folio:includedElement'],
    });
  }

  return res;
}


function gatherFields(jsonSchema) {
  // assert(jsonSchema.type === 'object');

  const required = {};
  (jsonSchema.required || []).forEach(key => {
    required[key] = true;
  });

  const result = [];
  const keys = Object.keys(jsonSchema.properties);
  const sorted = keys.sort();
  // console.log('  2 gatherFields, sorted =', sorted);
  sorted.forEach(name => {
    const t = gatherType(jsonSchema.properties[name]);
    if (t) {
      const [arrayDepth, type, link] = t;
      result.push({
        name: name.replace('@', '_'),
        required: required[name] || false,
        arrayDepth,
        type,
        link
      });
    }
  });

  return result;
}


// If the body has no data for type application/jason, return null
// Otherwise, return an object of two keys describing the schema for that response:
//      schemaName: name of the schema, or undefined if there is none
//      schemaContent: JSON content of the schema
//
// For some reason, the structure that gets built when reading a RAML
// 0.8 file has the JSON Schema included directly in the body
// specification, whereas when reading a RAML 1.0 file, only the
// _name_ of the schema is included -- so we need to look it up in the
// separate registry of RAML 1.0 types. This registry is undefined
// when reading RAML 0.8, so we can know which version of RAML we're
// working with.
//
function findBodySchema(body, raml10types) {
  let typeNameCounter = 0;
  function generateSchemaName() {
    typeNameCounter++;
    return `generated${typeNameCounter}`;
  }

  const bodyJSON = (body || []).filter(b => (b.name === 'application/json' ||
                                             b.name === 'application/vnd.api+json'));
  if (bodyJSON.length > 1) {
    console.error('multiple JSON bodies');
  } else if (bodyJSON.length === 0) {
    return null;
  }

  const ajBody = bodyJSON[0];
  let schemaText, schemaName;

  if (raml10types) {
    schemaName = ajBody.type[0];
    const list = raml10types[schemaName];
    if (list && _.isArray(list) && list.length === 1 && list[0] !== 'any') {
      schemaText = list[0];
    } else {
      schemaName = undefined; // indicate error to caller
    }
  } else {
    schemaText = ajBody.schemaContent;
    if (schemaText) {
      // For some reason, raml-1-parser sets the schema name equal
      // to its context if it appears inline. In this case assign
      // a random name.
      schemaName = (ajBody.schema === schemaText) ? generateSchemaName() : ajBody.schema;
    }
  }

  return {
    schemaName,
    schemaText,
  };
}


function findResponseSchema(resource, raml10types) {
  // The response schema can be provided at two different levels,
  // either specific to response-code 200 or generic to the endpoint.
  // We look in both candidate locations, from the most specific
  // upwards, and return the first one we find. If we can't find a
  // specification for a suitable response, just return null.

  const getMethods = (resource.methods || []).filter(m => m.method === 'get');
  if (getMethods.length > 1) {
    console.error('multiple get methods');
  }
  if (getMethods.length > 0) {
    const method = getMethods[0];
    const response200 = (method.responses || []).filter(r => r.code === '200');
    if (response200.length > 1) {
      console.error('multiple 200 responses');
    }
    if (response200.length > 0) {
      const response = response200[0];
      const res = findBodySchema(response.body, raml10types);
      if (res) return res;
    }
    if (method.body) {
      const res = findBodySchema(method.body, raml10types);
      if (res) return res;
    }
  }

  return null;
}


function rewriteObjRefs(obj, basePath) {
  const keys = Object.keys(obj);
  keys.forEach(k => {
    if (k === '$ref') {
      obj[k] = `${basePath}/${obj[k]}`;
    } else if (Array.isArray(obj[k])) {
      // eslint-disable-next-line no-use-before-define
      rewriteArrayRefs(obj[k], basePath);
    } else if (obj[k] instanceof Object) {
      rewriteObjRefs(obj[k], basePath);
    }
  });
}


function rewriteArrayRefs(arr, basePath) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      rewriteArrayRefs(arr[i], basePath);
    } else if (arr[i] instanceof Object) {
      rewriteObjRefs(arr[i], basePath);
    }
  }
}


const util = require('util');


function gatherResource(raml10types, resource, basePath, types, options, level = 0) {
  const result = { level };
  const parentUri = resource.parentUri;

  const methods = resource.methods || [];
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.method === 'get').forEach((method) => {
    const args = [];

    const re = /\/{(.*?)}/;
    let queryPath = parentUri + resource.relativeUri;
    let match;
    // eslint-disable-next-line no-cond-assign
    while (match = queryPath.match(re)) {
      args.push([match[1], 'String', true]);
      queryPath = queryPath.replace(re, '_SINGLE');
    }

    (method.queryParameters || []).forEach((qp) => {
      args.push([
        qp.name.replace(/[[\]]/g, '_'),
        r2gBasicType(qp.type) || 'String',
        qp.required || false
      ]);
    });

    // eslint-disable-next-line no-useless-escape
    result.queryName = queryPath.substr(1).replace(/[\/-]/g, '_');
    result.args = args;
    result.url = resource.completeRelativeUri.replace(/^\//, '');
    // eslint-disable-next-line no-useless-escape
    if (resource.displayName.match(/^[^\/]/)) {
      result.displayName = resource.displayName;
    }

    const schemaInfo = findResponseSchema(resource, raml10types);
    if (!schemaInfo) {
      options.logger.log('nojson', `no JSON body for resource ${result.url}: skipping`);
    } else {
      const { schemaName, schemaText } = schemaInfo;
      if (!schemaName) {
        if (!options.allowSchemaless) {
          throw new Error(`no schema for '${result.queryName}': cannot find get/responses/200/body/schema or get/body/schema in ${JSON.stringify(resource, null, 2)}`);
        }
      } else {
        // We shouldn't have to do this, but for some idiot reason when
        // raml.loadSync is unable to respolve a schema, it just sets
        // the schema-content to a "cannot resolve" message instead of
        // throwing an exception.
        if (schemaText.startsWith('Can not resolve ')) throw new Error(schemaText);

        // We have to rewrite every $ref in this schema to be relative to
        // `basePath`: it does not suffice to insert a suitable "id" at
        // the top level of the schema, as the json-schema-ref-parser
        // library simply does not support id: see
        // https://github.com/BigstickCarpet/json-schema-ref-parser/issues/22#issuecomment-231783185
        const obj = JSON.parse(schemaText);
        options.logger.log('rewrite', `schema from ${JSON.stringify(obj, null, 2)}`);
        rewriteObjRefs(obj, basePath);
        options.logger.log('rewrite', `schema to ${JSON.stringify(obj, null, 2)}`);
        const expanded = $RefParser.dereference(obj);
        const string = util.inspect(expanded, { compact: false, depth: Infinity });
        options.logger.log('expand', `dereferenced schema to ${string}`);

        result.type = r2gDefinedType(schemaName);
        if (types[result.type]) {
          // Down the line, we could verify that old and new definitions are the same
          console.warn(`replacing existing schema for type '${result.type}'`);
        }
        types[result.type] = gatherFields(expanded);
      }
    }
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(raml10types, sub, basePath, types, options, level + 1));
  });

  return result;
}


function flattenResources(resources) {
  const result = [];

  resources.forEach(resource => {
    const copy = Object.assign({}, resource);
    const subResources = copy.subResources;
    delete copy.subResources;
    if (copy.queryName && copy.type) result.push(copy);
    const tmp = flattenResources(subResources);
    tmp.forEach(subResource => {
      result.push(subResource);
    });
  });

  return result;
}


function gatherAllResources(api, basePath, types, options) {
  const ast = api.specification.types;
  const raml10types = !ast ? undefined : _.mapValues(_.keyBy(ast, 'name'), 'type');
  const resources = api.specification.resources.map(r => gatherResource(raml10types, r, basePath, types, options));
  return flattenResources(resources);
}


function gatherAPI(api, basePath, options) {
  const types = {};
  return {
    comments: gatherComments(api, options),
    resources: gatherAllResources(api, basePath, types, options),
    types
  };
}


exports.gatherAPI = gatherAPI;
