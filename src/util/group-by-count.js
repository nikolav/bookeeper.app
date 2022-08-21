import identity from lodash/identity;
import groupBy from lodash/groupBy;
import q from "nikolav-q"

const { has } = q.object;

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
