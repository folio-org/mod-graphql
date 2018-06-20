/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect, UUIDregex } from './testlib/helper';
import app from '../src/app';

describe('query returns a user with an ID and username', () => {
  if (!process.env.LEGACY_RESOLVERS) {
    describe('test not supported with auto-generated resolvers', () => {
      it('passes by default', () => true);
    });
    return;
  }

  describe('query for all users', () => {
    let response;
    beforeEach(() => runQuery(app, 'query { users { id username } }')
      .then(res => { response = res; }));

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
      expect(record.id, 'fields should include an ID').to.exist;
      expect(record.id, 'ID field should be a v4 UUID').to.match(UUIDregex);
      expect(record.username, 'fields should include a username').to.exist;
    });
  });
});
