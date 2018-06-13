// Usage: node run-tests.js [--regenerate] [<test-dir>] [<test-name>]

console.log(`run-tests in ${process.cwd()}`);

const fs = require('fs');
const { testSchema } = require('./testSchema');

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

const counts = { total: 0, passed: 0, exceptions: 0, failed: 0 };
const errors = [];

if (singleTest) {
  testSchema(dir, singleTest, regen, counts, errors);
} else {
  try {
    fs.readdirSync(`${dir}/input`).forEach(file => {
      if (file.match(/\.raml$/)) testSchema(dir, file, regen, counts, errors);
    });
  } catch (err) {
    console.error(`Cannot read input files: ${err.message}`);
    process.exit(1);
  }
}

if (!regen) {
  console.info(`\t${counts.total} tests: ${counts.passed} passed, ${counts.exceptions} expected exceptions, ${counts.failed} failed`);
}
if (counts.failed === 0) {
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
