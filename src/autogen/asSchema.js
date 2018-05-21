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


function renderComments(comments, _options) {
  let output = '';

  comments.forEach(comment => {
    const tag = comment[0];
    const values = comment[1];
    output += `# ${tag}: ${values.join(', ')}\n`;
  });

  return output;
}


function renderResource(resource, level = 0, parentUri = '') {
  let output = '';
  const rel = resource.attr('relativeUri').plainValue();
  const uri = parentUri + rel;
  // We will come back to pick up the types later

  const methods = resource.elementsOfKind('methods');
  // At this stage, we are only interested in GET, not mutations
  methods.filter(m => m.name() === 'get').forEach((method) => {
    const args = [];

    let basePath;
    if (rel.startsWith('/{')) {
      args.push(rel.replace(/\/{(.*)}/, '$1: String!'));
      basePath = `${parentUri}-SINGLE`;
    } else {
      basePath = uri;
    }

    method.elementsOfKind('queryParameters').forEach((qp) => {
      const a1 = qp.attr('required');
      const required = a1 ? a1.plainValue() : false;
      const a2 = qp.attr('type');
      const type = a2 ? a2.plainValue() : 'string';
      args.push(`${qp.name()}: ${ramll2graphqlType(type)}${required ? '!' : ''}`);
    });

    const queryName = basePath.substr(1).replace('/', '-');
    output += `  ${queryName}`;
    if (args.length > 0) {
      output += `(${args.join(', ')})`;
    }

    const dna = resource.attr('displayName');
    if (dna) {
      output += ` # ${dna.plainValue()}`;
    }

    output += '\n';
  });

  resource.elementsOfKind('resources').forEach((sub) => {
    output += renderResource(sub, level + 1, uri);
  });

  return output;
}


function render(api, _options) {
  let output = '';

  const comments = gatherComments(api, _options);
  output += renderComments(comments, _options);

  output += '\n' +
    'type Query {\n' +
    api.elementsOfKind('resources').map(r => renderResource(r)).join('') +
    '}\n';

  return output;
}


exports.render = render;
