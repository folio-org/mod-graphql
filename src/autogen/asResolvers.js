function makeQueryResolvers(api, resolve, options) {
  const resolvers = {};

  api.resources.forEach((resource) => {
    console.log(JSON.stringify(resource, null, 2));
    resolvers[resource.queryName] = (o, a, c) => resolve(o, a, c,
                                                         resource.displayName || resource.queryName,
                                                         'instance-storage/instances');
    // We presently ignore the arguments: the resolve function knows about query, offset, etc.
  });
  return resolvers;
}

function asResolvers(api, resolve, options) {
  return {
    Query: makeQueryResolvers(api, resolve, options),
    // Mutation: makeMutationResolvers(api, resolve, options),
  };
}


exports.asResolvers = asResolvers;
