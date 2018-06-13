const fs = require('fs');
const { convertAPI } = require('../convertAPI');

// This has a slightly complex API, because it has to provide all the
// necessary information to two different callers -- ./run-tests.js
// and ../../../tests/01-schema-generation.js
//
// It returns null if an expected exception occurred, otherwise true
// if the generated schema matches the expectation and false if
// not. It also increments two of the members of the `counts` object:
// `total` and one of `passed`, `failed`, `exceptions`. When
// appropriate, it also pushes an error report onto the end of the
// `errors` array.

exports.testSchema = (dir, file, regen, counts, errors) => {
  let schema, hadException = false;
  try {
    ({ schema } = convertAPI(`${dir}/input/${file}`, null, {}));
  } catch (err3) {
    hadException = true;
    schema = `*EXCEPTION* ${err3}`;
  }

  const schemaFile = `${dir}/graphql-schemas/${file.replace(/raml$/, 'graphql')}`;
  counts.total++;

  if (regen) {
    fs.writeFileSync(schemaFile, schema);
    return true;
  }

  const expected = fs.readFileSync(schemaFile, 'utf8');
  if (expected !== schema) {
    counts.failed++;
    errors.push([file, expected, schema]);
    return false;
  } else if (hadException) {
    counts.exceptions++;
    return null;
  } else {
    counts.passed++;
    return true;
  }
};
