const $RefParser = require('json-schema-ref-parser-sync');

function gatherComments(api, _options) {
  const comments = [];

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const val = api.specification[tag];
    comments.push([tag, typeof val === 'string' ? [val] : val]);
  });

  return comments;
}


function findResponseSchemaText(resource) {
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
        if (body.schemaContent) return body.schemaContent;
      }
    }
  }

  return null;
}


function gatherResource(resource, basePath, level = 0, parentUri = '') {
  const result = { level };
  const rel = resource.relativeUri;
  const uri = parentUri + rel;

  const methods = resource.methods || [];
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.method === 'get').forEach((method) => {
    const args = [];

    let queryPath;
    if (rel.startsWith('/{')) {
      args.push([rel.replace(/\/{(.*)}/, '$1'), 'string', true]);
      queryPath = `${parentUri}-SINGLE`;
    } else {
      queryPath = uri;
    }

    (method.queryParameters || []).forEach((qp) => {
      args.push([qp.name, qp.type || 'string', qp.required || false]);
    });

    result.queryName = queryPath.substr(1).replace('/', '-');
    result.args = args;
    if (resource.displayName.match(/^[^/]/)) {
      result.displayName = resource.displayName;
    }
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(sub, basePath, level + 1, uri));
  });

  const schemaText = findResponseSchemaText(resource);
  // We have to insert a suitable "id" at the top level of the schema
  // to specify the base-path for resolving $ref references. The
  // simplest way to do that is to parse it, insert the id into the
  // object.
  const obj = JSON.parse(schemaText);
  obj.id = `${basePath}/dummy`;
  console.log('=== before ===\n', JSON.stringify(obj, null, 2));
  const expanded = $RefParser.dereference(obj);
  console.log('=== after ===\n', JSON.stringify(expanded, null, 2));

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


function gatherResources(api, basePath, _options) {
  const resources = api.specification.resources.map(r => gatherResource(r, basePath));
  return flattenResources(resources, _options);
}


function gatherAPI(api, basePath, _options) {
  return {
    comments: gatherComments(api, _options),
    resources: gatherResources(api, basePath, _options),
  };
}


exports.gatherAPI = gatherAPI;
