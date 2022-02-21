import { isU8a, isHex, hexToU8a, stringToU8a } from "./crypto";

export function isFunction(value) {
  return typeof value === 'function';
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(isFunction(message) ? message() : message);
  }
}

export function isBuffer(value) {
  const hasBuffer = typeof Buffer !== 'undefined';
  return hasBuffer && Buffer.isBuffer(value);
}

export function u8aToU8a(value) {
  return !value ? new Uint8Array() : Array.isArray(value) || isBuffer(value) ? new Uint8Array(value) : isU8a(value) ? value : isHex(value) ? hexToU8a(value) : stringToU8a(value);
}

export function u8aConcat(...list) {
  let length = 0;
  let offset = 0;
  const u8as = new Array(list.length);

  for (let i = 0; i < list.length; i++) {
    u8as[i] = u8aToU8a(list[i]);
    length += u8as[i].length;
  }

  const result = new Uint8Array(length);

  for (let i = 0; i < u8as.length; i++) {
    result.set(u8as[i], offset);
    offset += u8as[i].length;
  }

  return result;
}

