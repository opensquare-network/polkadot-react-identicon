"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.define-property.js");

var _react = _interopRequireDefault(require("react"));

var _icons = require("./icons");

var _crypto = require("./crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_SIZE = 64;
var Components = {
  polkadot: _icons.Polkadot
};

function MyIcon(props) {
  var prefix;
  var value = props.value;
  var address = (0, _crypto.isU8a)(value) || (0, _crypto.isHex)(value) ? (0, _crypto.encodeAddress)(value, prefix) : value || '';
  var publicKey = (0, _crypto.u8aToU8a)((0, _crypto.decodeAddress)(address, false, prefix));
  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      isAlternative = props.isAlternative,
      isHighlight = props.isHighlight,
      _props$size = props.size,
      size = _props$size === void 0 ? DEFAULT_SIZE : _props$size,
      style = props.style,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? 'default' : _props$theme;
  var Component = !address ? _icons.Empty : Components['polkadot']; // return <h1>jjj</h1>

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ui--IdentityIcon  ".concat(className),
    key: address,
    style: _objectSpread(_objectSpread({}, style), {}, {
      display: "inline-block",
      lineHeight: 0
    })
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