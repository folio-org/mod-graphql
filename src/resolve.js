import fetch from 'node-fetch';
import Logger from '@folio/stripes-logger';
import queryString from 'query-string';
import { GraphQLError } from 'graphql';


function resolve(obj, args, context, caption, path, linkFromField, linkToField, skeleton) {
  const { query: cql, offset, limit } = args;
  const { okapi, loggingCategories } = context;
  const logger = new Logger(loggingCategories);

  const failedSubstitutions = [];
  const processedPath = path
    .replace(/{(.*?)}/g, (text, match) => {
      if (args[match] === undefined) failedSubstitutions.push(text);
      return args[match];
    })
    .replace(/\[(.*?)\]/g, (text, match) => {
      if (obj[match] === undefined || obj[match] === '') failedSubstitutions.push(text);
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
      logger.log('result', url, '->', text);
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


export default resolve;
