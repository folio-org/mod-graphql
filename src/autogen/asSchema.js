function render(api, options) {
  let output = '';

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const rendered = [];
    api.attributes(tag).forEach((attr) => {
      rendered.push(attr.plainValue());
    });
    output += `# ${tag}: ${rendered.join(', ')}\n`;
  });

  output += '\n';
  output += 'type Query {\n';
  api.elementsOfKind('resources').forEach((resource, i) => {
    processResource(resource);
  });
  output += '}\n';

  function processResource(resource, level = 0, parentUri = '') {
    const rel = resource.attr('relativeUri').plainValue();
    const uri = parentUri + rel;
    // We will come back to pick up the types later

    const methods = resource.elementsOfKind('methods');
    methods.forEach((method) => {
      // At this stage, we are only interested in GET, not mutations
      if (method.name() === 'get') {
        const args = [];

        let basePath;
        if (rel.startsWith('/{')) {
          args.push(rel.replace(/\/{(.*)}/, '$1'));
          basePath = parentUri;
        } else {
          basePath = uri;
        }

        const queryName = basePath.substr(1).replace('/', '-');
        output += '  '.repeat(level) + queryName;
        if (args.length > 0) {
          output += `(${args.join(', ')})`;
        }

        const dna = resource.attr('displayName');
        if (dna) {
          output += ` # ${dna.plainValue()}`;
        }

        output += '\n';
      }
    });

    resource.elementsOfKind('resources').forEach((sub, i) => {
      processResource(sub, level+1, uri);
    });
  }

  return output;
}

exports.render = render;
