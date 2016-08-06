'use strict'

let camelCase = require('camelcase');

/**
 * Fix the invalid json provided by aws logs streaming. into
 * a proper json object.
 */
let fixJsonString = (brokenStr) => {
  let fixedJson = {}
  brokenStr = brokenStr.substr(1, brokenStr.length - 2)
  if (brokenStr.length <= 0) return fixedJson

  let brokenEl = brokenStr.split(',')

  for (let index in brokenEl) {
    let item = brokenEl[index]

    if (item.includes('=')) {
      let attr = item.split('=')
      fixedJson[camelCase(attr[0])] = attr.slice(1).join('=')
    } else {
      let prevItem = brokenEl[index - 1]
      let prevAttr = prevItem.split('=')

      fixedJson[camelCase(prevAttr[0])] = fixedJson[camelCase(prevAttr[0])] + item
    }
  }
  return fixedJson
}

/**
 * Check either the given string is in json format.
 */
let isJson = (str) => {
  return str.startsWith('{') && str.endsWith('}')
}

module.exports = function (logStream) {
  let log = logStream['logEvents']

    // TODO: add check if log stream is in invalid format then
    //      return from here, as we can not process it.

  let model = {}

  for (let prop in log) {
    let message = log[prop]['message'].split(':')

    if (message.length === 1) {
      model['status'] = message[0]
      continue
    }

    let key = camelCase(message[0])
    let value = message.slice(1).join(':').trim()
    if (isJson(value)) {
      try {
        model[key] = JSON.parse(value)
      } catch (err) {
        model[key] = fixJsonString(value)
      }
    } else {
      model[key] = value
    }
  }
  return model
}
