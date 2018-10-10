import { describe, it } from 'mocha';
import { assert } from 'chai';
import { isEqual } from 'lodash';
import Logger from '../src/configuredLogger';
import { _TESTING_mergeTypes as mergeTypes } from '../src/autogen/convertAPI';

describe('03. Types from multiple RAMLs can be merged', () => {
  const testCases = [
    {
      name: 'no types',
      input: [],
      output: {},
    },
    {
      name: 'non-overlapping types',
      input: [
        {
          foo: 42,
          bar: 96,
          baz: 11,
        },
        {
          quux: 'some string',
        }
      ],
      output: {
        foo: 42,
        bar: 96,
        baz: 11,
        quux: 'some string',
      }
    },
    {
      name: 'compatible overlapping types',
      input: [
        {
          foo: 42,
          bar: 96,
          baz: 11,
        },
        {
          bar: 96,
          quux: 'some string',
        }
      ],
      output: {
        foo: 42,
        bar: 96,
        baz: 11,
        quux: 'some string',
      },
    },
    {
      name: 'conflicting types',
      input: [
        {
          foo: 42,
          bar: 96,
          baz: 11,
        },
        {
          bar: 97,
          quux: 'some string',
        }
      ],
      output: "duplicate type name 'bar' with different definition",
    },
  ];

  const logger = new Logger();
  testCases.forEach(testCase => {
    const { name, input, output } = testCase;
    it(name, () => {
      let res;
      try {
        res = mergeTypes(input, { logger });
      } catch (e) {
        res = e.message;
      }
      const outcome = isEqual(res, output);
      if (!outcome) {
        console.info('res =', JSON.stringify(res, null, 2), '\noutput =', JSON.stringify(output, null, 2));
      }
      assert(outcome, 'equal');
    });
  });
});
