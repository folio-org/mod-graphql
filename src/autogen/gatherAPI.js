const fs = require('fs');
const _ = require('lodash');


function gatherComments(api, _options) {
  const comments = [];

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const val = api.specification[tag];
    if (val !== undefined) {
      comments.push([tag, typeof val === 'string' ? [val] : val]);
    }
  });

  comments.push(['raml-version', [api.specification.types ? '1.0' : '0.9']]);

  return comments;
}


// Converts the small, fixed set of well-known basic types from RAML
// These are documented at https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#scalar-types
// No attempt at this stage to support union types such as "nil | string".
//
function r2gBasicType(type, items) {
  // In RAML 1.0, the 'type' and 'items' are encoded as single-element arrays
  const xType = (typeof type === 'object') ? type[0] : type;
  const xItems = (typeof items === 'object') ? items[0] : items;

  const isArray = (xType === 'array');
  const actualType = isArray ? xItems : xType;

  const map = {
    'any': null,
    'string': 'String',
    'number': 'Float',
    'integer': 'Int',
    'boolean': 'Boolean',
    'date-only': null,
    'time-only': null,
    'datetime-only': null,
    'datetime': 'String', // Not ideal, but see MODGQL-136
    'file': null,
    'nil': null,
    // There is no JSON Schema equivalent of GraphQL's "ID" type
  };

  const res = map[actualType];
  if (res) {
    return isArray ? `[${res}]` : res;
  } else if (res === null) {
    throw new Error(`use of unsupported RAML type '${type}'`);
  }

  if (type !== undefined) {
    console.warn(`no GraphQL map for JSON-Schema basic type '${type}'`);
    return 'XXX';
  }

  return null;
}


// Converts schema-names, which function as types
function r2gDefinedType(type, removePrefix) {
  // A lot of our schemas have logical names that end with
  // ".json". That is an implementation detail that we don't need
  // polluting our GraphQL type names.
  // See https://github.com/folio-org/mod-inventory-storage/commit/b609ff9b64e62a9294a8c98bb9669f0834249ef2
  const nakedType = type.replace(removePrefix, '');
  const res = `T${nakedType.replace(/\.json$/, '').replace(/[./-]/g, '_')}`;
  // console.log(`r2gDefinedType([${removePrefix}]${nakedType}) -> ${res}`);
  return res;
}


