import fetch from 'node-fetch';
import queryString from 'query-string';
import { GraphQLError } from 'graphql';
import _ from 'lodash';


function checkOkapiHeaders(okapi) {
  if (!okapi.url) {
    throw new GraphQLError('Missing Header: X-Okapi-Url');
  } else if (!okapi.headers['X-Okapi-Tenant']) {
    throw new GraphQLError('Missing Header: X-Okapi-Tenant');
  } else if (!okapi.headers['X-Okapi-Token']) {
    throw new GraphQLError('Missing Header: X-Okapi-Token');
  }
}


function resolve(obj, originalArgs, context, caption, path, linkFromField, linkToField, skeleton, extraArgs) {
  const { okapi, logger } = context;

  checkOkapiHeaders(okapi);

  const args = Object.assign({}, originalArgs);
  const failedSubstitutions = [];
  const processedPath = path
    .replace(/{(.*?)}/g, (text, match) => {
      const val = args[match];
      delete args[match];
      if (val === undefined) failedSubstitutions.push(text);
      return val;
    })
    .replace(/\[(.*?)\]/g, (text, match) => {
      if (obj[match] === undefined || obj[match] === '') failedSubstitutions.push(text);
      return obj[match];
    });
  if (failedSubstitutions.length !== 0) {
    logger.log('failsub', `failed substitutions: ${failedSubstitutions.join(', ')}`);
    return null;
  }

  // Positional parameters have now been removed from `args`
  if (linkFromField) {
    const val = obj[linkFromField];
    if (!val || val.length === 0) return null;
    if (Array.isArray(val)) {
      args.query = `${linkToField}==(${val.map(v => `"${v}"`).join(' or ')})`;
    } else {
      args.query = `${linkToField}=="${val}"`;
    }

    if (extraArgs) {
      args.query = `(${args.query}) and (${extraArgs})`;
    }
  }

  // This is a special-case hack. We would prefer to introduce a
  // general-purpose mechanism for configuring the injection of
  // additional parameters into fetch requests. But since mod-graphql
  // is borderline unmaintained anyway, and in the process of being
  // EOLed, that would be a waste of effort.
  //
  // See MODGQL-196 and associated issues for background.
  if (processedPath === 'search/instances') {
    args.expandAll = true;
  }

  const search = queryString.stringify(args);

  const url = `${okapi.url}/${processedPath}${search ? `?${search}` : ''}`;
  logger.log('url', `${caption} from URL '${url}'`);

  return fetch(url, { headers: okapi.headers })
    .then(res => res.text().then(text => {
      logger.log('result', url, '->', text);
      if (res.status >= 400) throw new GraphQLError(`${res.status} ${res.statusText}: ${text}`);
      const json = JSON.parse(text);
      logger.log('resultcount', url, '->', json.totalRecords);
      let val;
      if (!skeleton) {
        val = json;
      } else if (typeof skeleton === 'string') {
        val = _.get(json, skeleton.split('.'));
      } else {
        // Skeleton is an object whose keys tell us what to return
        val = {};
        Object.keys(skeleton).forEach(key => {
          val[key] = json[skeleton[key]];
        });
      }
      logger.log('skeleton', skeleton, '->', JSON.stringify(val));
      return val;
    }));
}


export default resolve;
