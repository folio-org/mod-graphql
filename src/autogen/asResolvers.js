const _ = require('lodash');

function makeQueryResolvers(api, resolve, _options) {
  const resolvers = {};

  api.resources.forEach((r) => {
    const caption = r.displayName || r.queryName;
    const path = r.url.replace('http://localhost/', ''); // This doesn't feel quite right
    resolvers[r.queryName] = (o, a, c) => resolve(o, a, c, caption, path);
    // We presently ignore the arguments: the resolve function knows about query, offset, etc.
  });
  return resolvers;
}

function registerTypeResolvers(typeResolvers, typeName, fields, resolve, _options) {
  const resolvers = {};

  fields.forEach(field => {
    if (field.link) {
      const l = field.link;
      resolvers[field.name] = (o, a, c) => resolve(o, a, c, `${field.name}-link`, l.base, l.fromField, l.toField, l.include);
    }
  });

  typeResolvers[typeName] = resolvers;
}

function asResolvers(api, resolve, options) {
  const typeResolvers = {};

  typeResolvers.Query = makeQueryResolvers(api, resolve, options);

  // We need register resolvers only for types that have one or more
  // link fields, since only those fields need special handling.
  Object.keys(api.types).forEach(typeName => {
    const fields = api.types[typeName];
    if (_.some(fields, field => field.link)) {
      registerTypeResolvers(typeResolvers, typeName, fields, resolve, options);
    }
  });

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


exports.asResolvers = asResolvers;
