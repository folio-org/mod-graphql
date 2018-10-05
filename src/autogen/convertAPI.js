const raml = require('raml-1-parser');
const Logger = require('@folio/stripes-logger');
const { gatherAPI } = require('./gatherAPI');
const { asSchema } = require('./asSchema');
const { asResolvers } = require('./asResolvers');


// Reads the RAML files whose names are specified in the `ramlNames`
// array, together with whatever traits, other fragments and JSON
// Schemas they use. Converts the result into a GraphQL schema and a
// set of corresponding GraphQL resolvers, which are returned in an
// object with keys `schema` and `resolvers`.
//
// The `options` object can control various aspects of RAML and JSON
// Schema parsing, and GraphQL schema and resolver generation.
//
function convertAPIs(ramlNames, resolveFunction, baseOptions) {
  const logger = new Logger(process.env.LOGGING_CATEGORIES);
  const options = Object.assign({ logger }, baseOptions);
  const optstring = process.env.GRAPHQL_OPTIONS;
  if (optstring) {
    optstring.split(',').forEach(option => {
      options[option] = true;
    });
  }

  return convertSingleAPI(ramlNames[0], resolveFunction, options);
}


function convertSingleAPI(ramlName, resolveFunction, options) {
  let api;
  try {
    api = raml.loadSync(ramlName);
  } catch (e) {
    console.error('RAML parse failed:', e);
    process.exit(2);
  }
  options.logger.log('raml', JSON.stringify(api, null, 2));

  const basePath = ramlName.match('/') ? ramlName.replace(/(.*)\/.*/, '$1') : '.';
  const gathered = gatherAPI(api, basePath, options);
  options.logger.log('api', 'gathered API:', JSON.stringify(gathered, null, 2));
  ['comments', 'resources', 'types'].forEach(s => options.logger.log(`api.${s}`, JSON.stringify(gathered[s], null, 2)));

  return {
    schema: asSchema(gathered, options),
    resolvers: resolveFunction ? asResolvers(gathered, resolveFunction, options) : null,
    logger: options.logger,
  };
}


exports.convertAPIs = convertAPIs;
