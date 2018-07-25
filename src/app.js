import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Logger from '@folio/stripes-logger';
import resolve from './resolve';
import legacyResolvers from './resolvers';
import { convertAPI } from './autogen/convertAPI';

// Supported: 'schema,failsub,url,result'
const logger = new Logger(process.env.LOGGING_CATEGORIES);

let typeDefs;
let resolvers;
if (process.env.LEGACY_RESOLVERS) {
  typeDefs = fs.readFileSync('./src/master.graphql', 'utf-8');
  resolvers = legacyResolvers;
} else {
  let ramlPath = 'tests/input/mod-inventory-storage/ramls/instance-storage.raml';
  // We need to avoid taking '--exit' as a RAML path, as `yarn test` specifies that
  if (process.argv.length > 2 && process.argv[2] !== '--exit') ramlPath = process.argv[2];
  console.info(`using RAML '${ramlPath}'`);
  ({ schema: typeDefs, resolvers } = convertAPI(ramlPath, resolve, { logger }));
  logger.log('schema', `generated GraphQL schema:\n===\n${typeDefs}\n===`);
}

function badRequest(response, reason) {
  response
    .status(400)
    .send(reason);
}

function checkOkapiHeaders(request, response, next) {
  // console.info('GraphQL query:', JSON.stringify(request.body, null, 2));
  if (!request.get('X-Okapi-Url')) {
    badRequest(response, 'Missing Header: X-Okapi-Url');
  } else if (!request.get('X-Okapi-Tenant')) {
    badRequest(response, 'Missing Header: X-Okapi-Tenant');
  } else if (!request.get('X-Okapi-Token')) {
    badRequest(response, 'Missing Header: X-Okapi-Token');
  } else {
    next();
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default express()
  .post('/graphql', bodyParser.json(), checkOkapiHeaders, graphqlExpress(request => ({
    schema,
    // debug: false, // if you don't want error objects passed to console.error()
    context: {
      query: request.body,
      okapi: {
        url: process.env.OKAPI_URL || request.get('X-Okapi-Url'),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Okapi-Tenant': request.get('X-Okapi-Tenant'),
          'X-Okapi-Token': request.get('X-Okapi-Token')
        }
      },
      logger,
    }
  })));
