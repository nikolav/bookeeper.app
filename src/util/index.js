import { nanoid } from "nanoid";
import md5 from "md5";
import classnames from "classnames";
//
import assign from "lodash/assign";
import clamp from "lodash/clamp";
import debounce from "lodash/debounce";
import each from "lodash/each";
import filter from "lodash/filter";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import identity from "lodash/identity";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import keys from "lodash/keys";
import map from "lodash/map";
import merge from "lodash/merge";
import noop from "lodash/noop";
import now from "lodash/now";
import omit from "lodash/omit";
import pick from "lodash/pick";
import pickBy from "lodash/pickBy";
import random from "lodash/random";
import range from "lodash/range";
import reduce from "lodash/reduce";
import sample from "lodash/sample";
import shuffle from "lodash/shuffle";
import transform from "lodash/transform";
import values from "lodash/values";
//
import q from "nikolav-q";
import tree from "nikolav-tree";
// import tree from "./tree";
//
import getNodeKey from "./get-node-key";
import groupByCount from "./group-by-count";
import traverseTree, { isFolder } from "./traverse-tree";
import withReturnValue from "./with-return-value";
//
const fProto = Function.prototype;
const aProto = Array.prototype;
const oProto = Object.prototype;
//
const { eventListener, prevent, ready, s: select, type, idGen } = q;
const { add: addClass, rm: removeClass, has: hasClass } = q.class;
const { sortByTimestampDesc } = q.array;
const { stripEndSlashes } = q.str;
const { isEmail } = q.test;
const { has } = q.object;
//
const push = fProto.call.bind(aProto.push);
const forEach = fProto.call.bind(aProto.forEach);
const toString = fProto.call.bind(oProto.toString);
const cp = (data = {}) => ({ ...data });
const isNumeric = (n) => !!(n - parseFloat(n) + 1);
const True = () => true;
const False = () => false;
const paste = assign;
const arrayRand = sample;

export {
  addClass,
  arrayRand,
  assign,
  clamp,
  classnames,
  cp,
  debounce,
  each,
  eventListener,
  False,
  filter,
  find,
  forEach,
  getNodeKey,
  groupBy,
  groupByCount,
  has,
  hasClass,
  identity,
  idGen,
  isEmail,
  isFolder,
  isFunction,
  isNumeric,
  isString,
  keys,
  map,
  md5,
  merge,
  nanoid,
  noop,
  now,
  omit,
  paste,
  pick,
  pickBy,
  prevent,
  push,
  random,
  range,
  ready,
  reduce,
  removeClass,
  sample,
  select,
  shuffle,
  sortByTimestampDesc,
  stripEndSlashes,
  toString,
  transform,
  traverseTree,
  tree,
  True,
  type,
  values,
  withReturnValue,
};
