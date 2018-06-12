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

function asResolvers(api, resolve, _options) {
  return {
    Query: makeQueryResolvers(api, resolve, _options),
    // Mutation: makeMutationResolvers(api, resolve, options),
  };
}


exports.asResolvers = asResolvers;
