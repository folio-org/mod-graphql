import { chai, expect } from './testlib/helper';
import { describe, it, beforeEach } from './testlib/helper';
import { OKAPI_TENANT, OKAPI_TOKEN } from './testlib/helper';

import app from '../app';

describe('mod-graphql', function() {
  let server;

  describe('the simplest possible query', function() {
    let response;
    beforeEach(function() {
      return chai.request(app)
        .post('/graphql')
        .set('X-Okapi-Url', 'http://localhost:9131')
        .set('X-Okapi-Tenant', OKAPI_TENANT)
        .set('X-Okapi-Token', OKAPI_TOKEN)
        .send({query: "query { users { id } }"})
        .then(res => {
          response = res;
        });
    });
    it('contains a payload with users', function() {
      expect(response).to.have.status(200);
      expect(JSON.parse(response.text).data.users).to.be.instanceOf(Array);
    });
  });
});
