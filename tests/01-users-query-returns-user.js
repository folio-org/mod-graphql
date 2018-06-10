import { chai, expect, describe, it, beforeEach, OKAPI_TENANT, OKAPI_TOKEN } from './testlib/helper';

import app from '../src/app';

// The first regexp is more rigorous, but fails in our tests, hence the second
// const UUIDregex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
const UUIDregex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;

describe('query returns a user with an ID', () => {
  describe('query for all users', () => {
    let response;
    beforeEach(() => {
      return chai.request(app)
        .post('/graphql')
        .set('X-Okapi-Url', 'http://localhost:9131') // Uses the faked yakbak server
        .set('X-Okapi-Tenant', OKAPI_TENANT)
        .set('X-Okapi-Token', OKAPI_TOKEN)
        .send({
          query: 'query { users { id username } }',
          variables: { limit: 3, cql: 'diku_admin' },
        })
        .then(res => {
          response = res;
        });
    });

    it('contains a payload with users that have IDs', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      expect(Object.keys(json.data).length, 'response should only contain one element').to.equal(1);
      expect(json.data, 'the sole element should be an object').to.be.instanceOf(Object);
      expect(json.data.users, 'response users should be an array').to.be.instanceOf(Array);
      expect(json.data.users.length, 'returned list should contain at least one record').above(0);
      const record = json.data.users[0];
      expect(record, 'records should be objects').to.be.instanceOf(Object);
      expect(Object.keys(record).length, 'exactly two fields should be included').to.equal(2);
      // See https://github.com/chaijs/chai/issues/56 for explanation of lint-disable
      // eslint-disable-next-line no-unused-expressions
      expect(record.id, 'fields should include an ID').to.exist;
      expect(record.id, 'ID field should be a v4 UUID').to.match(UUIDregex);
      // eslint-disable-next-line no-unused-expressions
      expect(record.username, 'fields should include a username').to.exist;
    });
  });
});
