const raml = require('raml-1-parser');
const Logger = require('@folio/stripes-logger');
const { gatherAPI } = require('./gatherAPI');
const { asSchema } = require('./asSchema');
const { asResolvers } = require('./asResolvers');


function parseAndGather(ramlName, resolveFunction, options) {
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

  return gathered;
}


// Each APIs comments are represented by an ordered list. Each
// list-member is itself a list of two elements: the first is the
// comment-name (version, protocols, baseUrl, etc.) and the second is
// an ordered list of values.
//
// The merged list retains the original order as far as possible: the
// comments that exist in the first entry, in their original order;
// followed by those comments that exist in the second but not the
// first, in order; and so on.
//
function mergeComments(list) {
  const register = {};
  const res = [];

  list.forEach(comments => {
    comments.forEach(comment => {
      const [name, values] = comment;
      if (!register[name]) {
        register[name] = [name, values];
        res.push(register[name]);
      } else {
        register[name][1].push(... values);
      }
    });
  });

  return res;
}


function mergeAPIs(list) {
  return {
    comments: mergeComments(list.map(api => api.comments)),
    resources: list[0].resources,
    types: list[0].types,
  }
}


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

  const allAPIs = ramlNames.map(ramlName => parseAndGather(ramlName, resolveFunction, options));
  const gathered = mergeAPIs(allAPIs);

  return {
    schema: asSchema(gathered, options),
    resolvers: resolveFunction ? asResolvers(gathered, resolveFunction, options) : null,
    logger: options.logger,
  };
}


exports.convertAPIs = convertAPIs;