function gatherType(containerName, basePath, jsonSchema) {
  let res;
  let type = jsonSchema.type;
  if (typeof type === 'object') {
    // This seems to be used by the Okapi RAML for union types. Just pick the first
    type = type[0];
  }

  if (type === undefined && jsonSchema.$ref !== undefined) {
    // Some FOLIO modules describe array elements using a $ref but without explicitly giving type: "object"
    // See MODGQL-164 for details.
    console.log('XXX no type defined, using "object" for', jsonSchema);
    type = 'object';
  }

  if (type === 'array') {
    res = gatherType(containerName, basePath, jsonSchema.items || {});
    if (!res) return null;
    res[0]++; // increment level
  } else if (type === 'object') {
    // eslint-disable-next-line no-use-before-define
    res = [0, gatherFields(containerName, basePath, jsonSchema)];
  } else {
    const inner = r2gBasicType(type);
    if (!inner) {
      console.log(`  could not find basic type '${type}' in gatherType for ${containerName}`);
      return null;
    }
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


function gatherFields(containerName, basePath, jsonSchema) {
  const $ref = jsonSchema.$ref || jsonSchema['folio:$ref'];
  if ($ref) {
    // It's a reference to another named schema.
    const res = r2gDefinedType($ref, basePath);
    // console.log(`reference to r2gDefinedType(${$ref}) = '${res}'`);
    return res;
  }

  const required = {};
  (jsonSchema.required || []).forEach(key => {
    required[key] = true;
  });

  const result = [];
  if (jsonSchema.properties) {
    const keys = Object.keys(jsonSchema.properties);
    const sorted = keys.sort();
    sorted.forEach(name => {
      let t;
      try {
        t = gatherType(name, basePath, jsonSchema.properties[name]);
      } catch (e) {
        throw Error(e.message + ' within schema ' + JSON.stringify(jsonSchema, null, 2));
      }
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
  }

  return result;
}


// If the body has no data for type application/json, return null
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


function insertReferencedSchemas(basePath, currentPath, types, options, obj) {
  const keys = Object.keys(obj);
  keys.forEach(k => {
    if (k === '$ref' || k === 'folio:$ref') {
      const schemaName = `${currentPath}/${obj[k]}`;
      options.logger.log('schema', `reading schema '${obj[k]}' from path '${currentPath}'`);
      const schemaText = fs.readFileSync(schemaName, 'utf8');
      // eslint-disable-next-line no-use-before-define
      insertSchema(basePath, schemaName.replace(/(.*)\/.*/, '$1'), types, options, schemaName, schemaText);
      obj[k] = schemaName;
    } else if (Array.isArray(obj[k])) {
      // eslint-disable-next-line no-use-before-define
      insertReferencedSchemasFromArray(basePath, currentPath, types, options, obj[k]);
    } else if (obj[k] instanceof Object) {
      insertReferencedSchemas(basePath, currentPath, types, options, obj[k]);
    }
  });
}


function insertReferencedSchemasFromArray(basePath, currentPath, types, options, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      insertReferencedSchemasFromArray(basePath, currentPath, types, options, arr[i]);
    } else if (arr[i] instanceof Object) {
      insertReferencedSchemas(basePath, currentPath, types, options, arr[i]);
    }
  }
}


function insertSchema(basePath, currentPath, types, options, schemaName, schemaText) {
  // We shouldn't have to do this, but for some idiot reason when
  // raml.loadSync is unable to resolve a schema, it just sets the
  // schema-content to a "cannot resolve" message instead of throwing
  // an exception.
  if (schemaText.startsWith('Can not resolve ')) throw new Error(schemaText);

  const rtype = r2gDefinedType(schemaName, basePath);
  if (types[rtype]) {
    // Down the line, we could verify that old and new definitions are the same
    options.logger.log('replace', `not replacing existing schema for schema '${schemaName}' (${rtype})`);
    return null;
  }

  const obj = JSON.parse(schemaText);
  types[rtype] = 'temporary marker'; // XXX this is ugly.
  options.logger.log('schema', `registering schema '${schemaName}'`);
  insertReferencedSchemas(basePath, currentPath, types, options, obj);
  types[rtype] = gatherFields(rtype, basePath, obj);
  return rtype;
}


function gatherResource(raml10types, resource, basePath, schemaMap, types, options, level = 0) {
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
        r2gBasicType(qp.type, qp.items) || 'String',
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
      if (schemaName) {
        const schemaDir = schemaMap[schemaName];
        const currentPath = (schemaDir && schemaDir !== '.') ? `${basePath}/${schemaDir}` : basePath;
        // console.log(`* schema '${schemaName}' with dir '${schemaDir}': currentPath = '${currentPath}'`);
        result.type = insertSchema(basePath, currentPath, types, options, schemaName, schemaText);
      } else if (!options.allowSchemaless) {
        throw new Error(`no schema for '${result.queryName}': cannot find get/responses/200/body/schema or get/body/schema for '${result.url}'`);
      }
    }
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(raml10types, sub, basePath, schemaMap, types, options, level + 1));
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


function gatherAllResources(api, basePath, schemaMap, types, options) {
  const ast = api.specification.types;
  const raml10types = !ast ? undefined : _.mapValues(_.keyBy(ast, 'name'), 'type');
  const resources = api.specification.resources.map(r => gatherResource(raml10types, r, basePath, schemaMap, types, options));
  return flattenResources(resources);
}


function gatherAPI(api, basePath, schemaMap, options) {
  const types = {};
  return {
    comments: gatherComments(api, options),
    resources: gatherAllResources(api, basePath, schemaMap, types, options),
    types
  };
}


exports.gatherAPI = gatherAPI;
