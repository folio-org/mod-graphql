function ramll2graphqlType(type) {
  const map = {
    string: 'String',
    integer: 'Int',
    // More to follow
  };

  return map[type] || 'Unknown';
}


function gatherComments(api, _options) {
  const comments = [];

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    comments.push([tag, api.attributes(tag).map(attr => attr.plainValue())]);
  });

  return comments;
}


function gatherResource(resource, level = 0, parentUri = '') {
  const result = { level };
  const rel = resource.attr('relativeUri').plainValue();
  const uri = parentUri + rel;

  const methods = resource.elementsOfKind('methods');
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.name() === 'get').forEach((method) => {
    const args = [];

    let basePath;
    if (rel.startsWith('/{')) {
      args.push([rel.replace(/\/{(.*)}/, '$1'), 'String', true]);
      basePath = `${parentUri}-SINGLE`;
    } else {
      basePath = uri;
    }

    method.elementsOfKind('queryParameters').forEach((qp) => {
      const a1 = qp.attr('required');
      const required = a1 ? a1.plainValue() : false;
      const a2 = qp.attr('type');
      const type = a2 ? a2.plainValue() : 'string';
      args.push([qp.name(), ramll2graphqlType(type), required]);
    });

    result.queryName = basePath.substr(1).replace('/', '-');
    result.args = args;
    const dna = resource.attr('displayName');
    if (dna) result.displayName = dna.plainValue();

    const type = resource.attr('type');
    const typeValue = type.findReferencedValue();
    // console.log('typeValue:', typeValue);
    const localType = typeValue.localType();
    // console.log('localType:', localType);
    // const { getMethods } = require('./getMethods');
    // console.log('localType methods:', getMethods(localType));
    console.log("Body media type: " + localType.nameId() + " with properties:");
    localType.allProperties().forEach(function(prop){
      console.log(' '+prop.nameId() + ": " + prop.range().nameId());
      if(prop.nameId() === 'schema') console.log('  ', prop.range());
    });

    const schema = typeValue.attr('schema');
    console.log('schema:', schema);
  });

  result.subResources = [];
  resource.elementsOfKind('resources').forEach((sub) => {
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
  const resources = api.elementsOfKind('resources').map(r => gatherResource(r));
  return flattenResources(resources, _options);
}


function gatherAPI(api, _options) {
  return {
    comments: gatherComments(api, _options),
    resources: gatherResources(api, _options),
  }
}


exports.gatherAPI = gatherAPI;
