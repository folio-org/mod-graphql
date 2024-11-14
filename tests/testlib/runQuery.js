import { use } from 'chai';
import chaiHttp from 'chai-http';
import { OKAPI_TENANT, OKAPI_TOKEN } from './env.js';

const chai = use(chaiHttp);

function runQuery(app, graphQLQuery, cqlQuery) {
  const params = {
    query: graphQLQuery
  };
  if (cqlQuery) {
    params.variables = {
      cql: cqlQuery
    };
  }

  return chai.request.execute(app)
    .post('/graphql')
    .set('X-Okapi-Url', 'http://localhost:9131') // Uses the faked yakbak server
    .set('X-Okapi-Tenant', OKAPI_TENANT)
    .set('X-Okapi-Token', OKAPI_TOKEN)
    .send(params)
    .catch(err => {
      console.error(`${err}`, JSON.parse(err.response.text));
      throw err;
    });
}

export { runQuery }; // eslint-disable-line import/prefer-default-export
