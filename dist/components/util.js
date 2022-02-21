"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.isBuffer = isBuffer;
exports.isFunction = isFunction;
exports.u8aConcat = u8aConcat;
exports.u8aToU8a = u8aToU8a;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.copy-within.js");

require("core-js/modules/es.typed-array.every.js");

require("core-js/modules/es.typed-array.fill.js");

require("core-js/modules/es.typed-array.filter.js");

require("core-js/modules/es.typed-array.find.js");

require("core-js/modules/es.typed-array.find-index.js");

require("core-js/modules/es.typed-array.for-each.js");

require("core-js/modules/es.typed-array.includes.js");

require("core-js/modules/es.typed-array.index-of.js");

require("core-js/modules/es.typed-array.iterator.js");

require("core-js/modules/es.typed-array.join.js");

require("core-js/modules/es.typed-array.last-index-of.js");

require("core-js/modules/es.typed-array.map.js");

require("core-js/modules/es.typed-array.reduce.js");

require("core-js/modules/es.typed-array.reduce-right.js");

require("core-js/modules/es.typed-array.reverse.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.slice.js");

require("core-js/modules/es.typed-array.some.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.subarray.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/es.typed-array.to-string.js");

var _crypto = require("./crypto");

function isFunction(value) {
  return typeof value === 'function';
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(isFunction(message) ? message() : message);
  }
}

function isBuffer(value) {
  var hasBuffer = typeof Buffer !== 'undefined';
  return hasBuffer && Buffer.isBuffer(value);
}

function u8aToU8a(value) {
  return !value ? new Uint8Array() : Array.isArray(value) || isBuffer(value) ? new Uint8Array(value) : (0, _crypto.isU8a)(value) ? value : (0, _crypto.isHex)(value) ? (0, _crypto.hexToU8a)(value) : (0, _crypto.stringToU8a)(value);
}

function u8aConcat() {
  var length = 0;
  var offset = 0;
  var u8as = new Array(arguments.length);

  for (var i = 0; i < arguments.length; i++) {
    u8as[i] = u8aToU8a(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    length += u8as[i].length;
  }

  var result = new Uint8Array(length);

  for (var _i = 0; _i < u8as.length; _i++) {
    result.set(u8as[_i], offset);
    offset += u8as[_i].length;
  }

  return result;
}