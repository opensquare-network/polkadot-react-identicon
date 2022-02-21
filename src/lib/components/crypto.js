import { assert, isBuffer } from "./util";
import { U16_TO_HEX, U8_TO_HEX, HEX_TO_U16, HEX_TO_U8 } from "../constans";
import { config, defaults } from "../constans";
import {  u8aConcat } from "./util";
import { blake2b as blake2bJs } from "@noble/hashes/blake2b";
import util from "util";

function evaluateThis(fn) {
  return fn('return this');
}

let globalThis;

export const xglobal = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window.self !== 'undefined' ? window.self : typeof window !== 'undefined' ? window : evaluateThis(Function);

export function extractGlobal(name, fallback) {
  return typeof xglobal[name] === 'undefined' ? fallback : xglobal[name];
}

class Fallback {
  #encoder;

  constructor() {
    this.#encoder = new util.TextEncoder();
  } // For a Jest 26.0.1 environment, Buffer !== Uint8Array


  encode(value) {
    return Uint8Array.from(this.#encoder.encode(value));
  }

}

export const TextEncoder = extractGlobal('TextEncoder', Fallback);

const encoder = new TextEncoder();

export function blake2AsU8a(data, bitLength = 256, key, onlyJs) {
  const byteLength = Math.ceil(bitLength / 8);
  const u8a = u8aToU8a(data);
  return blake2bJs(u8a, {
    dkLen: byteLength,
    key: key || undefined
  });
}

export function hexStripPrefix(value) {
  const REGEX_HEX_PREFIXED = /^0x[\da-fA-F]+$/;
  const REGEX_HEX_NOPREFIX = /^[\da-fA-F]+$/;
  if (!value || value === '0x') {
    return '';
  } else if (REGEX_HEX_PREFIXED.test(value)) {
    return value.substr(2);
  } else if (REGEX_HEX_NOPREFIX.test(value)) {
    return value;
  }

  throw new Error(`Expected hex value to convert, found '${value}'`);
}

export function stringToU8a(value) {
  return value ? encoder.encode(value.toString()) : new Uint8Array();
}

export function sshash(key) {
  const SS58_PREFIX = stringToU8a('SS58PRE');
  return blake2AsU8a(u8aConcat(SS58_PREFIX, key), 512);
}

export function hexToU8a(_value, bitLength = -1) {
  if (!_value) {
    return new Uint8Array();
  }
  const value = hexStripPrefix(_value).toLowerCase();
  const valLength = value.length / 2;
  const endLength = Math.ceil(bitLength === -1 ? valLength : bitLength / 8);
  const result = new Uint8Array(endLength);
  const offset = endLength > valLength ? endLength - valLength : 0;
  const dv = new DataView(result.buffer, offset);
  const mod = (endLength - offset) % 2;
  const length = endLength - offset - mod;
  for (let i = 0; i < length; i += 2) {
    dv.setUint16(i, HEX_TO_U16[value.substr(i * 2, 4)]);
  }
  if (mod) {
    dv.setUint8(length, HEX_TO_U8[value.substr(value.length - 2, 2)]);
  }
  return result;
}


export function checkAddressChecksum(decoded) {
  const ss58Length = decoded[0] & 0b01000000 ? 2 : 1;
  const ss58Decoded = ss58Length === 1 ? decoded[0] : (decoded[0] & 0b00111111) << 2 | decoded[1] >> 6 | (decoded[1] & 0b00111111) << 8; // 32/33 bytes public + 2 bytes checksum + prefix

  const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
  const length = decoded.length - (isPublicKey ? 2 : 1); // calculate the hash and do the checksum byte checks

  const hash = sshash(decoded.subarray(0, length));
  const isValid = (decoded[0] & 0b10000000) === 0 && ![46, 47].includes(decoded[0]) && (isPublicKey ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1] : decoded[decoded.length - 1] === hash[0]);
  return [isValid, length, ss58Length, ss58Decoded];
}

export function createValidate({chars, ipfs, type}) {
  return (value, ipfsCompat) => {
    assert(value && typeof value === 'string', () => `Expected non-null, non-empty ${type} string input`);
    if (ipfs && ipfsCompat) {
      assert(value[0] === ipfs, () => `Expected ipfs-compatible ${type} to start with '${ipfs}'`);
    }
    for (let i = ipfsCompat ? 1 : 0; i < value.length; i++) {
      assert(chars.includes(value[i]) || value[i] === '=' && (i === value.length - 1 || !chars.includes(value[i + 1])), () => `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
    return true;
  };
}

export function createDecode({coder, ipfs}, validate) {
  return (value, ipfsCompat) => {
    validate(value, ipfsCompat);
    return coder.decode(ipfs && ipfsCompat ? value.substr(1) : value);
  };
}
export function createEncode({coder, ipfs}) {
  return (value, ipfsCompat) => {
    const out = coder.encode(u8aToU8a(value));
    return ipfs && ipfsCompat ? `${ipfs}${out}` : out;
  };
}

export const base58Encode = createEncode(config);
export const base58Validate = createValidate(config);
export const base58Decode = createDecode(config, base58Validate);

export function isU8a(value) {
  return value?.constructor === Uint8Array;
}

export function isHex(s) {
  return s?.slice(0, 2) === '0x';
}

export function u8aToU8a(value) {
  return !value ? new Uint8Array() : Array.isArray(value) || isBuffer(value) ? new Uint8Array(value) : isU8a(value) ? value : isHex(value) ? hexToU8a(value) : stringToU8a(value);
}

export function u8aToHex(value, bitLength = -1, isPrefixed = true) {
  const length = Math.ceil(bitLength / 8);
  return `${isPrefixed ? '0x' : ''}${!value || !value.length ? '' : length > 0 && value.length > length ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}` : hex(value)}`;
}

export function hex(value) {
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

export function decodeAddress(encoded, ignoreChecksum, ss58Format = -1) {
  assert(encoded, 'Invalid empty address passed');

  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }

  try {
    const decoded = base58Decode(encoded);
    assert(defaults.allowedEncodedLengths.includes(decoded.length), 'Invalid decoded address length');
    const [isValid, endPos, ss58Length, ss58Decoded] = checkAddressChecksum(decoded);
    assert(ignoreChecksum || isValid, 'Invalid decoded address checksum');
    assert([-1, ss58Decoded].includes(ss58Format), () => `Expected ss58Format ${ss58Format}, received ${ss58Decoded}`);
    return decoded.slice(ss58Length, endPos);
  } catch (error) {
    throw new Error(`Decoding ${encoded}: ${error.message}`);
  }
}

export function encodeAddress(key, ss58Format = defaults.prefix) {
  // decode it, this means we can re-encode an address
  const u8a = decodeAddress(key);
  assert(ss58Format >= 0 && ss58Format <= 16383 && ![46, 47].includes(ss58Format), 'Out of range ss58Format specified');
  assert(defaults.allowedDecodedLengths.includes(u8a.length), () => `Expected a valid key to convert, with length ${defaults.allowedDecodedLengths.join(', ')}`);
  const input = u8aConcat(ss58Format < 64 ? [ss58Format] : [(ss58Format & 0b0000000011111100) >> 2 | 0b01000000, ss58Format >> 8 | (ss58Format & 0b0000000000000011) << 6], u8a);
  return base58Encode(u8aConcat(input, sshash(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}
