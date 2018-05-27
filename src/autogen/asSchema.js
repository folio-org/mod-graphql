function renderComments(comments, _options) {
  let output = '';

  comments.forEach(comment => {
    const [tag, values] = comment;
    if (values) {
      output += `# ${tag}: ${values.join(', ')}\n`;
    }
  });

  return output;
}


function renderResources(flattened, _options) {
  let output = 'type Query {\n';

  flattened.forEach(resource => {
    output += `  ${resource.queryName}`;
    if (resource.args.length > 0) {
      output += `(${resource.args.map(arg => {
        const [name, type, required] = arg;
        return `${name}: ${type}${required ? '!' : ''}`;
      }).join(', ')})`;
    }

    output += `: ${resource.type}`;

    if (resource.displayName) {
      output += ` # ${resource.displayName}`;
    }

    output += '\n';
  });

  output += '}\n';

  return output;
}


function renderTypes(types, _options) {
  var output = '';

  Object.keys(types).sort().forEach(name => {
    const t = types[name];
    output += `type ${name} \{\n`;
    Object.keys(t).forEach(field => {
      const [type, arrayDepth, required] = t[field];
      output += `  ${field}: ${'['.repeat(arrayDepth)}${type}${']'.repeat(arrayDepth)}${required ? '!' : ''}\n`;
    });
    output += '}\n';
    output += '\n';
  });

  return output;
}


function render(api, _options) {
  return (renderComments(api.comments, _options) +
          '\n' +
          renderResources(api.resources, _options) +
          '\n' +
          renderTypes(api.types, _options));
}


exports.render = render;
