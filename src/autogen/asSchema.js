function render(api, options) {
  let output = '';

  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const rendered = [];
    api.attributes(tag).forEach((attr) => {
      rendered.push(attr.plainValue());
    });
    output += `# ${tag}: ${rendered.join(', ')}`;
  });

  api.elementsOfKind('resources').forEach((resource, i) => {
    processResource(resource);
  });


  function processResource(resource, level = 0, parentUri = '') {
    const uri = parentUri + resource.attr('relativeUri').plainValue();
    const dna = resource.attr('displayName');
    output += `${'  '.repeat(level)}${uri}${dna ? ` # ${dna.plainValue()}` : ''}`;

    resource.elementsOfKind('resources').forEach((sub, i) => {
      processResource(sub, level+1, uri);
    });
  }

  return output;
}

exports.render = render;
