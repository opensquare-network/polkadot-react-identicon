"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array-buffer.slice.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

var _react = _interopRequireDefault(require("react"));

var _utilCrypto = require("@polkadot/util-crypto");

var _icons = require("./icons");

var _constans = require("../constans");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hex(value) {
  const mod = value.length % 2;
  const length = value.length - mod;
  const dv = new DataView(value.buffer, value.byteOffset);
  let result = '';

  for (let i = 0; i < length; i += 2) {
    result += _constans.U16_TO_HEX[dv.getUint16(i)];
  }

  if (mod) {
    result += _constans.U8_TO_HEX[dv.getUint8(length)];
  }

  return result;
}

function u8aToHex(value) {
  let bitLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  let isPrefixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const length = Math.ceil(bitLength / 8);
  return "".concat(isPrefixed ? '0x' : '').concat(!value || !value.length ? '' : length > 0 && value.length > length ? "".concat(hex(value.subarray(0, length / 2)), "\u2026").concat(hex(value.subarray(value.length - length / 2))) : hex(value));
}

function isU8a(value) {
  return (value === null || value === void 0 ? void 0 : value.constructor) === Uint8Array;
}

function isHex(s) {
  return (s === null || s === void 0 ? void 0 : s.slice(0, 2)) === '0x';
}

const DEFAULT_SIZE = 64;
const Components = {
  polkadot: _icons.Polkadot
};

function MyIcon(_ref) {
  let {
    value
  } = _ref;
  let prefix;
  const address = isU8a(value) || isHex(value) ? (0, _utilCrypto.encodeAddress)(value, prefix) : value || '';
  const publicKey = u8aToHex((0, _utilCrypto.decodeAddress)(address, false, prefix));
  const {
    className = '',
    isAlternative,
    isHighlight,
    size = DEFAULT_SIZE,
    style,
    theme = 'default'
  } = {};
  const Component = !address ? _icons.Empty : Components['polkadot'];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ui--IdentityIcon  ".concat(className),
    key: address,
    style: style
  }, /*#__PURE__*/_react.default.createElement(Component, {
    address: address,
    className: isHighlight ? 'highlight' : '',
    isAlternative: isAlternative,
    publicKey: publicKey,
    size: size
  }));
}

var _default = MyIcon;
exports.default = _default;