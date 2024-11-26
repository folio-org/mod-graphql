import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import Logger from './configuredLogger.js';
import { listAPIs } from './autogen/listAPIs.js';
import resolve from './resolve.js';
import { convertAPIs } from './autogen/convertAPI.js';

async function modGraphql(argv) {
  const ramlPaths = argv[0] === '-a' ? listAPIs(argv[1]) : argv;
  if (!ramlPaths || ramlPaths.length === 0) throw Error('modGraphql invoked with no RAMLpaths');
  const logger = new Logger();
  const ramlArray = (typeof ramlPaths === 'string') ? [ramlPaths] : ramlPaths;
  logger.log('ramlpath', `using RAMLs ${ramlArray.map(s => `'${s}'`).join(', ')}`);
  const converted = convertAPIs(ramlArray, resolve, { logger });
  const typeDefs = converted.schema;
  const resolvers = converted.resolvers;
  logger.log('schema', `generated GraphQL schema:\n===\n${typeDefs}\n===`);

  function badRequest(response, reason) {
    response
      .status(400)
      .send(reason);
  }

  function checkOkapiHeaders(request, response, next) {
    // console.info('GraphQL query:', JSON.stringify(request.body, null, 2));
    if (!request.get('X-Okapi-Url')) {
      // XXX badRequest(response, 'Missing Header: X-Okapi-Url');
    } else if (!request.get('X-Okapi-Tenant')) {
      // XXX badRequest(response, 'Missing Header: X-Okapi-Tenant');
    } else if (!request.get('X-Okapi-Token')) {
      // XXX badRequest(response, 'Missing Header: X-Okapi-Token');
    } else {
      next();
    }
  }

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  console.log('server started');

  app.get('/admin/health', (req, res) => {
    res.send('Behold! I live!!');
  });

  app.use('/',
    cors(),
    express.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: ({ req, res }) => {
        // Trying to do this by hand, not sure if it will work
        checkOkapiHeaders(req, res, () => undefined);

        const { OKAPI_URL, OKAPI_TENANT, OKAPI_TOKEN } = process.env;

        return {
          query: req.body,
          okapi: {
            url: OKAPI_URL || req.get('X-Okapi-Url'),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Okapi-Tenant': OKAPI_TENANT || req.get('X-Okapi-Tenant'),
              'X-Okapi-Token': OKAPI_TOKEN || req.get('X-Okapi-Token')
            }
          },
          logger,
        };
      },
    }));

  await new Promise(resolve2 => httpServer.listen({ port: 3001 /* XXX */ }, resolve2));
  console.log('🚀 Server ready 1');
  return httpServer;
}

export default modGraphql;
