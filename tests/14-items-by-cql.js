/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect } from './testlib/helper';
import modGraphql from '../src/app';

const app = modGraphql(['tests/schemas-for-tests/mod-inventory-storage/ramls/item-storage.raml']);

const QUERY = `query multipleItems($cql: String) {
  item_storage_items(query: $cql) {
    totalRecords
    items {
      barcode
      holdingsRecord2 {
        callNumber
        holdingsInstance {
          title
        }
      }
    }
  }
}`;

describe('14. query returns items with barcodes matching "1*"', () => {
  describe('query for matching items', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY, 'barcode=(4539876054383 or 765475420716)')
      .then(res => { response = res; }));

    it('contains a payload with items that have matching barcodes', () => {
      expect(response, 'server returns a good response').to.have.status(200);
      const json = JSON.parse(response.text);
      expect(Object.keys(json.data).length, 'response should only  one element').to.equal(1);
      expect(json.data, 'the sole element should be an object').to.be.instanceOf(Object);
      const items = json.data.item_storage_items;
      expect(items, 'response items should be an object').to.be.instanceOf(Object);
      expect(items.totalRecords, 'response should include totalRecords').to.exist;
      expect(items.totalRecords, 'totalRecords should be exactly two').to.equal(2);
      expect(items.items, 'response should include items').to.exist;
      expect(items.items.length, 'returned list should contain exactly two records').to.equal(2);
      for (let i = 0; i < items.items.length; i++) {
        const record = items.items[i];
        expect(record, 'items should be objects').to.be.instanceOf(Object);
        expect(Object.keys(record).length, 'exactly two fields should be included').to.equal(2);
        // See https://github.com/chaijs/chai/issues/56 for explanation of lint-disable
        expect(record.barcode, 'fields should include a barcode').to.exist;
        expect(record.barcode, 'barcode field should be one of those we sought').to.match(/^[47]5?..........[36]$/);
        expect(record.holdingsRecord2, 'fields should include a holdings record').to.exist;
      }
    });

    it('has payload with a holdings record', () => {
      const json = JSON.parse(response.text);
      const items = json.data.item_storage_items;
      const record = items.items[1].holdingsRecord2;
      expect(Object.keys(record).length, 'exactly two holdings-record fields should be included').to.equal(2);
      // Can't test call-number, as to.exist apparently checks for non-nullness
      // expect(record.callNumber, 'holdings record should include call-number').to.exist;
      expect(record.holdingsInstance, 'holdings record should include instance').to.exist;
      const instance = record.holdingsInstance;
      expect(Object.keys(instance).length, 'exactly one instance-record field should be included').to.equal(1);
      expect(instance.title, 'holdings record should have title field').to.exist;
    });
  });
});
