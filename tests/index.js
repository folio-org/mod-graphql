// https://github.com/standard-things/esm#getting-started
require('mocha');
require('chai');
require = require("@std/esm")(module, { esm: 'js' });
require('./mod-graphql-test');
