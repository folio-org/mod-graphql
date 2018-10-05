import { describe, it } from 'mocha';
import { assert } from 'chai';
import { isEqual } from 'lodash';
import { _TESTING_mergeComments as mergeComments } from '../src/autogen/convertAPI';

describe('01. RAMLs and JSON schemas can be translated into GraphQL schemas', () => {
  const testCases = [
    {
      name: 'no comments',
      input: [],
      output: [],
    },
    {
      name: 'single set of comments',
      input: [
        [
          ['title', ['Instance Storage']],
          ['version', ['v5.0']],
          ['protocols', ['HTTP', 'HTTPS']],
        ],
      ],
      output: [
        ['title', ['Instance Storage']],
        ['version', ['v5.0']],
        ['protocols', ['HTTP', 'HTTPS']],
      ],
    },
    {
      name: 'two sets of comments using same keys',
      input: [
        [
          ['title', ['Instance Storage']],
          ['version', ['v5.0']],
          ['protocols', ['HTTP', 'HTTPS']],
        ],
        [
          ['title', ['Item Storage']],
          ['version', ['v5.0']],
          ['protocols', ['HTTP', 'HTTPS']],
        ],
      ],
      output: [
        ['title', ['Instance Storage', 'Item Storage']],
        ['version', ['v5.0', 'v5.0']],
        ['protocols', ['HTTP', 'HTTPS', 'HTTP', 'HTTPS']],
      ],
    },
  ];

  testCases.forEach(testCase => {
    const { name, input, output } = testCase;
    it(name, () => {
      const res = mergeComments(input);
      // console.log('res =', JSON.stringify(res, null, 2));
      // console.log('output =', JSON.stringify(output, null, 2));
      assert(isEqual(res, output), 'equal');
    });
  });
});
