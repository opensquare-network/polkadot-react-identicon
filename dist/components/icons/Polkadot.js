"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polkadot = void 0;

require("core-js/modules/es.array-buffer.slice.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _utilCrypto = require("@polkadot/util-crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const blake2 = value => (0, _utilCrypto.blake2AsU8a)(value, 512);

const S = 64;
const C = S / 2;
const Z = S / 64 * 5;
const ZERO = blake2(new Uint8Array(32));
const OUTER_CIRCLE = {
  cx: C,
  cy: C,
  fill: '#eee',
  r: C
};
const SCHEMA = {
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
  const {
    r,
    r3o4,
    ro2,
    ro4,
    rroot3o2,
    rroot3o4
  } = getRotation(isSixPoint);
  return [[C, C - r], [C, C - ro2], [C - rroot3o4, C - r3o4], [C - rroot3o2, C - ro2], [C - rroot3o4, C - ro4], [C - rroot3o2, C], [C - rroot3o2, C + ro2], [C - rroot3o4, C + ro4], [C - rroot3o4, C + r3o4], [C, C + r], [C, C + ro2], [C + rroot3o4, C + r3o4], [C + rroot3o2, C + ro2], [C + rroot3o4, C + ro4], [C + rroot3o2, C], [C + rroot3o2, C - ro2], [C + rroot3o4, C - ro4], [C + rroot3o4, C - r3o4], [C, C]];
}

function getRotation(isSixPoint) {
  const r = isSixPoint ? C / 8 * 5 : C / 4 * 3;
  const rroot3o2 = r * Math.sqrt(3) / 2;
  const ro2 = r / 2;
  const rroot3o4 = r * Math.sqrt(3) / 4;
  const ro4 = r / 4;
  const r3o4 = r * 3 / 4;
  return {
    r,
    r3o4,
    ro2,
    ro4,
    rroot3o2,
    rroot3o4
  };
}

function addressToId(address) {
  return blake2((0, _utilCrypto.decodeAddress)(address)).map((x, i) => (x + 256 - ZERO[i]) % 256);
}

function findScheme(d) {
  let cum = 0;
  const schema = Object.values(SCHEMA).find(schema => {
    cum += schema.freq;
    return d < cum;
  });

  if (!schema) {
    throw new Error('Unable to find schema');
  }

  return schema;
}

function getColors(address) {
  const total = Object.values(SCHEMA).map(s => s.freq).reduce((a, b) => a + b);
  const id = addressToId(address);
  const d = Math.floor((id[30] + id[31] * 256) % total);
  const rot = id[28] % 6 * 3;
  const sat = Math.floor(id[29] * 70 / 256 + 26) % 80 + 30;
  const scheme = findScheme(d);
  const palette = Array.from(id).map((x, i) => {
    const b = (x + i % 28 * 58) % 256;

    if (b === 0) {
      return '#444';
    } else if (b === 255) {
      return 'transparent';
    }

    const h = Math.floor(b % 64 * 360 / 64);
    const l = [53, 15, 35, 75][Math.floor(b / 64)];
    return "hsl(".concat(h, ", ").concat(sat, "%, ").concat(l, "%)");
  });
  return scheme.colors.map((_, i) => palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]]);
}

function polkadotIcon(address, _ref) {
  let {
    isAlternative
  } = _ref;
  const colors = getColors(address);
  return [OUTER_CIRCLE].concat(getCircleXY(isAlternative).map((_ref2, index) => {
    let [cx, cy] = _ref2;
    return {
      cx,
      cy,
      fill: colors[index],
      r: Z
    };
  }));
}

function renderCircle(_ref3, key) {
  let {
    cx,
    cy,
    fill,
    r
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement("circle", {
    cx: cx,
    cy: cy,
    fill: fill,
    key: key,
    r: r
  });
}

function Identicon(_ref4) {
  let {
    address,
    className = '',
    isAlternative = false,
    size,
    style
  } = _ref4;
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: className,
    height: size,
    id: address,
    name: address,
    style: style,
    viewBox: "0 0 64 64",
    width: size
  }, polkadotIcon(address, {
    isAlternative
  }).map(renderCircle));
}

const Polkadot = Identicon;
exports.Polkadot = Polkadot;