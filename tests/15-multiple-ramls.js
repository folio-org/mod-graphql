/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect } from './testlib/helper';
import modGraphql from '../src/app';

const app = modGraphql([
  'tests/input/mod-inventory-storage/ramls/instance-storage.raml',
  'tests/input/mod-inventory-storage/ramls/item-storage.raml'
]);

const QUERY1 = `query multipleInstances($cql: String) {
  instance_storage_instances(query: $cql) {
    totalRecords
    instances { id title }
  }
}`;
const QUERY2 = `query multipleItems($cql: String) {
  item_storage_items(query: $cql) {
    totalRecords
    items { barcode }
  }
}`;

describe('15. a single service supports both instance and item queries', () => {
  describe('query for instances', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY1, 'title=ba*')
      .then(res => { response = res; }));

    it('contains a payload with instances', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      const instances = json.data.instance_storage_instances;
      expect(instances.totalRecords, 'response should include totalRecords').to.exist;
      expect(instances.instances, 'response should include instances').to.exist;
    });
  });

  describe('query for items', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY2, 'barcode=1*')
      .then(res => { response = res; }));

    it('contains a payload with items', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      const items = json.data.item_storage_items;
      expect(items.totalRecords, 'response should include totalRecords').to.exist;
      expect(items.items, 'response should include items').to.exist;
    });
  });
});
