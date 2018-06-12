import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import resolve from './resolve';

const { convertAPI } = require('./autogen/convertAPI');

const ramlPath = '../mod-inventory-storage/ramls/instance-storage.raml';
const { schema: typeDefs, resolvers } = convertAPI(ramlPath, resolve, {});

function badRequest(response, reason) {
  response
    .status(400)
    .send(reason);
}

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
      loggingCategories: process.env.LOGGING_CATEGORIES,
      // Supported: 'failsub,url,result'
    }
  })));
