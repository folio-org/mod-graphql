import fetch  from 'node-fetch';
import queryString from 'query-string';
import _ from 'lodash';

export default {
  Query: {
    hello: () => 'hi!',
    users: (root, { cql }, context) => {
      let okapi = context.okapi;
      return fetch(`${okapi.url}/users` + (cql ? `?query=${cql}` : ''),
                   { headers: okapi.headers }).then((response) => {
	return response.json().then(json => {
	  return json.users;
	});
      });
    },
    groups: (root, args, context) => {
      let okapi = context.okapi;
      return fetch(`${okapi.url}/groups`, { headers: okapi.headers }).then((response) => {
        return response.json().then(json => {
          return json.usergroups;
        });
      });
    },
  },

  Metadata: {
    createdByUser: (obj, args, { okapi }) => fetch(`${okapi.url}/users/${obj.createdByUserId}`,
      { headers:okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
    updatedByUser: (obj, args, { okapi }) => fetch(`${okapi.url}/users/${obj.updatedByUserId}`,
      { headers:okapi.headers })
      .then(res => res.text().then(text => {
        if (res.status < 400) return JSON.parse(text);
        throw new Error(text);
      })),
  },


  Mutation: {
    updateUser: (root, updated) => {
      // We don't currently support PATCH so we'll need to grab the record to base our update on
      return fetch(`${okapiURL}/users/${updated.id}`, { headers })
        .then(res => res.json())
        .then((orig) => {
          const record = _.merge({}, orig, updated);
          return fetch(`${okapiURL}/users/${updated.id}`,
                        { headers, method: 'PUT', body: JSON.stringify(record)},)
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
      let headers = Object.assign({}, okapi.headers, { 'Accept': 'text/plain' })
      return fetch(`${okapi.url}/groups/${id}`, { headers: okapi.headers })
        .then(res => res.json())
        .then((orig) => {
          const fullRecord = _.merge({}, orig, record);
          delete(fullRecord.metadata);
          return fetch(`${okapi.url}/groups/${id}`,
                        { headers, method: 'PUT', body: JSON.stringify(fullRecord) },)
            .then(res => res.text().then(text => {
              if (res.status < 400) return fullRecord;
              throw new Error(text);
            }));
        });
    },
    deleteGroup: (root, { id }, { okapi }) => {
      let headers = Object.assign({}, okapi.headers, { 'Accept': 'text/plain' })
      return fetch(`${okapi.url}/groups/${id}`,
                    { headers, method: 'DELETE', })
        .then(res => res.text().then(text => {
          if (res.status < 400) return id;
          throw new Error(text);
        }));
    },
  },
}
