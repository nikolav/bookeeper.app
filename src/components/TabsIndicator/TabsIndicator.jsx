import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import modcss from "./TabsIndicator.module.scss";
import { findIndex } from "../../util";

//
const TabsIndicator = ({
  //
  // [
  // { key: string.unique, stop: 0, color: css-color }, 1..
  // { key: string.unique, stop: 1, color: css-color }, ..N
  //   ]
  stops = [
    { key: "$0", stop: 0, color: "red" },
    { key: "$1", stop: 1 / 3, color: "green" },
    { key: "$2", stop: 2 / 3, color: "blue" },
  ],
  //
  current = null,
  //
  height = 2,
  //
  className = "",
  //
  ...rest
}) => {
  //
  const W = 512;
  const H = height;
  //
  const [k$, setk] = useState(0);
  const to = stops[k$];
  //
  const x = W * to.stop;
  const width = ((stops[k$ + 1]?.stop || 1) - to.stop) * W;
  const fill = to.color;
  //
  useEffect(() => setk(findIndex(stops, { key: current })), [current]);
  //
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${modcss.canvas} ${className}`}>
      <motion.rect
        stroke="0"
        y="0"
        height={H}
        className={modcss.indicator}
        animate={{
          x,
          width,
          fill,
        }}
        initial={false}
        {...rest}
      />
    </svg>
  );
};

export default TabsIndicator;
