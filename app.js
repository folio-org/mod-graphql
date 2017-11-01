import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default express()
  .use(cors())
  .post('/graphql', bodyParser.json(), checkOkapiHeaders, graphqlExpress((request) => ({
    schema,
    context: {
      query: request.body,
      okapi: {
        url: request.get('X-Okapi-Url'),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Okapi-Tenant': request.get('X-Okapi-Tenant'),
          'X-Okapi-Token': request.get('X-Okapi-Token')
        }
      }
    }
  })));


function checkOkapiHeaders(request, response, next) {
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

function badRequest(response, reason) {
  response
    .status(400)
    .send(reason);
}
