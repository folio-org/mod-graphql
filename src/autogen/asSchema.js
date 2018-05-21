function renderComments(comments, _options) {
  let output = '';

  comments.forEach(comment => {
    const tag = comment[0];
    const values = comment[1];
    output += `# ${tag}: ${values.join(', ')}\n`;
  });

  return output;
}


function renderResources(flattened, _options) {
  let output = 'type Query {\n';

  flattened.forEach(resource => {
    output += `  ${resource.queryName}`;
    if (resource.args.length > 0) {
      output += `(${resource.args.join(', ')})`;
    }

    if (resource.displayName) {
      output += ` # ${resource.displayName}`;
    }

    output += '\n';
  });

  output += '}\n';

  return output;
}


function renderAPI(api, _options) {
  return (renderComments(api.comments, _options) +
          renderResources(api.resources, _options));
}


exports.renderAPI = renderAPI;
