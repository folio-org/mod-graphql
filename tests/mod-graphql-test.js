import { chai, expect, describe, it, beforeEach, OKAPI_TENANT, OKAPI_TOKEN } from './testlib/helper';

import app from '../src/app';

describe('mod-graphql', () => {
  describe('the simplest possible query', () => {
    let response;
    beforeEach(() => {
      return chai.request(app)
        .post('/graphql')
        .set('X-Okapi-Url', 'http://localhost:9131') // Uses the faked yakbak server
        .set('X-Okapi-Tenant', OKAPI_TENANT)
        .set('X-Okapi-Token', OKAPI_TOKEN)
        .send({ query: 'query { users { id } }' })
        .then(res => {
          response = res;
        });
    });
    it('contains a payload with users', () => {
      expect(response).to.have.status(200);
      expect(JSON.parse(response.text).data.users).to.be.instanceOf(Array);
    });
  });
});
