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
    console.error(`use of unsupported RAML type '${type}'`);
  }

  return 'Unknown';
}


// Converts schema-names, which function as types
function r2gDefinedType(type) {
  return `T${type.replace('.', '-')}`;
}


// Gathers the specified schema, and stores it in `types` as
// `name`. May recursively gather sub-schemas and store those under
// appropriate names as well.
//
function gatherSchema(types, name, jsonSchema) {
  // console.log(JSON.stringify(jsonSchema, null, 20));
  if (jsonSchema.type !== 'object') {
    console.error('schema for non-object');
  }

  if (types[name]) {
    // Down the line, we could verify that old and new definitions are the same
    console.warn(`replacing existing schema for type '${name}'`);
  }

  // XXX do it
  types[name] = null;
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
      const bodyJSON = (response.body || []).filter(b => b.name === 'application/json');
      if (bodyJSON.length > 1) {
        console.error('multiple application/json bodies');
      }
      if (bodyJSON.length > 0) {
        const body = bodyJSON[0];
        if (body.schemaContent) {
          return {
            schemaName: body.schema,
            schemaText: body.schemaContent,
          };
        }
      }
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


function gatherResource(resource, basePath, types, level = 0, parentUri = '') {
  const result = { level };
  const rel = resource.relativeUri;
  const uri = parentUri + rel;

  const methods = resource.methods || [];
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.method === 'get').forEach((method) => {
    const args = [];

    let queryPath;
    if (rel.startsWith('/{')) {
      args.push([rel.replace(/\/{(.*)}/, '$1'), 'String', true]);
      queryPath = `${parentUri}-SINGLE`;
    } else {
      queryPath = uri;
    }

    (method.queryParameters || []).forEach((qp) => {
      args.push([qp.name, r2gBasicType(qp.type) || 'String', qp.required || false]);
    });

    result.queryName = queryPath.substr(1).replace('/', '-');
    result.args = args;
    // eslint-disable-next-line no-useless-escape
    if (resource.displayName.match(/^[^\/]/)) {
      result.displayName = resource.displayName;
    }

    const { schemaName, schemaText } = findResponseSchema(resource);
    result.type = r2gDefinedType(schemaName);

    // We have to rewrite every $ref in this schema to be relative to
    // `basePath`: it does not suffice to insert a suitable "id" at
    // the top level of the schema, as the json-schema-ref-parser
    // library simply does not support id: see
    // https://github.com/BigstickCarpet/json-schema-ref-parser/issues/22#issuecomment-231783185
    const obj = JSON.parse(schemaText);
    rewriteObjRefs(obj, basePath);
    const expanded = $RefParser.dereference(obj);
    gatherSchema(types, result.type, expanded);
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(sub, basePath, types, level + 1, uri));
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


function gatherResources(api, basePath, types, _options) {
  const resources = api.specification.resources.map(r => gatherResource(r, basePath, types));
  return flattenResources(resources, _options);
}


function gatherAPI(api, basePath, _options) {
  const types = {};
  return {
    comments: gatherComments(api, _options),
    resources: gatherResources(api, basePath, types, _options),
    types
  };
}


exports.gatherAPI = gatherAPI;
