import { describe, it } from 'mocha';
import { assert } from 'chai';
import { isEqual } from 'lodash';
import { _TESTING_mergeResources as mergeResources } from '../src/autogen/convertAPI';

describe('02. Resources from multiple RAMLs can be merged', () => {
  const testCases = [
    {
      name: 'no resources',
      input: [],
      output: [],
    },
    {
      name: 'compatible resources',
      input: [
        [
          {
            queryName: 'first_query',
            payload: 'whatever',
          },
          {
            queryName: 'second_query',
            payload: 45,
          },
        ],
        [
          {
            queryName: 'third_query',
            payload: 'herring',
          },
          {
            queryName: 'fourth_query',
            payload: 3.141,
          },
        ],
      ],
      output: [
        {
          queryName: 'first_query',
          payload: 'whatever',
        },
        {
          queryName: 'second_query',
          payload: 45,
        },
        {
          queryName: 'third_query',
          payload: 'herring',
        },
        {
          queryName: 'fourth_query',
          payload: 3.141,
        },
      ],
    },
    {
      name: 'conflicting resources',
      input: [
        [
          {
            queryName: 'first_query',
            payload: 'whatever',
          },
          {
            queryName: 'second_query',
            payload: 45,
          },
        ],
        [
          {
            queryName: 'first_query',
            payload: 'herring',
          },
          {
            queryName: 'fourth_query',
            payload: 3.141,
          },
        ],
      ],
      output: "duplicate resource name 'first_query'",
    },
  ];

  testCases.forEach(testCase => {
    const { name, input, output } = testCase;
    it(name, () => {
      let res;
      try {
        res = mergeResources(input);
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
