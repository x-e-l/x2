/* eslint-disable import/group-exports,import/no-named-export,no-magic-numbers */

// @see https://www.compart.com/en/unicode/block/U+2200

export const V = String.fromCodePoint(0x2207); // '∇';
export const P = String.fromCodePoint(0x22C6); // ⋆


export const IS_T_ARRAY = `${P}is.t.array`;
export const IS_F_ARRAY = `${P}is.f.array`;

export const IS_T_PRIMITIVE = `${P}is.t.primitive`;
export const IS_F_PRIMITIVE = `${P}is.f.primitive`;


export const TO_NUM = `${P}to.num`;
export const TO_STR = `${P}to.str`;


export const PZ = Symbol('+0');
export const NZ = Symbol('-0');
