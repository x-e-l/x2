/* eslint-disable new-cap */


import {TO_NUM} from '#src/etc/field.const.js';
import X from '#src/index.js';


const add = (a, b) => X(X(a)[TO_NUM] + X(b)[TO_NUM]);


// noinspection JSUnusedGlobalSymbols
export default add;
