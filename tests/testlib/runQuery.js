import { OKAPI_TENANT, OKAPI_TOKEN } from './env';
import { request } from 'chai';

export const runQuery = (xapp, query) => {
  return request(xapp)
    .post('/graphql')
    .set('X-Okapi-Url', 'http://localhost:9131') // Uses the faked yakbak server
    .set('X-Okapi-Tenant', OKAPI_TENANT)
    .set('X-Okapi-Token', OKAPI_TOKEN)
    .send({ query })
    .catch(err => {
      console.error(`${err}`, JSON.parse(err.response.text));
      throw err;
    });
};
