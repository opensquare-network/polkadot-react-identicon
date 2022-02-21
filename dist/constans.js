"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = exports.config = exports.U8_TO_HEX = exports.U16_TO_HEX = exports.HEX_TO_U8 = exports.HEX_TO_U16 = void 0;

require("core-js/modules/es.string.pad-start.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _microBase = require("micro-base");

var config = {
  chars: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  coder: _microBase.base58,
  ipfs: 'z',
  type: 'base58'
};
exports.config = config;
var defaults = {
  "allowedDecodedLengths": [1, 2, 4, 8, 32, 33],
  "allowedEncodedLengths": [3, 4, 6, 10, 35, 36, 37, 38],
  "allowedPrefix": [0, 2, 42, 10, 1337, 136, 34, 5, 11820, 65, 10041, 6, 78, 36, 11331, 44, 128, 50, 29, 66, 18, 22, 7, 1110, 68, 19, 67, 110, 63, 13, 2032, 2007, 8, 38, 2092, 16, 11, 9, 31, 131, 77, 39, 1284, 1285, 48, 37, 101, 172, 30, 49, 268, 88, 99, 98, 12, 105, 255, 32, 252, 420, 69, 20, 6094, 15, 14, 45, 35, 55, 73, 24],
  "prefix": 42
};
exports.defaults = defaults;
var U8_TO_HEX = new Array(256);
exports.U8_TO_HEX = U8_TO_HEX;
var U16_TO_HEX = new Array(256 * 256);
exports.U16_TO_HEX = U16_TO_HEX;
var HEX_TO_U8 = {};
exports.HEX_TO_U8 = HEX_TO_U8;
var HEX_TO_U16 = {};
exports.HEX_TO_U16 = HEX_TO_U16;

for (var n = 0; n < 256; n++) {
  var hex = n.toString(16).padStart(2, '0');
  U8_TO_HEX[n] = hex;
  HEX_TO_U8[hex] = n;
}

for (var i = 0; i < 256; i++) {
  for (var j = 0; j < 256; j++) {
    var _hex = U8_TO_HEX[i] + U8_TO_HEX[j];

    var _n = i << 8 | j;

    U16_TO_HEX[_n] = _hex;
    HEX_TO_U16[_hex] = _n;
  }
}