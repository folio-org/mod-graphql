const fs = require('fs');
const { convertAPI } = require('../convertAPI');

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
  } else {
    const expected = fs.readFileSync(schemaFile, 'utf8');
    if (expected !== schema) {
      console.info(`FAIL ${file}`);
      counts.failed++;
      errors.push([file, expected, schema]);
    } else if (hadException) {
      console.info(`ok ${file} (exception)`);
      counts.exceptions++;
    } else {
      console.info(`ok ${file}`);
      counts.passed++;
    }
  }
};
