import mocha from 'mocha';
import { OKAPI_URL } from './env';
import hash from './hash';

const { before, after } = mocha;

let server;
before(function() {
  var http = require('http');
  var yakbak = require('yakbak');

  server = http.createServer(yakbak(OKAPI_URL, {
    dirname: __dirname + '/../tapes',
    // the default hash function is to specific and doesn't let us use the same tape for requests with different headers.
    // so it requires the token to be in the environment. We'll come up with a better hashing function, but for now,
    // we'll just use a single string because we have a single request.
    hash: hash.sync
  })).listen(9131);
});
after(function () {
  server.close();
});
