const mergeJsonSchemas = require('merge-json-schemas');

const consumer1Schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      maxLength: 20,
    },
  },
};

const consumer2Schema = {
  type: 'object',
  required: ['gender'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    gender: {
      type: 'string',
      enum: ['male', 'female'],
    },
  },
};

const m1 = mergeJsonSchemas([consumer1Schema, consumer2Schema]);
console.log(JSON.stringify(m1, null, 2));

const overlay = {
  properties: {
    gender: {
      minLength: 1,
    },
  },
}

const m2 = mergeJsonSchemas([m1, overlay]);
console.log(JSON.stringify(m2, null, 2));
