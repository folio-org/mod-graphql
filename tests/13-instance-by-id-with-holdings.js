/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect } from './testlib/helper';
import modGraphql from '../src/app';

const app = modGraphql('tests/input/mod-inventory-storage/ramls/instance-storage.raml');

const QUERY = `{
  instance_storage_instances_SINGLE(instanceId: "7fbd5d84-62d1-44c6-9c45-6cb173998bbd") {
    id
    title
    subjects
    holdingsRecords2 {
      id
      callNumber
      instanceId
      holdingsItems {
        id
      }
      holdingsItems {
        barcode
        status {
          name
        }
      }
    }
  }
}`;

describe('13. query returns an instance with holdings', () => {
  describe('query for instances by ID', () => {
    let response;
    beforeEach(() => runQuery(app, QUERY)
      .then(res => { response = res; }));

    it('got a successful HTTP response', () => {
      expect(response, 'server returns a good response').to.have.status(200);
    });

    it('contains a payload with an instances that has holdings', () => {
      const json = JSON.parse(response.text);
      expect(Object.keys(json.data).length, 'response should only contain one element').to.equal(1);
      expect(json.data, 'the sole element should be an object').to.be.instanceOf(Object);
      const record = json.data.instance_storage_instances_SINGLE;
      expect(record, 'response instance should be an object').to.be.instanceOf(Object);
      expect(Object.keys(record).length, 'exactly four fields should be included').to.equal(4);
      expect(record.id, 'fields should include an ID').to.exist;
      expect(record.title, 'fields should include a title').to.exist;
      expect(record.subjects, 'fields should include subjects').to.exist;
      expect(record.subjects, 'subjects should be an array').to.be.instanceOf(Array);
      expect(record.holdingsRecords2, 'fields should include holdings').to.exist;
    });

    it('has two holdings records', () => {
      const json = JSON.parse(response.text);
      const record = json.data.instance_storage_instances_SINGLE;
      const hr = record.holdingsRecords2;
      expect(hr, 'holdings should be an array').to.be.instanceOf(Array);
      expect(hr, 'holdings should be an array').to.be.instanceOf(Array);
      expect(hr.length, 'holdings should contain two records').to.equal(2);
      for (let i = 0; i < 2; i++) {
        expect(Object.keys(hr[i]).length, 'exactly four holdings fields should be included').to.equal(4);
        'id,callNumber,instanceId,holdingsItems'.split(',').forEach(field => {
          expect(hr[i][field], `holdings field '${field}' should exist`).to.exist;
          expect(hr[i].instanceId, 'holdings instanceId should match instance ID').to.equal(record.id);
        });
      }
    });

    it('has two items in first holdings record', () => {
      const json = JSON.parse(response.text);
      const record = json.data.instance_storage_instances_SINGLE;
      const hr = record.holdingsRecords2;
      const hi = hr[0].holdingsItems;
      expect(hi, 'holdings items should be an array').to.be.instanceOf(Array);
      expect(hi.length, 'two holdings items should be present').to.equal(2);
      for (let i = 0; i < 2; i++) {
        expect(Object.keys(hi[i]).length, 'exactly three holdings-tiem fields should be included').to.equal(3);
        'id,barcode,status'.split(',').forEach(field => {
          expect(hi[i][field], `holdings field '${field}' should exist`).to.exist;
        });
      }
    });
  });
});
