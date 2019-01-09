const fs = require('fs');
const mergeJsonSchemas = require('merge-json-schemas');

function parseSchema(schemaName) {
  const schemaText = fs.readFileSync(schemaName, 'utf8');
  return JSON.parse(schemaText);
}

const baseSchema = parseSchema('../../tests/mod-inventory-storage-ramls/instance.json');

const overlaySchema = {
  type: 'object',
  properties: {
    holdingsRecords3: {
      type: "array",
      description: "List of holdings records",
      items: {
        type: "object",
        $ref: "holdingsrecord.json"
      },
      readonly: true,
      "folio:isVirtual": true,
      "folio:linkBase": "holdings-storage/holdings",
      "folio:linkFromField": "id",
      "folio:linkToField": "instanceId",
      "folio:includedElement": "holdingsRecords"
    },
  },
};

const m1 = mergeJsonSchemas([baseSchema, overlaySchema]);
console.log(JSON.stringify(m1, null, 2));
