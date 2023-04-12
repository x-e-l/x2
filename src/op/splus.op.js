/* eslint-disable new-cap */
// noinspection SpellCheckingInspection


import {TO_STR} from '#src/etc/field.const.js';
import X from '#src/index.js';


const splus = (a, b) => X(X(a)[TO_STR] + X(b)[TO_STR]);


// noinspection JSUnusedGlobalSymbols
export default splus;
