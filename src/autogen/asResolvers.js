function makeQueryResolvers(api, resolve, options) {
  return {
    instance_storage_instances: (o, a, c) => resolve(o, a, c, 'instances', 'instance-storage/instances', null, null, {
      records: 'instances',
      totalCount: 'totalRecords',
    }),
  };
}

function asResolvers(api, resolve, options) {
  return {
    Query: makeQueryResolvers(api, resolve, options),
    // Mutation: makeMutationResolvers(api, resolve, options),
  };
}


exports.asResolvers = asResolvers;
