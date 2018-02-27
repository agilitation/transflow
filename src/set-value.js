/**
 * Set value in target for the given path
 * Just like 'set-value' package but with array support
 *
 * @param {Object} target an object
 * @param {String} path any.prop.even[0].arrays[2].test
 * @param {*} value anything
 */
module.exports = function setValue(target, path, value) {
  const parts = path.split('.');
  let parent = target;
  while(parts.length > 1) {
    // is it an "array" path
    const bracketIndex = parts[0].indexOf('[');
    if(bracketIndex !== -1) {
      // yes it is
      // get the array name
      const propName = parts[0].substring(0, bracketIndex);
      // get the row index
      const index = parseInt(parts[0].substring(bracketIndex + 1, parts[0].length - 1));
      // if the array does not exist in the parent, create it
      if(!Array.isArray(parent[propName])) {
        parent[propName] = [];
      }

      if(typeof parent[propName][index] === 'undefined') {
        parent[propName][index] = {};
      }

      parent = parent[propName][index];
    } else {
      if(typeof parent[parts[0]] === 'undefined') {
        parent[parts[0]] = {};
      }
      parent = parent[parts[0]];
    }
    parts.shift()
  }

  const bracketIndex = parts[0].indexOf('[');

  if(bracketIndex !== -1) {
    const propName = parts[0].substring(0, bracketIndex);
    const index = parts[0].substring(bracketIndex + 1, parts[0].length - 1);
    parent[propName][index] = value;
  } else {
    parent[parts[0]] = value;
  }
};
