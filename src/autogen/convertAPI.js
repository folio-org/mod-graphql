const raml = require('raml-1-parser');
const Logger = require('@folio/stripes-logger');
const { gatherAPI } = require('./gatherAPI');
const { asSchema } = require('./asSchema');
const { asResolvers } = require('./asResolvers');


// Reads the RAML file at the specified `ramlName`, together with
// whatever traits, other fragments and JSON Schemas it uses. Converts
// the result into a GraphQL schema and a set of corresponding GraphQL
// resolvers, which are returned in an object with keys `schema` and
// `resolvers`.
//
// The `options` object can control various aspects of RAML and JSON
// Schema parsing, and GraphQL schema and resolver generation.
//
function convertAPI(ramlName, resolveFunction, baseOptions) {
  let api;
  try {
    api = raml.loadSync(ramlName);
  } catch (e) {
    console.error('RAML parse failed:', e);
    process.exit(2);
  }

  const logger = new Logger(process.env.LOGGING_CATEGORIES);
  const options = Object.assign({ logger }, baseOptions);
  const optstring = process.env.GRAPHQL_OPTIONS;
  if (optstring) {
    optstring.split(',').forEach(option => {
      options[option] = true;
    });
  }

  const basePath = ramlName.match('/') ? ramlName.replace(/(.*)\/.*/, '$1') : '.';
  const gathered = gatherAPI(api, basePath, options);
  options.logger.log('api', 'gathered API:', JSON.stringify(gathered, null, 2));

  return {
    schema: asSchema(gathered, options),
    resolvers: resolveFunction ? asResolvers(gathered, resolveFunction, options) : null,
  };
}


exports.convertAPI = convertAPI;
