import { describe, it } from 'mocha';
import { assert } from 'chai';
import { execSync } from 'child_process';

const testCases = [
  {
    name: 'different schema name, matching definition',
    services: ['service1', 'service2'],
    matches: [
      [ true, /^# title: First/m ],
      [ true, /^# title: .*Second/m ],
      [ true, /^type Tperson /m ],
      [ true, /^type TbasicPerson /m ],
    ],
  },
  {
    name: 'same schema name, matching definition',
    services: ['service1', 'service3'],
    matches: [
      [ true, /^# title: First/m ],
      [ true, /^# title: .*Third/m ],
      [ true, /^type Tperson /m ],
      [ false, /basicPerson/ ],
    ],
  },
  {
    name: 'different schema name, different definition',
    services: ['service1', 'service4'],
    matches: [
      [ true, /^# title: First/m ],
      [ true, /^# title: .*Fourth/m ],
      [ true, /^type Tperson /m ],
      [ true, /^type TadvancedPerson /m ],
    ],
  },
  {
    name: 'same schema name, different definition',
    services: ['service1', 'service5'],
    matches: [
      [ true, /^# title: First/m ],
      [ true, /^# title: .*Fifth/m ],
      [ true, /^type Tperson /m ],
      [ true, /^type TadvancedPerson /m ],
    ],
  },
];

describe('20. merge toy schemas', () => {
  testCases.forEach(testCase => {
    const { name, services, matches } = testCase;
    const command = './src/autogen/raml2graphql ' + services.map(x => `tests/handmade-raml/${x}.raml`).join(' ');

    it(name, (done) => {
      let output;
      try {
        output = execSync(command);
      } catch (e) {
        console.error('failed:', typeof e, e.toString());
        done(e);
        return;
      }

      // The schema-merge suceeded; check that the output is the expected GraphQL schema
      const s = output.toString();
      // console.log(s);
      matches.forEach(matchCase => {
        const [shouldMatch, regexp] = matchCase;
        const matches = s.match(regexp);
        assert(!!matches === shouldMatch, (shouldMatch ? 'does not match' : 'matches') + ' ' + regexp);
      });
      done();
    });
  });
});
