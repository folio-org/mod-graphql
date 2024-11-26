import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { listAPIs } from './autogen/listAPIs.js';
import resolve from './resolve.js';
import { convertAPIs } from './autogen/convertAPI.js';

async function modGraphql(logger, argv) {
  const ramlPaths = argv[0] === '-a' ? listAPIs(argv[1]) : argv;
  if (!ramlPaths || ramlPaths.length === 0) throw Error('modGraphql invoked with no RAMLpaths');
  const ramlArray = (typeof ramlPaths === 'string') ? [ramlPaths] : ramlPaths;
  logger.log('ramlpath', `using RAMLs ${ramlArray.map(s => `'${s}'`).join(', ')}`);
  const converted = convertAPIs(ramlArray, resolve, { logger });
  const typeDefs = converted.schema;
  const resolvers = converted.resolvers;
  logger.log('schema', `generated GraphQL schema:\n===\n${typeDefs}\n===`);

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.get('/admin/health', (req, res) => {
    res.send('Behold! I live!!');
  });

  app.use('/',
    cors(),
    express.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: ({ req }) => {
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
  logger.log('listen', `listening on port ${3001}`);
  return httpServer;
}

export default modGraphql;
