function ramll2graphqlType(type) {
  const map = {
    string: 'String',
    integer: 'Int',
    // More to follow
  };

  return map[type] || 'Unknown';
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


function renderResources(flattened, _options) {
  let output = 'type Query {\n';

  flattened.forEach(resource => {
    output += `  ${resource.queryName}`;
    if (resource.args.length > 0) {
      output += `(${resource.args.map(arg => {
        const name = arg[0];
        const type = ramll2graphqlType(arg[1]);
        const required = arg[2];

        return `${name}: ${type}${required ? '!' : ''}`;
      }).join(', ')})`;
    }

    if (resource.displayName) {
      output += ` # ${resource.displayName}`;
    }

    output += '\n';
  });

  output += '}\n';

  return output;
}


function render(api, _options) {
  return (renderComments(api.comments, _options) +
          '\n' +
          renderResources(api.resources, _options));
}


exports.render = render;
