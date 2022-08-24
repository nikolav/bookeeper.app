import { nanoid } from "nanoid";
import md5 from "md5";
//
import assign from "lodash/assign";
import clamp from "lodash/clamp";
import debounce from "lodash/debounce";
import each from "lodash/each";
import filter from "lodash/filter";
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
import classnames from "classnames";
//
import q from "nikolav-q";
// import tree from "nikolav-tree";
//
import groupByCount from "./group-by-count";
import traverseTree, { isFolder } from "./traverse-tree";
import withReturnValue from "./with-return-value";
import tree from "./tree";
//
const fProto = Function.prototype;
const aProto = Array.prototype;
//
const { add: addClass, rm: removeClass, has: hasClass } = q.class;
const { eventListener, prevent, ready, s: select, type } = q;
const { has } = q.object;
const { isEmail } = q.test;
const { sortByTimestampDesc } = q.array;
const { stripEndSlashes } = q.str;
//
const arrayRand = sample;
const cp = (data = {}) => ({ ...data });
const False = () => false;
const forEach = fProto.call.bind(aProto.forEach);
const isNumeric = (n) => !!(n - parseFloat(n) + 1);
const paste = assign;
const push = fProto.call.bind(aProto.push);
const True = () => true;

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
  forEach,
  groupBy,
  groupByCount,
  has,
  hasClass,
  identity,
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
  transform,
  traverseTree,
  tree,
  True,
  type,
  values,
  withReturnValue,
};
