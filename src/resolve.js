import fetch from 'node-fetch';
import queryString from 'query-string';
import { GraphQLError } from 'graphql';
import { get } from 'lodash';


function resolve(obj, originalArgs, context, caption, path, linkFromField, linkToField, skeleton) {
  const { okapi, logger } = context;

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
  }
  const search = queryString.stringify(args);

  const url = `${okapi.url}/${processedPath}${search ? `?${search}` : ''}`;
  logger.log('url', `${caption} from URL '${url}'`);

  return fetch(url, { headers: okapi.headers })
    .then(res => res.text().then(text => {
      logger.log('result', url, '->', text);
      if (res.status >= 400) throw new GraphQLError(text);
      const json = JSON.parse(text);
      let val;
      if (!skeleton) {
        val = json;
      } else if (typeof skeleton === 'string') {
        val = get(json, skeleton.split('.'));
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
