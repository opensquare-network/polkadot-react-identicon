"use strict";

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base58Validate = exports.base58Encode = exports.base58Decode = exports.TextEncoder = void 0;
exports.blake2AsU8a = blake2AsU8a;
exports.checkAddressChecksum = checkAddressChecksum;
exports.createDecode = createDecode;
exports.createEncode = createEncode;
exports.createValidate = createValidate;
exports.decodeAddress = decodeAddress;
exports.encodeAddress = encodeAddress;
exports.extractGlobal = extractGlobal;
exports.hex = hex;
exports.hexStripPrefix = hexStripPrefix;
exports.hexToU8a = hexToU8a;
exports.isHex = isHex;
exports.isU8a = isU8a;
exports.sshash = sshash;
exports.stringToU8a = stringToU8a;
exports.u8aToHex = u8aToHex;
exports.u8aToU8a = u8aToU8a;
exports.xglobal = void 0;

require("core-js/modules/es.typed-array.from.js");

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

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _util = require("./util");

var _constans = require("../constans");

var _blake2b = require("@noble/hashes/blake2b");

var _util2 = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function evaluateThis(fn) {
  return fn('return this');
}

var globalThis;
var xglobal = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window.self !== 'undefined' ? window.self : typeof window !== 'undefined' ? window : evaluateThis(Function);
exports.xglobal = xglobal;

function extractGlobal(name, fallback) {
  return typeof xglobal[name] === 'undefined' ? fallback : xglobal[name];
}

var _encoder = /*#__PURE__*/new WeakMap();

var Fallback = /*#__PURE__*/function () {
  function Fallback() {
    _classCallCheck(this, Fallback);

    _classPrivateFieldInitSpec(this, _encoder, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _encoder, new _util2.default.TextEncoder());
  } // For a Jest 26.0.1 environment, Buffer !== Uint8Array


  _createClass(Fallback, [{
    key: "encode",
    value: function encode(value) {
      return Uint8Array.from(_classPrivateFieldGet(this, _encoder).encode(value));
    }
  }]);

  return Fallback;
}();

var TextEncoder = extractGlobal('TextEncoder', Fallback);
exports.TextEncoder = TextEncoder;
var encoder = new TextEncoder();

function blake2AsU8a(data) {
  var bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
  var key = arguments.length > 2 ? arguments[2] : undefined;
  var onlyJs = arguments.length > 3 ? arguments[3] : undefined;
  var byteLength = Math.ceil(bitLength / 8);
  var u8a = u8aToU8a(data);
  return (0, _blake2b.blake2b)(u8a, {
    dkLen: byteLength,
    key: key || undefined
  });
}

function hexStripPrefix(value) {
  var REGEX_HEX_PREFIXED = /^0x[\da-fA-F]+$/;
  var REGEX_HEX_NOPREFIX = /^[\da-fA-F]+$/;

  if (!value || value === '0x') {
    return '';
  } else if (REGEX_HEX_PREFIXED.test(value)) {
    return value.substr(2);
  } else if (REGEX_HEX_NOPREFIX.test(value)) {
    return value;
  }

  throw new Error("Expected hex value to convert, found '".concat(value, "'"));
}

function stringToU8a(value) {
  return value ? encoder.encode(value.toString()) : new Uint8Array();
}

function sshash(key) {
  var SS58_PREFIX = stringToU8a('SS58PRE');
  return blake2AsU8a((0, _util.u8aConcat)(SS58_PREFIX, key), 512);
}

function hexToU8a(_value) {
  var bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  if (!_value) {
    return new Uint8Array();
  }

  var value = hexStripPrefix(_value).toLowerCase();
  var valLength = value.length / 2;
  var endLength = Math.ceil(bitLength === -1 ? valLength : bitLength / 8);
  var result = new Uint8Array(endLength);
  var offset = endLength > valLength ? endLength - valLength : 0;
  var dv = new DataView(result.buffer, offset);
  var mod = (endLength - offset) % 2;
  var length = endLength - offset - mod;

  for (var i = 0; i < length; i += 2) {
    dv.setUint16(i, _constans.HEX_TO_U16[value.substr(i * 2, 4)]);
  }

  if (mod) {
    dv.setUint8(length, _constans.HEX_TO_U8[value.substr(value.length - 2, 2)]);
  }

  return result;
}

function checkAddressChecksum(decoded) {
  var ss58Length = decoded[0] & 64 ? 2 : 1;
  var ss58Decoded = ss58Length === 1 ? decoded[0] : (decoded[0] & 63) << 2 | decoded[1] >> 6 | (decoded[1] & 63) << 8; // 32/33 bytes public + 2 bytes checksum + prefix

  var isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
  var length = decoded.length - (isPublicKey ? 2 : 1); // calculate the hash and do the checksum byte checks

  var hash = sshash(decoded.subarray(0, length));
  var isValid = (decoded[0] & 128) === 0 && ![46, 47].includes(decoded[0]) && (isPublicKey ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1] : decoded[decoded.length - 1] === hash[0]);
  return [isValid, length, ss58Length, ss58Decoded];
}

