import path from 'path';
import mocha from 'mocha';
import http from 'http';
import yakbak from 'yakbak';
import { OKAPI_URL } from './env';
import hash from './hash';

const { before, after } = mocha;

let server;
before(() => {
  server = http.createServer(yakbak(OKAPI_URL, {
    dirname: path.join(__dirname, '..', 'tapes'),
    // the default hash function is too specific and doesn't let us use the same tape for requests with different headers.
    // so it requires the token to be in the environment. We'll come up with a better hashing function, but for now,
    // we'll just use a single string because we have a single request.
    hash: hash.sync
  })).listen(9131);
});
after(() => {
  server.close();
});
