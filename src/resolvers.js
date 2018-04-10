import fetch from 'node-fetch';
import strictUriEncode from 'strict-uri-encode';
import _ from 'lodash';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    hello: () => 'hi!',
    users: (root, { cql }, context) => {
      const okapi = context.okapi;
      return fetch(`${okapi.url}/users` + (cql ? `?query=${cql}` : ''),
        { headers: okapi.headers }).then((response) => {
        return response.json().then(json => {
          return json.users;
        });
      });
    },
    groups: (root, args, context) => {
      const okapi = context.okapi;
      return fetch(`${okapi.url}/groups`, { headers: okapi.headers }).then((response) => {
        return response.json().then(json => {
          return json.usergroups;
        });
      });
    },
    instances: (root, { cql }, context) => {
      const okapi = context.okapi;
      const url = `${okapi.url}/instance-storage/instances` + (cql ? `?query=${strictUriEncode(cql)}` : '');
      console.log('*** url:', url); // eslint-disable-line no-console
      return fetch(url, { headers: okapi.headers }).then((response) => {
        if (response.status >= 400) {
          // We can't rely on the response body being JSON, so extract it as text
          return response.text().then(text => {
            throw new GraphQLError(text);
          });
        } else {
          return response.json().then(json => ({
            records: json.instances,
            totalCount: json.totalRecords,
          }));
        }
      });
    },
    instance: (root, { id }, context) => {
      const okapi = context.okapi;
      return fetch(`${okapi.url}/instance-storage/instances/${id}`, { headers: okapi.headers }).then((response) => {
        return response.json().then(json => {
          return json;
        });
      });
    },
  },

  Metadata: {
    createdByUser: (obj, args, { okapi }) => fetch(`${okapi.url}/users/${obj.createdByUserId}`,
      { headers: okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
    updatedByUser: (obj, args, { okapi }) => fetch(`${okapi.url}/users/${obj.updatedByUserId}`,
      { headers: okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
  },

  Instance: {
    instanceType: (obj, args, { okapi }) => fetch(`${okapi.url}/instance-types/${obj.instanceTypeId}`,
      { headers: okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
    instanceFormat: (obj, args, { okapi }) => {
      if (!obj.instanceFormatId) {
        return null;
      } else {
        return fetch(`${okapi.url}/instance-formats/${obj.instanceFormatId}`,
          { headers: okapi.headers })
          .then(res => res.text().then(text => {
            if (res.status < 400) return JSON.parse(text);
            throw new Error(text);
          }));
      }
    }
  },

  Identifier: {
    identifierType: (obj, args, { okapi }) => fetch(`${okapi.url}/identifier-types/${obj.identifierTypeId}`,
      { headers: okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
  },

  Contributor: {
    contributorType: (obj, args, { okapi }) => {
      if (!obj.contributorTypeId) {
        return null;
      } else {
        return fetch(`${okapi.url}/contributor-types/${obj.contributorTypeId}`,
          { headers: okapi.headers })
          .then(res => res.text().then(text => {
            if (res.status < 400) return JSON.parse(text);
            throw new Error(text);
          }));
      }
    },
    contributorNameType: (obj, args, { okapi }) => {
      if (!obj.contributorNameTypeId) {
        return null;
      } else {
        return fetch(`${okapi.url}/contributor-name-types/${obj.contributorNameTypeId}`,
          { headers: okapi.headers })
          .then(res => res.text().then(text => {
            if (res.status < 400) return JSON.parse(text);
            throw new Error(text);
          }));
      }
    },
  },

  Classification: {
    classificationType: (obj, args, { okapi }) => {
      if (!obj.classificationTypeId) {
        return null;
      } else {
        return fetch(`${okapi.url}/classification-types/${obj.classificationTypeId}`,
          { headers: okapi.headers })
          .then(res => res.text().then(text => {
            if (res.status < 400) return JSON.parse(text);
            throw new Error(text);
          }));
      }
    },
  },

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
