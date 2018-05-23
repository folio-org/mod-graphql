function gatherComments(api, _options) {
  const comments = [];

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    let val = api.specification[tag];
    comments.push([tag, typeof val === 'string' ? [val] : val]);
  });

  return comments;
}


function gatherResource(resource, level = 0, parentUri = '') {
  const result = { level };
  const rel = resource.relativeUri
  const uri = parentUri + rel;

  const methods = resource.methods || [];
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.method === 'get').forEach((method) => {
    const args = [];

    let basePath;
    if (rel.startsWith('/{')) {
      args.push([rel.replace(/\/{(.*)}/, '$1'), 'string', true]);
      basePath = `${parentUri}-SINGLE`;
    } else {
      basePath = uri;
    }

    (method.queryParameters || []).forEach((qp) => {
      const required = qp.required || false;
      const type = qp.type || 'string';
      args.push([qp.name, type, required]);
    });

    result.queryName = basePath.substr(1).replace('/', '-');
    result.args = args;
    if (resource.displayName.match(/^[^\/]/)) {
      result.displayName = resource.displayName;
    }
  });

  result.subResources = [];
  (resource.resources || []).forEach((sub) => {
    result.subResources.push(gatherResource(sub, level + 1, uri));
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


function gatherResources(api, _options) {
  const resources = api.specification.resources.map(r => gatherResource(r));
  return flattenResources(resources, _options);
}


function gatherAPI(api, _options) {
  return {
    comments: gatherComments(api, _options),
    resources: gatherResources(api, _options),
  }
}


exports.gatherAPI = gatherAPI;
