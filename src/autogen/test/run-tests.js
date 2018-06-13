// Usage: node run-tests.js [--regenerate] [<test-dir>] [<test-name>]

console.log(`run-tests in ${process.cwd()}`);

const fs = require('fs');
const { convertAPI } = require('../convertAPI');

let regen, dir, singleTest;
if (process.argv[2] === '--regenerate') {
  regen = true;
  dir = process.argv[3];
  singleTest = process.argv[4];
} else {
  regen = false;
  dir = process.argv[2];
  singleTest = process.argv[3];
}
if (!dir) dir = '.';

let ntotal = 0, npassed = 0, nexceptions = 0, nfailed = 0;
const errors = [];

function testSchema(file) {
  let schema, hadException = false;
  try {
    ({ schema } = convertAPI(`${dir}/input/${file}`, null, {}));
  } catch (err3) {
    hadException = true;
    schema = `*EXCEPTION* ${err3}`;
  }

  const schemaFile = `${dir}/graphql-schemas/${file.replace(/raml$/, 'graphql')}`;
  ntotal++;

  if (regen) {
    fs.writeFileSync(schemaFile, schema);
  } else {
    const expected = fs.readFileSync(schemaFile, 'utf8');
    if (expected !== schema) {
      console.info(`FAIL ${file}`);
      nfailed++;
      errors.push([file, expected, schema]);
    } else if (hadException) {
      console.info(`ok ${file} (exception)`);
      nexceptions++;
    } else {
      console.info(`ok ${file}`);
      npassed++;
    }
  }
}

if (singleTest) {
  testSchema(singleTest);
} else {
  try {
    fs.readdirSync(`${dir}/input`).forEach(file => {
      if (file.match(/\.raml$/)) testSchema(file);
    });
  } catch (err) {
    console.error(`Cannot read input files: ${err.message}`);
    process.exit(1);
  }
}

if (!regen) {
  console.info(`\t${ntotal} tests: ${npassed} passed, ${nexceptions} expected exceptions, ${nfailed} failed`);
}
if (nfailed === 0) {
  console.log('\tSUCCESS!');
}
if (errors.length) {
  console.info();
  errors.forEach((e) => {
    const [name, expected, got] = e;
    console.info(`failed ${name}: expected (${expected}), got (${got})`);
  });
  process.exit(2);
}
