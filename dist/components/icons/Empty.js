"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Identicon(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      size = _ref.size,
      style = _ref.style;
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: className,
    height: size,
    style: style,
    viewBox: "0 0 64 64",
    width: size
  });
}

var Empty = /*#__PURE__*/_react.default.memo(Identicon);

exports.Empty = Empty;