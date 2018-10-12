import fetch from 'node-fetch';
import _ from 'lodash';

// We'll keep the file around for now so we can consult its mutation support
console.error('this code is no longer supported');

const resolvers = {
  Mutation: {
    updateUser: (root, updated, { okapi }) => {
      // We don't currently support PATCH so we'll need to grab the record to base our update on
      return fetch(`${okapi.url}/users/${updated.id}`, { headers: okapi.headers })
        .then(res => res.json())
        .then((orig) => {
          const record = _.merge({}, orig, updated);
          return fetch(`${okapi.url}/users/${updated.id}`,
            { headers: okapi.headers, method: 'PUT', body: JSON.stringify(record) })
            .then(res => res.text().then(text => {
              if (res.status < 400) return record;
              throw new Error(text);
            }));
        });
    },
    createGroup: (root, { record }, { okapi }) => {
      return fetch(`${okapi.url}/groups`,
        { headers: okapi.headers, method: 'POST', body: JSON.stringify(record) })
        .then(res => res.text().then(text => {
          if (res.status < 400) return JSON.parse(text);
          throw new Error(text);
        }));
    },
    updateGroup: (root, { id, record }, { okapi }) => {
      const headers = Object.assign({}, okapi.headers, { 'Accept': 'text/plain' });
      return fetch(`${okapi.url}/groups/${id}`, { headers: okapi.headers })
        .then(res => res.json())
        .then((orig) => {
          const fullRecord = _.merge({}, orig, record);
          delete fullRecord.metadata;
          return fetch(`${okapi.url}/groups/${id}`,
            { headers, method: 'PUT', body: JSON.stringify(fullRecord) })
            .then(res => res.text().then(text => {
              if (res.status < 400) return fullRecord;
              throw new Error(text);
            }));
        });
    },
    deleteGroup: (root, { id }, { okapi }) => {
      const headers = Object.assign({}, okapi.headers, { 'Accept': 'text/plain' });
      return fetch(`${okapi.url}/groups/${id}`,
        { headers, method: 'DELETE' })
        .then(res => res.text().then(text => {
          if (res.status < 400) return id;
          throw new Error(text);
        }));
    },
  },
};


export default resolvers;
