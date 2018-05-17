function render(api, options) {
  ['title', 'version', 'protocols', 'baseUri'].forEach(tag => {
    const rendered = [];
    api.attributes(tag).forEach((attr) => {
      rendered.push(attr.plainValue());
    });
    console.log(`# ${tag}: ${rendered.join(', ')}`);
  });

  api.elementsOfKind('resources').forEach((resource, i) => {
    processResource(resource);
  });


  function processResource(resource, level = 0, parentUri = '') {
    const uri = parentUri + resource.attr('relativeUri').plainValue();
    const dna = resource.attr('displayName');
    console.log(`${'  '.repeat(level)}${uri}${dna ? ` # ${dna.plainValue()}` : ''}`);

    resource.elementsOfKind('resources').forEach((sub, i) => {
      processResource(sub, level+1, uri);
    });
  }
}

exports.render = render;
