"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polkadot = void 0;

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

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.fill.js");

var _react = _interopRequireDefault(require("react"));

var _crypto = require("../crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var blake2 = function blake2(value) {
  return (0, _crypto.blake2AsU8a)(value, 512);
};

var S = 64;
var C = S / 2;
var Z = S / 64 * 5;
var ZERO = blake2(new Uint8Array(32));
var OUTER_CIRCLE = {
  cx: C,
  cy: C,
  fill: '#eee',
  r: C
};
var SCHEMA = {
  target: {
    colors: [0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 1],
    freq: 1
  },
  cube: {
    colors: [0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 5],
    freq: 20
  },
  quazar: {
    colors: [1, 2, 3, 1, 2, 4, 5, 5, 4, 1, 2, 3, 1, 2, 4, 5, 5, 4, 0],
    freq: 16
  },
  flower: {
    colors: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3],
    freq: 32
  },
  cyclic: {
    colors: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6],
    freq: 32
  },
  vmirror: {
    colors: [0, 1, 2, 3, 4, 5, 3, 4, 2, 0, 1, 6, 7, 8, 9, 7, 8, 6, 10],
    freq: 128
  },
  hmirror: {
    colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 7, 5, 3, 4, 2, 11],
    freq: 128
  }
};

function getCircleXY(isSixPoint) {
  var _getRotation = getRotation(isSixPoint),
      r = _getRotation.r,
      r3o4 = _getRotation.r3o4,
      ro2 = _getRotation.ro2,
      ro4 = _getRotation.ro4,
      rroot3o2 = _getRotation.rroot3o2,
      rroot3o4 = _getRotation.rroot3o4;

  return [[C, C - r], [C, C - ro2], [C - rroot3o4, C - r3o4], [C - rroot3o2, C - ro2], [C - rroot3o4, C - ro4], [C - rroot3o2, C], [C - rroot3o2, C + ro2], [C - rroot3o4, C + ro4], [C - rroot3o4, C + r3o4], [C, C + r], [C, C + ro2], [C + rroot3o4, C + r3o4], [C + rroot3o2, C + ro2], [C + rroot3o4, C + ro4], [C + rroot3o2, C], [C + rroot3o2, C - ro2], [C + rroot3o4, C - ro4], [C + rroot3o4, C - r3o4], [C, C]];
}

function getRotation(isSixPoint) {
  var r = isSixPoint ? C / 8 * 5 : C / 4 * 3;
  var rroot3o2 = r * Math.sqrt(3) / 2;
  var ro2 = r / 2;
  var rroot3o4 = r * Math.sqrt(3) / 4;
  var ro4 = r / 4;
  var r3o4 = r * 3 / 4;
  return {
    r: r,
    r3o4: r3o4,
    ro2: ro2,
    ro4: ro4,
    rroot3o2: rroot3o2,
    rroot3o4: rroot3o4
  };
}

function addressToId(address) {
  return blake2((0, _crypto.decodeAddress)(address)).map(function (x, i) {
    return (x + 256 - ZERO[i]) % 256;
  });
}

function findScheme(d) {
  var cum = 0;
  var schema = Object.values(SCHEMA).find(function (schema) {
    cum += schema.freq;
    return d < cum;
  });

  if (!schema) {
    throw new Error('Unable to find schema');
  }

  return schema;
}

function getColors(address) {
  var total = Object.values(SCHEMA).map(function (s) {
    return s.freq;
  }).reduce(function (a, b) {
    return a + b;
  });
  var id = addressToId(address);
  var d = Math.floor((id[30] + id[31] * 256) % total);
  var rot = id[28] % 6 * 3;
  var sat = Math.floor(id[29] * 70 / 256 + 26) % 80 + 30;
  var scheme = findScheme(d);
  var palette = Array.from(id).map(function (x, i) {
    var b = (x + i % 28 * 58) % 256;

    if (b === 0) {
      return '#444';
    } else if (b === 255) {
      return 'transparent';
    }

    var h = Math.floor(b % 64 * 360 / 64);
    var l = [53, 15, 35, 75][Math.floor(b / 64)];
    return "hsl(".concat(h, ", ").concat(sat, "%, ").concat(l, "%)");
  });
  return scheme.colors.map(function (_, i) {
    return palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]];
  });
}

function polkadotIcon(address, _ref) {
  var isAlternative = _ref.isAlternative;
  var colors = getColors(address);
  return [OUTER_CIRCLE].concat(getCircleXY(isAlternative).map(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
        cx = _ref3[0],
        cy = _ref3[1];

    return {
      cx: cx,
      cy: cy,
      fill: colors[index],
      r: Z
    };
  }));
}

function renderCircle(_ref4, key) {
  var cx = _ref4.cx,
      cy = _ref4.cy,
      fill = _ref4.fill,
      r = _ref4.r;
  return /*#__PURE__*/_react.default.createElement("circle", {
    cx: cx,
    cy: cy,
    fill: fill,
    key: key,
    r: r
  });
}

function Identicon(_ref5) {
  var address = _ref5.address,
      _ref5$className = _ref5.className,
      className = _ref5$className === void 0 ? '' : _ref5$className,
      _ref5$isAlternative = _ref5.isAlternative,
      isAlternative = _ref5$isAlternative === void 0 ? false : _ref5$isAlternative,
      size = _ref5.size,
      style = _ref5.style;
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: className,
    height: size,
    id: address,
    name: address,
    style: style,
    viewBox: "0 0 64 64",
    width: size
  }, polkadotIcon(address, {
    isAlternative: isAlternative
  }).map(renderCircle));
}

var Polkadot = Identicon;
exports.Polkadot = Polkadot;