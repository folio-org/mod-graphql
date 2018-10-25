const { isEqual } = require('lodash');

// Each APIs comments are represented by an ordered list. Each
// list-member is itself a list of two elements: the first is the
// comment-name (version, protocols, baseUrl, etc.) and the second is
// an ordered list of values.
//
// The merged list retains the original order as far as possible: the
// comments that exist in the first entry, in their original order;
// followed by those comments that exist in the second but not the
// first, in order; and so on.
//
function mergeComments(list) {
  const register = {};
  const res = [];

  list.forEach(comments => {
    comments.forEach(comment => {
      const [name, values] = comment;
      if (!register[name]) {
        register[name] = [name, values];
        res.push(register[name]);
      } else {
        register[name][1].push(...values);
      }
    });
  });

  return res;
}


// For this one, it's just a matter of concatenating the array and
// complaining if there's a duplicate queryName.
//
function mergeResources(list) {
  const register = {};
  const res = [];

  list.forEach(api => {
    const { ramlName, resources } = api;
    resources.forEach(resource => {
      const name = resource.queryName;
      if (!register[name]) {
        register[name] = ramlName;
        res.push(resource);
      } else {
        throw Error(`duplicate resource name '${name}' in ${register[name]} and ${ramlName}`);
      }
    });
  });

  return res;
}


// Similar to mergeResources, but each API's types are a map rather
// than a list, and duplicate definitions are OK provided they're
// identical.
//
function mergeTypes(list, options) {
  const register = {};
  const res = {};

  list.forEach(api => {
    const { ramlName, types } = api;
    Object.keys(types).forEach(name => {
      const type = types[name];
      if (!register[name]) {
        register[name] = ramlName;
        res[name] = type;
      } else {
        const same = isEqual(type, res[name]);
        if (same) {
          options.logger.log('duptype', `duplicate type name '${name}' with same definition`);
        } else {
          throw Error(`duplicate type name '${name}' with different definitions in ${register[name]} and ${ramlName}`);
        }
      }
    });
  });

  return res;
}


function mergeAPIs(list, options) {
  return {
    comments: mergeComments(list.map(api => api.comments)),
    resources: mergeResources(list),
    types: mergeTypes(list, options),
  };
}


exports.mergeAPIs = mergeAPIs;
exports._TESTING_mergeComments = mergeComments;
exports._TESTING_mergeResources = mergeResources;
exports._TESTING_mergeTypes = mergeTypes;
