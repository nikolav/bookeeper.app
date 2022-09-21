import { useEffect, useState, useMemo } from "react";
import { extent, axisBottom, axisLeft, max, scaleLinear, select } from "d3";
import { merge } from "../../util";
import { useBrowser } from "../index";
////
/////
const OPTIONS = {
  width: 640,
  height: 480,
  colorPrimary: "currentcolor",
  paddingTop: 32,
  paddingRight: 32,
  paddingBottom: 32,
  paddingLeft: 32,
  //
  // accesors
  key: (d) => d.key,
  value: (d) => d.value,
  //
  // tweek
  _xAxisTextRotationDegrees: -24,
  _xAxisTextOpacity: 0.85,
  _ticksX: 10,
  _ticksY: 3,
};

const useChart = ({
  //
  isActive = true,
  //
  root,
  //
  data,
  //
  options,
}) => {
  const { isReady } = useBrowser();
  const [chart$, setChart] = useState({
    svg: null,
    graph: null,
    xAxis: null,
    yAxis: null,
  });
  const {
    width,
    height,
    colorPrimary,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    //
    key,
    value,
    //
    _xAxisTextRotationDegrees,
    _xAxisTextOpacity,
    _ticksX,
    _ticksY,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  const widthInner = width - paddingLeft - paddingRight;
  const heightInner = height - paddingTop - paddingBottom;
  // @init
  useEffect(() => {
    let svg = null;
    let graph = null;
    let xAxis = null;
    let yAxis = null;
    //
    if (isReady && root) {
      if (isActive) {
        // domains @init
      } else {
        // remove svg
        chart$.svg && chart$.svg.remove();
      }
    }
    //
    setChart((c) => ({ ...c, svg, graph, xAxis, yAxis }));
  }, [isReady, root, isActive]);
  //
  // @update; domains, axis
  useEffect(() => {
    if (data && isActive && chart$.graph) {
      // update
      // update scale domains
      // run axis
      // [current]
      // [exit]
      // [enter]; update shapes
      //   ..tweak x-axis
    }
  }, [data, isActive, chart$.graph]);
};
