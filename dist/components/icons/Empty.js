"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Identicon(_ref) {
  let {
    className = '',
    size,
    style
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: className,
    height: size,
    style: style,
    viewBox: "0 0 64 64",
    width: size
  });
}

const Empty = /*#__PURE__*/_react.default.memo(Identicon);

exports.Empty = Empty;