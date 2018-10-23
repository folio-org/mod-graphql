import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Logger from './configuredLogger';
import { listAPIs } from './autogen/listAPIs';
import resolve from './resolve';
import { convertAPIs } from './autogen/convertAPI';

function modGraphql(argv) {
  const ramlPaths = argv[0] === '-a' ? listAPIs(argv[1]) : argv;
  if (!ramlPaths || ramlPaths.length === 0) throw Error('modGraphql invoked with no RAMLpaths');
  const logger = new Logger();
  const ramlArray = (typeof ramlPaths === 'string') ? [ramlPaths] : ramlPaths;
  logger.log('ramlpath', `using RAMLs ${ramlArray.map(s => `'${s}'`).join(', ')}`);
  const res = convertAPIs(ramlArray, resolve, { logger });
  const typeDefs = res.schema;
  const resolvers = res.resolvers;
  logger.log('schema', `generated GraphQL schema:\n===\n${typeDefs}\n===`);

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
  logger.log('listen', 'listening...');

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
