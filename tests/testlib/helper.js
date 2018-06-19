import mocha from 'mocha';
import { request } from 'chai';
import './yakbak';
import './chai';

import { OKAPI_TENANT, OKAPI_TOKEN } from './env';
// export * from './env';

export const { before, after, beforeEach, afterEach, describe, it } = mocha;

export { default as chai, expect } from 'chai';

export const UUIDregex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;

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