function createValidate(_ref) {
  var chars = _ref.chars,
      ipfs = _ref.ipfs,
      type = _ref.type;
  return function (value, ipfsCompat) {
    (0, _util.assert)(value && typeof value === 'string', function () {
      return "Expected non-null, non-empty ".concat(type, " string input");
    });

    if (ipfs && ipfsCompat) {
      (0, _util.assert)(value[0] === ipfs, function () {
        return "Expected ipfs-compatible ".concat(type, " to start with '").concat(ipfs, "'");
      });
    }

    var _loop = function _loop(i) {
      (0, _util.assert)(chars.includes(value[i]) || value[i] === '=' && (i === value.length - 1 || !chars.includes(value[i + 1])), function () {
        return "Invalid ".concat(type, " character \"").concat(value[i], "\" (0x").concat(value.charCodeAt(i).toString(16), ") at index ").concat(i);
      });
    };

    for (var i = ipfsCompat ? 1 : 0; i < value.length; i++) {
      _loop(i);
    }

    return true;
  };
}

function createDecode(_ref2, validate) {
  var coder = _ref2.coder,
      ipfs = _ref2.ipfs;
  return function (value, ipfsCompat) {
    validate(value, ipfsCompat);
    return coder.decode(ipfs && ipfsCompat ? value.substr(1) : value);
  };
}

function createEncode(_ref3) {
  var coder = _ref3.coder,
      ipfs = _ref3.ipfs;
  return function (value, ipfsCompat) {
    var out = coder.encode(u8aToU8a(value));
    return ipfs && ipfsCompat ? "".concat(ipfs).concat(out) : out;
  };
}

var base58Encode = createEncode(_constans.config);
exports.base58Encode = base58Encode;
var base58Validate = createValidate(_constans.config);
exports.base58Validate = base58Validate;
var base58Decode = createDecode(_constans.config, base58Validate);
exports.base58Decode = base58Decode;

function isU8a(value) {
  return (value === null || value === void 0 ? void 0 : value.constructor) === Uint8Array;
}

function isHex(s) {
  return (s === null || s === void 0 ? void 0 : s.slice(0, 2)) === '0x';
}

function u8aToU8a(value) {
  return !value ? new Uint8Array() : Array.isArray(value) || (0, _util.isBuffer)(value) ? new Uint8Array(value) : isU8a(value) ? value : isHex(value) ? hexToU8a(value) : stringToU8a(value);
}

function u8aToHex(value) {
  var bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var isPrefixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var length = Math.ceil(bitLength / 8);
  return "".concat(isPrefixed ? '0x' : '').concat(!value || !value.length ? '' : length > 0 && value.length > length ? "".concat(hex(value.subarray(0, length / 2)), "\u2026").concat(hex(value.subarray(value.length - length / 2))) : hex(value));
}

function hex(value) {
  var mod = value.length % 2;
  var length = value.length - mod;
  var dv = new DataView(value.buffer, value.byteOffset);
  var result = '';

  for (var i = 0; i < length; i += 2) {
    result += _constans.U16_TO_HEX[dv.getUint16(i)];
  }

  if (mod) {
    result += _constans.U8_TO_HEX[dv.getUint8(length)];
  }

  return result;
}

function decodeAddress(encoded, ignoreChecksum) {
  var ss58Format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  (0, _util.assert)(encoded, 'Invalid empty address passed');

  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  try {
    var decoded = base58Decode(encoded);
    (0, _util.assert)(_constans.defaults.allowedEncodedLengths.includes(decoded.length), 'Invalid decoded address length');

    var _checkAddressChecksum = checkAddressChecksum(decoded),
        _checkAddressChecksum2 = _slicedToArray(_checkAddressChecksum, 4),
        isValid = _checkAddressChecksum2[0],
        endPos = _checkAddressChecksum2[1],
        ss58Length = _checkAddressChecksum2[2],
        ss58Decoded = _checkAddressChecksum2[3];

    (0, _util.assert)(ignoreChecksum || isValid, 'Invalid decoded address checksum');
    (0, _util.assert)([-1, ss58Decoded].includes(ss58Format), function () {
      return "Expected ss58Format ".concat(ss58Format, ", received ").concat(ss58Decoded);
    });
    return decoded.slice(ss58Length, endPos);
  } catch (error) {
    throw new Error("Decoding ".concat(encoded, ": ").concat(error.message));
  }
}

function encodeAddress(key) {
  var ss58Format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constans.defaults.prefix;
  // decode it, this means we can re-encode an address
  var u8a = decodeAddress(key);
  (0, _util.assert)(ss58Format >= 0 && ss58Format <= 16383 && ![46, 47].includes(ss58Format), 'Out of range ss58Format specified');
  (0, _util.assert)(_constans.defaults.allowedDecodedLengths.includes(u8a.length), function () {
    return "Expected a valid key to convert, with length ".concat(_constans.defaults.allowedDecodedLengths.join(', '));
  });
  var input = (0, _util.u8aConcat)(ss58Format < 64 ? [ss58Format] : [(ss58Format & 252) >> 2 | 64, ss58Format >> 8 | (ss58Format & 3) << 6], u8a);
  return base58Encode((0, _util.u8aConcat)(input, sshash(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}