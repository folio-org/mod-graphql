import { describe, it } from 'mocha';
import { assert } from 'chai';
import _ from 'lodash';
import { _TESTING_mergeComments as mergeComments } from '../src/autogen/mergeAPIs.js';

describe('01. Comments from multiple RAMLs can be merged', () => {
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
    {
      name: 'two sets of comments with some shared keys',
      input: [
        [
          ['title', ['Instance Storage']],
          ['version', ['v5.0']],
          ['protocols', ['HTTP', 'HTTPS']],
        ],
        [
          ['title', ['Item Storage']],
          ['magicWords', ['xyzzy', 'plugh']],
          ['protocols', ['SMTP']],
        ],
      ],
      output: [
        ['title', ['Instance Storage', 'Item Storage']],
        ['version', ['v5.0']],
        ['protocols', ['HTTP', 'HTTPS', 'SMTP']],
        ['magicWords', ['xyzzy', 'plugh']],
      ],
    },
  ];

  testCases.forEach(testCase => {
    const { name, input, output } = testCase;
    it(name, () => {
      const res = mergeComments(input);
      const outcome = _.isEqual(res, output);
      if (!outcome) {
        console.info('res =', JSON.stringify(res, null, 2), '\noutput =', JSON.stringify(output, null, 2));
      }
      assert(outcome, 'equal');
    });
  });
});
