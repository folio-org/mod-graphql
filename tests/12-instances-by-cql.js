/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect, UUIDregex } from './testlib/helper';
import modGraphql from '../src/app';

const app = modGraphql('tests/schemas-for-tests/mod-inventory-storage/ramls/instance-storage.raml');

const QUERY = `query multipleInstances($cql: String) {
  instance_storage_instances(query: $cql) {
    instances { id title }
    totalRecords
  }
}`;

describe('12. query returns instances matching "ba*"', () => {
  describe('query for matching instances', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY, 'title=ba*')
      .then(res => { response = res; }));

    it('contains a payload with instances that have IDs', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      expect(Object.keys(json.data).length, 'response should only contain one element').to.equal(1);
      expect(json.data, 'the sole element should be an object').to.be.instanceOf(Object);
      const instances = json.data.instance_storage_instances;
      expect(instances, 'response instances should be an object').to.be.instanceOf(Object);
      expect(instances.totalRecords, 'response should include totalRecords').to.exist;
      expect(instances.totalRecords, 'totalRecords should be at least three').to.be.at.least(3);
      expect(instances.totalRecords, 'totalRecords should be less than ten').not.to.be.at.least(10);
      expect(instances.instances, 'response should include instances').to.exist;
      expect(instances.instances.length, 'returned list should contain at least three records').above(3);
      for (let i = 0; i < instances.instances.length; i++) {
        const record = instances.instances[i];
        expect(record, 'instances should be objects').to.be.instanceOf(Object);
        expect(Object.keys(record).length, 'exactly two fields should be included').to.equal(2);
        // See https://github.com/chaijs/chai/issues/56 for explanation of lint-disable
        expect(record.id, 'fields should include an ID').to.exist;
        expect(record.id, 'ID field should be a v4 UUID').to.match(UUIDregex);
        expect(record.title, 'fields should include a title').to.exist;
        expect(record.title).to.match(/\bba/i);
      }
    });
  });
});
