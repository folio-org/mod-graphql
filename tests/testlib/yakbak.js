import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mocha from 'mocha';
import http from 'http';
import yakbak from 'yakbak';
import { PROXY_OKAPI_URL } from './env.js';
import hash from './hash.js';

// Needed in Node REPL for some reason: see https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const { before, after } = mocha;

let server;
before(() => {
  server = http.createServer(yakbak(PROXY_OKAPI_URL, {
    dirname: path.join(__dirname, '..', 'tapes'),
    // the default hash function is too specific and doesn't let us use the same tape for requests with different headers.
    // so it requires the token to be in the environment. We'll come up with a better hashing function, but for now,
    // we'll just use a single string because we have a single request.
    hash: hash.sync
  })).listen(9131);
  // console.log('dummy server listening on 9131');
});
after(() => {
  server.close();
  // console.log('closed dummy server');
});
