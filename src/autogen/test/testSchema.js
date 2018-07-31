const fs = require('fs');
const Logger = require('@folio/stripes-logger');
const { convertAPI } = require('../convertAPI');

const Status = {
  PASS: 1,
  FAIL: 2,
  EXCEPTION: 3,
};

const logger = new Logger(process.env.LOGGING_CATEGORIES);

// This has a slightly complex API, because it has to provide all the
// necessary information to two different callers -- ./run-tests.js
// and ../../../tests/01-schema-generation.js
//
// It returns EXCEPTION if an expected exception occurred, otherwise
// PASS if the generated schema matches the expectation and FAIL if
// not. It also increments two of the members of the `counts` object:
// `total` and one of `passed`, `failed`, `exceptions`. When
// appropriate, it also pushes an error report onto the end of the
// `errors` array.

function testSchema(dir, file, regen, counts, errors) {
  let schema, hadException = false;
  try {
    ({ schema } = convertAPI(`${dir}/input/${file}`, null, { logger }));
  } catch (err3) {
    hadException = true;
    schema = `*EXCEPTION* ${err3}`;
  }

  const schemaFile = `${dir}/graphql-schemas/${file.replace(/raml$/, 'graphql')}`;
  counts.total++;

  if (regen) {
    fs.writeFileSync(schemaFile, schema);
    return Status.PASS;
  }

  const expected = fs.readFileSync(schemaFile, 'utf8');
  if (expected !== schema) {
    counts.failed++;
    errors.push([file, expected, schema]);
    return Status.FAIL;
  } else if (hadException) {
    counts.exceptions++;
    return Status.EXCEPTION;
  } else {
    counts.passed++;
    return Status.PASS;
  }
}

exports.testSchema = testSchema;
exports.Status = Status;
