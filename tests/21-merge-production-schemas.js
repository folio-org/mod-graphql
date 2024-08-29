/* eslint-disable prefer-arrow-callback, func-names */

import { describe, it } from 'mocha';
import { assert } from 'chai';
import { execSync } from 'child_process';

describe('21. merge production schemas', function () {
  it('compile and merge', function (done) {
    this.timeout(50000);

    // XXX this must run against the same schemas listed on the CMD line of ../Dockerfile
    const command = './src/autogen/raml2graphql ./build/schemas-for-build/*/ramls/*.raml';
    let output;
    try {
      output = execSync(command);
    } catch (e) {
      console.error('failed:', typeof e, e.toString());
      done(e);
      return;
    }

    // The process suceeded; check that the output is expected RAML
    const s = output.toString();
    assert(s.match(/^# title: /m), 'output contains title');
    assert(s.match(/^# version: /m), 'output contains version');
    assert(s.match(/^type Query {$/m), 'output contains type Query');
    done();
  });
});
