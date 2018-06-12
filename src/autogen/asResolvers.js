function makeQueryResolvers(api, resolve, options) {
  return {
    instance_storage_instances: (o, a, c) => resolve(o, a, c, 'instances', 'instance-storage/instances'),
  };
}

function asResolvers(api, resolve, options) {
  return {
    Query: makeQueryResolvers(api, resolve, options),
    // Mutation: makeMutationResolvers(api, resolve, options),
  };
}


exports.asResolvers = asResolvers;
