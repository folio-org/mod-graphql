const raml = require('raml-1-parser');
const { gatherAPI } = require('./gatherAPI');
const { render } = require('./asSchema');


// Reads the RAML file at the specified `ramlName`, together with
// whatever traits, other fragments and JSON Schemas it uses. Converts
// the result into a GraphQL schema, written to the file `schemaName`,
// and a set of corresponding GraphQL resolvers, written to the file
// `resolversName`. If either of these is null, the generated content
// is logged to the console instead.
//
// The `options` object can control various aspects of RAML and JSON
// Schema parsing, and GraphQL schema and resolver generation.
//
// XXX note that resolver generation is not yet done.
//
function convertAPI(options, ramlName, _schemaName, _resolversName) {
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
    console.info(JSON.stringify(gathered, null, 2));
  }
  console.log(render(gathered, options)); // eslint-disable-line no-console
}


exports.convertAPI = convertAPI;
