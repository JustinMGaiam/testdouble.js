const _ = require('../util/lodash-wrap')
const stringifyObject = require('stringify-object-es5')
const isMatcher = require('../matchers/is-matcher')

module.exports = (anything) => {
  if (_.isString(anything)) {
    return stringifyString(anything)
  } else if (isMatcher(anything)) {
    return anything.__name
  } else {
    return stringifyObject(anything, {
      indent: '  ',
      singleQuotes: false,
      inlineCharacterLimit: 65,
      transform (obj, prop, originalResult) {
        if (isMatcher(obj[prop])) {
          return obj[prop].__name
        } else {
          return originalResult
        }
      }
    })
  }
}

var stringifyString = (string) =>
  _.includes(string, '\n')
    ? `"""\n${string}\n"""`
    : `"${string.replace(new RegExp('"', 'g'), '\\"')}"`