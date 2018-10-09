import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import resolve from './resolve';
import legacyResolvers from './resolvers';
import { convertAPIs } from './autogen/convertAPI';

function modGraphql(ramlPaths) {
  let typeDefs;
  let resolvers;
  let logger;
  if (process.env.LEGACY_RESOLVERS) {
    typeDefs = fs.readFileSync('./src/master.graphql', 'utf-8');
    resolvers = legacyResolvers;
  } else {
    if (!ramlPaths || ramlPaths.length === 0) throw Error('modGraphql invoked with no RAMLpaths');
    const ramlArray = (typeof ramlPaths === 'string') ? [ramlPaths] : ramlPaths;
    {
      // Temporary logger. XXX should fix convertAPIs API to avoid this
      const Logger = require('@folio/stripes-logger');
      const logger = new Logger(process.env.LOGGING_CATEGORIES);
      logger.log('ramlpath', `using RAMLs ${ramlArray.map(s => `'${s}'`).join(', ')}`);
    }
    ({ schema: typeDefs, resolvers, logger } = convertAPIs(ramlArray, resolve));
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

  return express()
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
}

export default modGraphql;
