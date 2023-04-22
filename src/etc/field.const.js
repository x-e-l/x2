/* eslint-disable import/group-exports,import/no-named-export,no-magic-numbers,import/exports-last */

// @see https://www.compart.com/en/unicode/block/U+2200

const NAB = String.fromCodePoint(0x2207);
const DOT = String.fromCodePoint(0x22C6);

export const V = Symbol.for(NAB); // '∇';
export const M = Symbol.for(DOT); // ⋆
export const S = '.';

const P = '';

export const ES_TYPE = `${P}es${S}type`;
export const ES_VALUE = `${P}es${S}value`;

export const IS_T_ARRAY = `${P}is${S}t${S}array`;
export const IS_F_ARRAY = `${P}is${S}f${S}array`;

export const IS_T_ERROR = `${P}is${S}t${S}error`;
export const IS_F_ERROR = `${P}is${S}f${S}error`;

export const IS_T_PRIMITIVE = `${P}is${S}t${S}primitive`;
export const IS_F_PRIMITIVE = `${P}is${S}f${S}primitive`;

export const IS_T_PROMISE = `${P}is${S}t${S}promise`;
export const IS_F_PROMISE = `${P}is${S}f${S}promise`;

export const TO_LEN = `${P}to${S}len`;
export const TO_ITE = `${P}to${S}ite`;

export const TO_BUL = `${P}to${S}bul`;
export const TO_NUM = `${P}to${S}num`;
export const TO_STR = `${P}to${S}str`;


export const PZ = Symbol('+0');
export const NZ = Symbol('-0');
