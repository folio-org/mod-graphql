const fs = require('fs');
const raml = require('raml-1-parser');
const { isEqual, findIndex, some } = require('lodash');
const { gatherAPI } = require('./gatherAPI');
const { asSchema } = require('./asSchema');
const { asResolvers } = require('./asResolvers');


function reportErrors(ramlName, errors, options) {
  const actualErrors = errors.filter(e => e.code !== 'CIRCULAR_REFS_IN_JSON_SCHEMA_DETAILS');
  if (actualErrors.length === 0) return false;
  const messages = [`RAML parse for ${ramlName} had ${actualErrors.length} errors`];

  errors.forEach(e => {
    messages.push(
      (e.isWarning ? 'warning:' : 'error:') +
        `${e.message} at ${e.path}:${e.line || e.range.start.line}:${e.column || e.range.start.column}`
    );
  });

  const good = options.ignoreRamlWarnings && !some(actualErrors, e => !e.isWarning);
  return good ? null : messages;
}


// Parse the specified RAML and return a map of schema-names to the
// directories in which they are found. This is needed to support
// correct interpretation of relative pathnames when those schemas
// reference futher schemas.
//
// Amazingly, it turns out that neither yaml-ast-parser nor js-yaml
// can do what we need here: see comments in MODGQL-96. So we will
// simply pick the RAML text apart by hand to extract the schema map.
//
function parseSchemaMap(ramlName, options) {
  const text = fs.readFileSync(ramlName, 'utf8');
  const lines = text.split('\n');
  const map = {};

  const schemasIndex = findIndex(lines, x => (x === 'schemas:'));
  if (schemasIndex >= 0) {
    for (let i = schemasIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.match(/^\s*$/)) break;
      if (line.match(/^[ \t]+- (.*?): \|/)) {
        // An inline schema, which we don't support
        if (options.ignoreSchemaMapsWithInlineSchemas) return map;
        throw Error(`inline schemas are not supported (${ramlName}:${i + 1}`);
      }
      const match = line.match(/^[ \t]+- (.*?): !include (.*)/);
      if (!match) {
        console.error('unexpected end to schema map:', line);
        break;
      }
      const path = match[2];
      const m2 = path.match(/(.*)\/.*/);
      map[match[1]] = m2 ? m2[1] : '.';
    }
  }

  return map;
}


function parseAndGather(ramlName, resolveFunction, options) {
  let schemaMap, api;
  try {
    schemaMap = parseSchemaMap(ramlName, options);
    options.logger.log('schemaMap', JSON.stringify(schemaMap, null, 2));
    api = raml.loadSync(ramlName);
  } catch (e) {
    console.error(`RAML parse for ${ramlName} failed`, e);
    process.exit(2);
  }
  const errors = reportErrors(ramlName, api.errors, options);
  if (errors) throw Error(errors.map(m => `${m}\n`).join(''));

  options.logger.log('raml', JSON.stringify(api, null, 2));

  const basePath = ramlName.match('/') ? ramlName.replace(/(.*)\/.*/, '$1') : '.';
  const gathered = gatherAPI(api, basePath, schemaMap, options);
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
        register[name][1].push(...values);
      }
    });
  });

  return res;
}


// For this one, it's just a matter of concatenating the array and
// complaining if there's a duplicate queryName.
//
function mergeResources(list) {
  const register = {};
  const res = [];

  list.forEach(resources => {
    resources.forEach(resource => {
      const name = resource.queryName;
      if (!register[name]) {
        register[name] = true;
        res.push(resource);
      } else {
        throw Error(`duplicate resource name '${name}'`);
      }
    });
  });

  return res;
}


// Similar to mergeResources, but each API's types are a map rather
// than a list, and duplicate definitions are OK provided they're
// identical.
//
function mergeTypes(list, options) {
  const res = {};

  list.forEach(types => {
    Object.keys(types).forEach(name => {
      const type = types[name];
      if (!res[name]) {
        res[name] = type;
      } else {
        const same = isEqual(type, res[name]);
        if (same) {
          options.logger.log('duptype', `duplicate type name '${name}' with same definition`);
        } else {
          throw Error(`duplicate type name '${name}' with different definition`);
        }
      }
    });
  });

  return res;
}


function mergeAPIs(list, options) {
  return {
    comments: mergeComments(list.map(api => api.comments)),
    resources: mergeResources(list.map(api => api.resources)),
    types: mergeTypes(list.map(api => api.types), options),
  };
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
  const options = Object.assign({}, baseOptions);
  const optstring = process.env.GRAPHQL_OPTIONS;
  if (optstring) {
    optstring.split(',').forEach(option => {
      options[option] = true;
    });
  }

  const allAPIs = ramlNames.map(ramlName => parseAndGather(ramlName, resolveFunction, options));
  const gathered = mergeAPIs(allAPIs, options);

  return {
    schema: asSchema(gathered, options),
    resolvers: resolveFunction ? asResolvers(gathered, resolveFunction, options) : null,
  };
}


exports.convertAPIs = convertAPIs;
exports._TESTING_mergeComments = mergeComments;
exports._TESTING_mergeResources = mergeResources;
exports._TESTING_mergeTypes = mergeTypes;
