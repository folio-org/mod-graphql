// Taken from https://github.com/flickr/incoming-message-hash/blob/master/index.js
// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

import crypto from 'crypto';
import url from 'url';

function sort(obj) {
  const ret = {};

  Object.keys(obj).sort().forEach((key) => {
    ret[key] = obj[key];
  });

  return ret;
}

function createHash(algorithm) {
  return crypto.createHash(algorithm || 'md5');
}

function updateHash(hash, req) {
  const parts = url.parse(req.url, true);

  hash.update(req.httpVersion);
  hash.update(req.method);
  hash.update(parts.pathname);
  hash.update(JSON.stringify(sort(parts.query)));
  // hash.update(JSON.stringify(sort(req.headers)));
  hash.update(JSON.stringify(sort(req.trailers)));
}

function createStream(algorithm, encoding) {
  const hash = createHash(algorithm);

  hash.on('pipe', (req) => {
    updateHash(hash, req);
  });

  hash.setEncoding(encoding || 'hex');

  return hash;
}

createStream.sync = (req, body, algorithm, encoding) => {
  const hash = createHash(algorithm);

  updateHash(hash, req);

  hash.write(body);

  return hash.digest(encoding || 'hex');
};

export default createStream;
