import React from 'react';
import { Empty, Polkadot } from './icons';
import { decodeAddress, encodeAddress, isHex, isU8a, u8aToHex } from "./crypto";

const DEFAULT_SIZE = 64;
const Components = {
  polkadot: Polkadot,
};

function MyIcon(props) {
  let prefix;
  const {value} = props;
  const address = isU8a(value) || isHex(value) ? encodeAddress(value, prefix) : (value || '');
  let publicKey;
  try {
    publicKey = u8aToHex(decodeAddress(address, false, prefix));
  } catch (e) {
    return null;
  }
  const {className = '', isAlternative, isHighlight, size = DEFAULT_SIZE, style, theme = 'default'} = props;
  const Component = !address ? Empty : Components['polkadot'];
  if (!address) {
    return null;
  }
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
