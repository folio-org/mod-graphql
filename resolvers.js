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
  },
}
