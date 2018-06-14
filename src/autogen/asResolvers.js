import _ from 'lodash';

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

function makeTypeResolvers(fields, resolve, _options) {
  const resolvers = {};

  fields.forEach(field => {
    if (field.link) {
      const l = field.link;
      resolvers[field.name] = (o, a, c) => resolve(o, a, c, `${field.name}-link`, l.base, l.fromField, l.toField, l.include);
    }
  });

  return resolvers;
}

function asResolvers(api, resolve, _options) {
  const typeResolvers = {};

  typeResolvers.Query = makeQueryResolvers(api, resolve, _options);

  // We need register resolvers only for types that have one or more
  // link fields, since only those fields need special handling.
  Object.keys(api.types).forEach(typeName => {
    const fields = api.types[typeName];
    if (_.some(fields, field => field.link)) {
      typeResolvers[typeName] = makeTypeResolvers(fields, resolve, _options);
    }
  });

  // When we get around to it:
  // typeResolvers.Mutation = makeMutationResolvers(api, resolve, options);

  return typeResolvers;
}


exports.asResolvers = asResolvers;
