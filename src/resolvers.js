import fetch from 'node-fetch';
import _ from 'lodash';
import resolve from './resolve';


const resolvers = {
  Query: {
    hello: () => 'hi!',
    users: (o, a, c) => resolve(o, a, c, 'users', 'users', null, null, 'users'),
    groups: (o, a, c) => resolve(o, a, c, 'groups', 'groups', null, null, 'usergroups'),
    instance_storage_instances: (o, a, c) => resolve(o, a, c, 'instances', 'instance-storage/instances'),
    instance_storage_instances_SINGLE: (o, a, c) => resolve(o, a, c, 'instance', 'instance-storage/instances/{instanceId}'),
  },

  Metadata: {
    createdByUser: (o, a, c) => resolve(o, a, c, 'createdByUser', 'users/[createdByUserId]'),
    updatedByUser: (o, a, c) => resolve(o, a, c, 'updatedByUser', 'users/[updatedByUserId]'),
  },

  Instance: {
    instanceType: (o, a, c) => resolve(o, a, c, 'instanceType', 'instance-types/[instanceTypeId]'),
    instanceFormat: (o, a, c) => resolve(o, a, c, 'instanceFormat', 'instance-formats/[instanceFormatId]'),
    holdingsRecords: (o, a, c) => resolve(o, a, c, 'holdings', 'holdings-storage/holdings', 'id', 'instanceId', 'holdingsRecords'),
  },

  Identifier: {
    identifierType: (o, a, c) => resolve(o, a, c, 'identifierType', 'identifier-types/[identifierTypeId]'),
  },

  Contributor: {
    contributorType: (o, a, c) => resolve(o, a, c, 'contributorType', 'contributor-types/[contributorTypeId]'),
    contributorNameType: (o, a, c) => resolve(o, a, c, 'contributorNameType', 'contributor-name-types/[contributorNameTypeId]'),
  },

  Classification: {
    classificationType: (o, a, c) => resolve(o, a, c, 'classificationType', 'classification-types/[classificationTypeId]'),
  },

  HoldingsRecord: {
    holdingsItems: (o, a, c) => resolve(o, a, c, 'items', 'inventory/items', 'id', 'holdingsRecordId', 'items'),
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


export default resolvers;
