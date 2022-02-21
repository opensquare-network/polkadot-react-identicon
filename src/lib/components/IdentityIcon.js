import React from 'react';


import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { Empty, Polkadot } from './icons';
import { U16_TO_HEX, U8_TO_HEX } from "../constans";

function hex(value) {
  const mod = value.length % 2;
  const length = value.length - mod;
  const dv = new DataView(value.buffer, value.byteOffset);
  let result = '';

  for (let i = 0; i < length; i += 2) {
    result += U16_TO_HEX[dv.getUint16(i)];
  }

  if (mod) {
    result += U8_TO_HEX[dv.getUint8(length)];
  }

  return result;
}

function u8aToHex(value, bitLength = -1, isPrefixed = true) {
  const length = Math.ceil(bitLength / 8);
  return `${isPrefixed ? '0x' : ''}${!value || !value.length ? '' : length > 0 && value.length > length ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}` : hex(value)}`;
}

function isU8a(value) {
  return value?.constructor === Uint8Array;
}

function isHex(s) {
  return s?.slice(0, 2) === '0x';
}

const DEFAULT_SIZE = 64;
const Components = {
  polkadot: Polkadot,
};

function MyIcon(props) {
  let prefix;
  const {value} = props;
  const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : (value || '');
  const publicKey = u8aToHex(decodeAddress(address, false, prefix));
  const {className = '', isAlternative, isHighlight, size = DEFAULT_SIZE, style, theme = 'default'} = props;
  const Component = !address ? Empty : Components['polkadot'];

  return (
    <div
      className={`ui--IdentityIcon  ${className}`}
      key={address}
      style={{...style, display: "inline-block", lineHeight: 0}}
    >
      <Component
        address={address}
        className={isHighlight ? 'highlight' : ''}
        isAlternative={isAlternative}
        publicKey={publicKey}
        size={size}
      />
    </div>
  );
}

export default MyIcon;
