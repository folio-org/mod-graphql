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

let ntotal = 0, npassed = 0, nexceptions = 0, nfailed = 0;
const errors = [];

try {
  fs.readdirSync(`${dir}/input`).forEach(runTest);
} catch (err) {
  console.error(`Cannot read input files: ${err.message}`);
  process.exit(1);
}

if (!regen) {
  console.info(`${ntotal} tests: ${npassed} passed (including ${nexceptions} expected exceptions), ${nfailed} failed`);
}
if (nfailed === 0) {
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
  ntotal++;

  if (regen) {
    fs.writeFileSync(schemaFile, schema);
  } else {
    const expected = fs.readFileSync(schemaFile, 'utf8');
    if (expected === schema) {
      console.info(`ok ${file}`);
      npassed++;
      if (schema.startsWith('*')) nexceptions++;
    } else {
      console.info(`FAIL ${file}`);
      nfailed++;
      errors.push([file, expected, schema]);
    }
  }
}
