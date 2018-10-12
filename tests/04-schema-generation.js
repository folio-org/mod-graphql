import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import { testSchema, Status } from '../src/autogen/test/testSchema';

describe('04. RAMLs and JSON schemas can be translated into GraphQL schemas', () => {
  const dir = './src/autogen/test';
  const counts = { total: 0, passed: 0, exceptions: 0, failed: 0 };
  const errors = [];

  fs.readdirSync(`${dir}/input`).forEach(file => {
    if (file.match(/\.raml$/)) {
      it(file, () => {
        const res = testSchema(dir, file, false, counts, errors);
        expect(res).not.to.equal(Status.FAIL);
      });
    }
  });

  after(() => {
    if (errors.length) {
      errors.forEach((e) => {
        const [name, expected, got] = e;
        console.info(`failed ${name}: expected (${expected}), got (${got})`);
      });
    }
  });
});
