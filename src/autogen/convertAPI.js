const raml = require('raml-1-parser');
const { gatherAPI } = require('./gatherAPI');
const asSchema = require('./asSchema');
const asResolvers = require('./asResolvers');


// Reads the RAML file at the specified `ramlName`, together with
// whatever traits, other fragments and JSON Schemas it uses. Converts
// the result into a GraphQL schema and a set of corresponding GraphQL
// resolvers, which are returned in an object with keys `schema` and
// `resolvers`.
//
// The `options` object can control various aspects of RAML and JSON
// Schema parsing, and GraphQL schema and resolver generation.
//
function convertAPI(ramlName, resolveFunction, options) {
  let api;
  try {
    api = raml.loadSync(ramlName);
  } catch (e) {
    console.error('RAML parse failed:', e);
    process.exit(2);
  }

  const basePath = ramlName.match('/') ? ramlName.replace(/(.*)\/.*/, '$1') : '.';
  const gathered = gatherAPI(api, basePath, options);
  if (options.verbose) {
    console.info('gathered API:', JSON.stringify(gathered, null, 2));
  }

  return {
    schema: asSchema.render(gathered, options),
    resolvers: resolveFunction ? asResolvers.render(gathered, resolveFunction, options) : null,
  };
}


exports.convertAPI = convertAPI;
