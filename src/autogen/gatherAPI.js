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

  return 'Unknown';
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
    res[0]++; // increment level
  } else if (jsonSchema.type === 'object') {
    // eslint-disable-next-line no-use-before-define
    res = [0, gatherFields(jsonSchema)];
  } else {
    res = [0, r2gBasicType(jsonSchema.type)];
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
  Object.keys(jsonSchema.properties).sort().forEach(name => {
    const [arrayDepth, type, link] = gatherType(jsonSchema.properties[name]);
    result.push({
      name: name.replace('@', '_'),
      required: required[name] || false,
      arrayDepth,
      type,
      link
    });
  });

  return result;
}


function findBodySchema(body) {
  let typeNameCounter = 0;
  function generateSchemaName() {
    typeNameCounter++;
    return `generated${typeNameCounter}`;
  }

  const bodyJSON = (body || []).filter(b => b.name === 'application/json');
  if (bodyJSON.length > 1) {
    console.error('multiple application/json bodies');
  }
  if (bodyJSON.length > 0) {
    const ajBody = bodyJSON[0];
    if (ajBody.schemaContent) {
      // For some reason, raml-1-parser sets the schema name equal
      // to its context if it appears inline. In this case assign
      // a random name.
      const schemaText = ajBody.schemaContent;
      const schemaName = (ajBody.schema === schemaText) ? generateSchemaName() : ajBody.schema;
      return {
        schemaName,
        schemaText,
      };
    }
  }

  return null;
}


function findResponseSchema(resource) {
  // The response schema can be provided at several different levels,
  // the lower and more specific overriding the higher and more
  // general. So we look in each candidate location, from the most
  // specific upwards, and return the first one we find.

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
      const res = findBodySchema(response.body);
      if (res) return res;
    }
    if (method.body) {
      const res = findBodySchema(method.body);
      if (res) return res;
    }
  }

  return {
    schemaName: null,
    schemaText: null,
  };
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


function gatherResource(resource, basePath, types, options, level = 0, parentUri = '') {
  const result = { level };
  const rel = resource.relativeUri;
  const uri = parentUri + rel;

  const methods = resource.methods || [];
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.method === 'get').forEach((method) => {
    const args = [];

    result.url = resource.absoluteUri;
    let queryPath;
    if (rel.startsWith('/{')) {
      args.push([rel.replace(/\/{(.*)}/, '$1'), 'String', true]);
      // XXX Consider using https://github.com/blakeembrey/pluralize
      queryPath = `${parentUri}_SINGLE`;
    } else {
      queryPath = uri;
    }

    (method.queryParameters || []).forEach((qp) => {
      args.push([qp.name, r2gBasicType(qp.type) || 'String', qp.required || false]);
    });

    // eslint-disable-next-line no-useless-escape
    result.queryName = queryPath.substr(1).replace(/[\/-]/g, '_');
    result.args = args;
    // eslint-disable-next-line no-useless-escape
    if (resource.displayName.match(/^[^\/]/)) {
      result.displayName = resource.displayName;
    }

    const { schemaName, schemaText } = findResponseSchema(resource);
    if (!schemaName) {
      throw new Error(`no schema for '${result.queryName}': cannot find get/responses/200/body/schema or get/body/schema in ${JSON.stringify(resource, null, 2)}`);
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
      options.logger.log('expand', `dereferenced schema to ${JSON.stringify(expanded, null, 2)}`);

      result.type = r2gDefinedType(schemaName);
      if (types[result.type]) {
        // Down the line, we could verify that old and new definitions are the same
        console.warn(`replacing existing schema for type '${result.type}'`);
      }
      types[result.type] = gatherFields(expanded);
    }
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(sub, basePath, types, options, level + 1, uri));
  });

  return result;
}


function flattenResources(resources) {
  const result = [];

  resources.forEach(resource => {
    const copy = Object.assign({}, resource);
    const subResources = copy.subResources;
    delete copy.subResources;
    if (copy.queryName) result.push(copy);
    const tmp = flattenResources(subResources);
    tmp.forEach(subResource => {
      result.push(subResource);
    });
  });

  return result;
}


function gatherResources(api, basePath, types, options) {
  const resources = api.specification.resources.map(r => gatherResource(r, basePath, types, options));
  return flattenResources(resources, options);
}


function gatherAPI(api, basePath, options) {
  const types = {};
  return {
    comments: gatherComments(api, options),
    resources: gatherResources(api, basePath, types, options),
    types
  };
}


exports.gatherAPI = gatherAPI;
