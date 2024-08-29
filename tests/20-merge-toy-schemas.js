import { describe, it } from 'mocha';
import { assert } from 'chai';
import { execSync } from 'child_process';

const testCases = [
  {
    name: 'different schema name, matching definition',
    services: ['service1', 'service2'],
    matches: [
      [true, /^# title: First/m],
      [true, /^# title: .*Second/m],
      [true, /^type Tws1_person_SINGLE__person /m],
      [true, /^type Tws2_person_SINGLE__basicPerson /m],
    ],
  },
  {
    name: 'same schema name, matching definition',
    services: ['service1', 'service3'],
    matches: [
      [true, /^# title: First/m],
      [true, /^# title: .*Third/m],
      [true, /^type Tws1_person_SINGLE__person /m],
      [false, /type Tws3_person_SINGLE__basicPerson/],
    ],
  },
  {
    name: 'different schema name, different definition',
    services: ['service1', 'service4'],
    matches: [
      [true, /^# title: First/m],
      [true, /^# title: .*Fourth/m],
      [true, /^type Tws1_person_SINGLE__person /m],
      [true, /^type Tws4_person_SINGLE__advancedPerson /m],
    ],
  },
  {
    name: 'same schema name, different definition',
    services: ['service1', 'service5'],
    matches: [
      [true, /^# title: First/m],
      [true, /^# title: .*Fifth/m],
      [true, /^type Tws1_person_SINGLE__person /m],
      [true, /^type Tws5_person_SINGLE__person /m],
    ],
  },
  {
    name: 'schema included at multiple levels by different resources',
    services: ['service1', 'service6'],
    matches: [
      [true, /^# title: First/m],
      [true, /^# title: .*Sixth/m],
      [true, /^type T_basic_person /m],
      [true, /^type Tws1_person_SINGLE__person /m],
      [true, /^type Tws6_person_SINGLE__person /m],
    ],
  },
];

describe('20. merge toy schemas', () => {
  testCases.forEach(testCase => {
    const { name, services, matches } = testCase;
    const command = './src/autogen/raml2graphql ' + services.map(x => `tests/handmade-raml/${x}.raml`).join(' ');

    it(name, (done) => {
      this.timeout(50000);
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
        const doesMatch = s.match(regexp);
        assert(!!doesMatch === shouldMatch, (shouldMatch ? 'does not match' : 'matches') + ' ' + regexp);
      });
      done();
    });
  });
});
