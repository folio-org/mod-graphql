/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect, UUIDregex } from './testlib/helper';
import modGraphql from '../src/app';

const app = modGraphql();

const QUERY = `query multipleInstances($cql: String) {
  instance_storage_instances(query: $cql) {
    instances { id title }
    totalRecords
  }
}`;

describe('11. query returns an instance with an ID and title', () => {
  describe('query for all instances', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY, 'title=a*')
      .then(res => { response = res; }));

    it('contains a payload with instances that have IDs', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      expect(Object.keys(json.data).length, 'response should only contain one element').to.equal(1);
      expect(json.data, 'the sole element should be an object').to.be.instanceOf(Object);
      const instances = json.data.instance_storage_instances;
      expect(instances, 'response instances should be an object').to.be.instanceOf(Object);
      expect(instances.totalRecords, 'response should include totalRecords').to.exist;
      expect(instances.totalRecords, 'totalRecords should be at least ten').to.be.at.least(10);
      expect(instances.instances, 'response should include instances').to.exist;
      expect(instances.instances.length, 'returned list should contain at least one record').above(0);
      const record = instances.instances[0];
      expect(record, 'instances should be objects').to.be.instanceOf(Object);
      expect(Object.keys(record).length, 'exactly two fields should be included').to.equal(2);
      // See https://github.com/chaijs/chai/issues/56 for explanation of lint-disable
      expect(record.id, 'fields should include an ID').to.exist;
      expect(record.id, 'ID field should be a v4 UUID').to.match(UUIDregex);
      expect(record.title, 'fields should include a title').to.exist;
    });
  });
});
