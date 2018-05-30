// Usage: node run-tests.js [--regenerate] [<test-dir>]

const fs = require('fs');
const { convertAPI } = require('../convertAPI');

let regen, dir;
if (process.argv[2] === '--regenerate') {
  regen = true;
  dir = process.argv[3];
} else {
  regen = false;
  dir = process.argv[2];
}
if (!dir) dir = '.';

let total = 0, passed = 0, exceptions = 0, failed = 0;
const errors = [];

try {
  fs.readdirSync(`${dir}/input`).forEach(runTest);
} catch (err) {
  console.error(`Cannot read input files: ${err.message}`);
  process.exit(1);
}

if (!regen) {
  console.info(`${total} tests: ${passed} passed (including ${exceptions} expected exceptions), ${failed} failed`);
}
if (failed === 0) {
  console.log("Success!");
}
if (errors.length) {
  console.info();
  errors.forEach((e) => {
    const [name, expected, got] = e;
    console.info(`failed ${name}: expected (${expected}), got (${got})`);
  });
  process.exit(2);
}


function runTest(file) {
  let schema, resolvers;
  try {
    ({ schema, resolvers } = convertAPI(`${dir}/input/${file}`, {}));
  } catch (err3) {
    schema = `*${err3}`;
  }

  const schemaFile = `${dir}/output/${file.replace(/raml$/, 'graphql')}`;
  total++;

  if (regen) {
    fs.writeFileSync(schemaFile, schema);
  } else {
    const expected = fs.readFileSync(schemaFile, 'utf8');
    if (expected === schema) {
      console.info(`ok ${file}`);
      passed++;
      if (schema.startsWith('*')) exceptions++;
    } else {
      console.info(`FAIL ${file}`);
      failed++;
      errors.push([file, expected, schema]);
    }
  }
}
