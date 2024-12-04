function makeQueryResolvers(api, resolve, _options) {
  const resolvers = {};

  api.resources.forEach((r) => {
    const caption = r.displayName || r.queryName;
    resolvers[r.queryName] = (o, a, c) => resolve(o, a, c, caption, r.url);
    // We presently ignore the arguments: the resolve function knows about query, offset, etc.
  });
  return resolvers;
}

function registerTypeResolvers(typeResolvers, typeName, fields, resolve, options) {
  const resolvers = {};
  const subTypes = {};

  fields.forEach(field => {
    if (field.link) {
      const l = field.link;
      resolvers[field.name] = (o, a, c) => resolve(o, a, c, `${field.name}-link`, l.base, l.fromField, l.toField, l.include, l.extraArgs);
    }
    if (Array.isArray(field.type)) {
      subTypes[`${typeName}_${field.name}`] = field.type;
    }
  });

  if (Object.keys(resolvers).length > 0) typeResolvers[typeName] = resolvers;

  // eslint-disable-next-line no-use-before-define
  insertTypeResolvers(typeResolvers, subTypes, resolve, options);
}


function insertTypeResolvers(typeResolvers, types, resolve, options) {
  Object.keys(types).sort().forEach(typeName => {
    const fields = types[typeName];
    registerTypeResolvers(typeResolvers, typeName, fields, resolve, options);
  });
}


function asResolvers(api, resolve, options) {
  const typeResolvers = {};

  typeResolvers.Query = makeQueryResolvers(api, resolve, options);
  insertTypeResolvers(typeResolvers, api.types, resolve, options);
  // When we get around to it:
  // typeResolvers.Mutation = makeMutationResolvers(api, resolve, options);

  if (options.showResolvers) {
    let text = 'resolvers:\n';
    Object.keys(typeResolvers).sort().forEach(r => {
      const t = typeResolvers[r];
      let rtext = '';
      Object.keys(t).sort().forEach(f => {
        rtext += `    ${f}\n`;
      });
      text += `  ${r}: {\n${rtext}  }\n`;
    });
    console.info(text);
  }
  return typeResolvers;
}


export { asResolvers };
