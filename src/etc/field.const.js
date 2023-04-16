/* eslint-disable import/group-exports,import/no-named-export,no-magic-numbers,import/exports-last */

// @see https://www.compart.com/en/unicode/block/U+2200

export const V = ''; // String.fromCodePoint(0x2207); // '∇';
export const P = '*'; // String.fromCodePoint(0x22C6); // ⋆
export const S = '.';

const PS = P + S;

export const ES_TYPE = `${PS}es.type`;
export const ES_VALUE = `${PS}es.value`;

export const IS_T_ARRAY = `${PS}is.t.array`;
export const IS_F_ARRAY = `${PS}is.f.array`;

export const IS_T_ERROR = `${PS}is.t.error`;
export const IS_F_ERROR = `${PS}is.f.error`;

export const IS_T_PRIMITIVE = `${PS}is.t.primitive`;
export const IS_F_PRIMITIVE = `${PS}is.f.primitive`;

export const TO_LEN = `${PS}to.len`;

export const TO_BUL = `${PS}to.bul`;
export const TO_NUM = `${PS}to.num`;
export const TO_STR = `${PS}to.str`;


export const PZ = Symbol('+0');
export const NZ = Symbol('-0');
