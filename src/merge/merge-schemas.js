const fs = require('fs');
const mergeJsonSchemas = require('merge-json-schemas');

if (process.argv.length !== 4) {
  console.error(`Usage: ${process.argv0} baseSchema.json overlaySchema.json`);
  process.exit(1);
}

const baseSchemaName = process.argv[2];
const overlaySchemaName = process.argv[3];

function parseSchema(fileName) {
  const schemaText = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(schemaText);
}

const baseSchema = parseSchema(baseSchemaName);
const overlaySchema = parseSchema(overlaySchemaName);

const merged = mergeJsonSchemas([baseSchema, overlaySchema]);
console.log(JSON.stringify(merged, null, 2)); // eslint-disable-line no-console
