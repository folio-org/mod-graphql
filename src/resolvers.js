import fetch from 'node-fetch';
import _ from 'lodash';
import { GraphQLError } from 'graphql';
import queryString from 'query-string';
import Logger from '@folio/stripes-logger';


function resolve(obj, args, context, caption, path, linkFromField, linkToField, skeleton) {
  const { cql, offset, limit } = args;
  const { okapi, loggingCategories } = context;
  const logger = new Logger(loggingCategories);

  const failedSubstitutions = [];
  const processedPath = path
    .replace(/{(.*?)}/g, (text, match) => {
      if (args[match] === undefined) failedSubstitutions.push(text);
      return args[match];
    })
    .replace(/\[(.*?)\]/g, (text, match) => {
      if (obj[match] === undefined) failedSubstitutions.push(text);
      return obj[match];
    });
  if (failedSubstitutions.length !== 0) {
    logger.log('failsub', `failed substitutions: ${failedSubstitutions.join(', ')}`);
    return null;
  }

  const query = {};
  if (cql) query.query = cql;
  if (offset) query.offset = offset;
  if (limit) query.limit = limit;
  if (linkFromField) query.query = `${linkToField}=="${obj[linkFromField]}"`;
  const search = queryString.stringify(query);

  const url = `${okapi.url}/${processedPath}${search ? `?${search}` : ''}`;
  logger.log('url', `${caption} from URL '${url}'`);

  return fetch(url, { headers: okapi.headers })
    .then(res => res.text().then(text => {
      if (res.status >= 400) throw new GraphQLError(text);
      const json = JSON.parse(text);
      if (!skeleton) {
        return json;
      } else if (typeof skeleton === 'string') {
        return json[skeleton];
      } else {
        // Skeleton is an object whose keys tell us what to return
        const val = {};
        Object.keys(skeleton).forEach(key => {
          val[key] = json[skeleton[key]];
        });
        return val;
      }
    }));
}


const resolvers = {
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
    instances: (o, a, c) => resolve(o, a, c, 'instances', 'instance-storage/instances', null, null, {
      records: 'instances',
      totalCount: 'totalRecords',
    }),
    instance: (o, a, c) => resolve(o, a, c, 'instance', 'instance-storage/instances/{id}'),
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
    identifierType: (obj, args, { okapi }) => fetch(`${okapi.url}/identifier-types/${obj.identifierTypeId}`,
      { headers: okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
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
