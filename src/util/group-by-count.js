import { identity, groupBy, has } from "./index";
//
const groupByCount = (series, value = identity) => {
  return groupBy(
    series,
    (accum, node, _i, _coll) => {
      const v = value(node);
      if (has(accum, v)) {
        accum[v] += 1;
      } else {
        accum[v] = 1;
      }
      return accum;
    },
    {}
  );
};

export default groupByCount;
