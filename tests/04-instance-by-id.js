/* eslint-disable no-unused-expressions */

import { describe, beforeEach, runQuery, it, expect } from './testlib/helper';
import app from '../src/app';

const QUERY = `{
  instance_storage_instances_SINGLE(instanceId: "7fbd5d84-62d1-44c6-9c45-6cb173998bbd") {
    id
    title
    alternativeTitles
    subjects
    holdingsRecords {
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
        enumeration
      }
    }
  }
}`;

describe('query returns an instance with holdings', () => {
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
      expect(Object.keys(record).length, 'exactly five fields should be included').to.equal(5);
      expect(record.id, 'fields should include an ID').to.exist;
      expect(record.title, 'fields should include a title').to.exist;
      expect(record.alternativeTitles, 'fields should include alternativeTitles').to.exist;
      expect(record.alternativeTitles, 'alternativeTitles should be an array').to.be.instanceOf(Array);
      expect(record.subjects, 'fields should include subjects').to.exist;
      expect(record.subjects, 'subjects should be an array').to.be.instanceOf(Array);
      expect(record.holdingsRecords, 'fields should include holdings').to.exist;
    });

    it('has two holdings records', () => {
      const json = JSON.parse(response.text);
      const record = json.data.instance_storage_instances_SINGLE;
      const hr = record.holdingsRecords;
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
  });
});
