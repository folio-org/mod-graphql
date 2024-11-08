import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import fs from 'fs';
import { testSchema, Status } from '../src/autogen/test/testSchema.js';

describe('04. RAMLs and JSON schemas can be translated into GraphQL schemas', () => {
  const dir = './src/autogen/test';
  const c = { total: 0, passed: 0, exceptions: 0, failed: 0 };
  const errors = [];

  fs.readdirSync(`${dir}/input`).forEach(file => {
    if (file.match(/\.raml$/)) {
      it(file, () => {
        const res = testSchema(dir, file, false, c, errors);
        expect(res).not.to.equal(Status.FAIL);
      });
    }
  });

  after(() => {
    console.info(`      : ${c.total} tests: ${c.passed} passed, ${c.exceptions} expected exceptions, ${c.failed} failed`);
    if (errors.length) {
      errors.forEach((e) => {
        const [name, expected, got] = e;
        console.info(`failed ${name}: expected (${expected}), got (${got})`);
      });
    }
  });
});
