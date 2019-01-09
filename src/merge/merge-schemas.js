const fs = require('fs');
const mergeJsonSchemas = require('merge-json-schemas');

function parseSchema(schemaName) {
  const schemaText = fs.readFileSync(schemaName, 'utf8');
  return JSON.parse(schemaText);
}

const baseSchema = parseSchema('../../tests/mod-inventory-storage-ramls/instance.json');
const overlaySchema = parseSchema('overlaySchema.json');

const merged = mergeJsonSchemas([baseSchema, overlaySchema]);
console.log(JSON.stringify(merged, null, 2));
