import chai  from 'chai';
import chaiHttp from 'chai-http';
import mocha from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;
const { describe, it, before, after, beforeEach } = mocha;

import app from '../app';

import dotenv from 'dotenv';
dotenv.config();
const OKAPI_URL = process.env['OKAPI_URL'] || 'http://localhost:9130';
const OKAPI_TENANT = process.env['OKAPI_TENANT'] || 'testing-tenant';
const OKAPI_TOKEN = process.env['OKAPI_TOKEN'] || 'abc123';

describe('mod-graphql', function() {
  let server;
  before(function() {
    var http = require('http');
    var yakbak = require('yakbak');

    server = http.createServer(yakbak(OKAPI_URL, {
      dirname: __dirname + '/tapes',
      // the default hash function is to specific and doesn't let us use the same tape for requests with different headers.
      // so it requires the token to be in the environment. We'll come up with a better hashing function, but for now,
      // we'll just use a single string because we have a single request.
      hash(req, body) {
        return 'singleton-for-now';
      }
    })).listen(9131);
  });
  after(function () {
    server.close();
  });

  describe('the simplest possible query', function() {
    let response;
    beforeEach(function() {
      return chai.request(app)
        .post('/graphql')
        .set('X-Okapi-Url', 'http://localhost:9131')
        .set('X-Okapi-Tenant', OKAPI_TENANT)
        .set('X-Okapi-Token', OKAPI_TOKEN)
        .send({query: "query { users { id } }"})
        .then(res => {
          response = res;
        });
    });
    it('contains a payload with users', function() {
      expect(response).to.have.status(200);
      expect(JSON.parse(response.text).data.users).to.be.instanceOf(Array);
    });
  });
});
