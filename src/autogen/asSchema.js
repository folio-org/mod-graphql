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
  let output = '';
  const subTypes = {};

  Object.keys(types).sort().forEach(typeName => {
    const t = types[typeName];
    // eslint-disable-next-line no-useless-escape
    output += `type ${typeName} \{\n`;
    t.forEach(field => {
      const { name, required, arrayDepth, type } = field;
      let fieldType = type;
      if (type instanceof Object) {
        fieldType = `${typeName}_${name}`;
        subTypes[fieldType] = type;
      }
      output += `  ${name}`;
      if (field.link) {
        output += '(limit: Int = 10)';
      }
      output += `: ${'['.repeat(arrayDepth)}${fieldType}${']'.repeat(arrayDepth)}${required ? '!' : ''}`;
      if (field.link) {
        const l = field.link;
        output += ` # link: /${l.base} (${l.toField}=$${l.fromField}) -> ${l.include}`;//
      }
      output += '\n';
    });
    if (t.length === 0) {
      output += '  _dummy: String\n';
    }
    output += '}\n';
    output += '\n';
  });

  if (Object.keys(subTypes).length > 0) {
    output += renderTypes(subTypes, _options);
  }

  return output;
}


function asSchema(api, _options) {
  return (renderComments(api.comments, _options) +
          '\n' +
          renderResources(api.resources, _options) +
          '\n' +
          renderTypes(api.types, _options));
}


export { asSchema };
