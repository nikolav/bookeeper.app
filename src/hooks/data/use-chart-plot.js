import { useEffect, useState, useMemo } from "react";
import { useBrowser } from "../index";
import {
  extent,
  axisBottom,
  axisLeft,
  max,
  scaleLinear,
  scaleTime,
  select,
  transition,
} from "d3";
import { merge } from "../../util";
////
/////
const OPTIONS = {
  colorPrimary: "currentcolor",
  height: 400,
  paddingBottom: 32,
  paddingLeft: 32,
  paddingRight: 16,
  paddingTop: 16,
  width: 550,
  // accesor.value
  key: (d) => new Date(d.date),
  value: (d) => d.value,
  xValue: scaleTime,
  yValue: scaleLinear,
  // minor tweeks
  _classCanvas: "PlotChart--canvas",
  _classDots: "PlotChart--dots",
  _classGraph: "PlotChart--graph",
  _classXAxis: "PlotChart--xAxis",
  _classYAxis: "PlotChart--yAxis",
  _dotOpacity: 1,
  _dotRadius: 4,
  _ticksSpanX: 71,
  _ticksSpanY: 64,
  _transitionDuration: 678,
  _xAxisTextAnchor: "end",
  _xAxisTextOpacity: 0.85,
  _xAxisTextRotationDegrees: -18,
};

const useChartPlot = ({ isActive = true, data, root, options }) => {
  const { isReady } = useBrowser();
  const [c$, setc] = useState({
    svg: null,
    graph: null,
    xAxis: null,
    yAxis: null,
  });
  const {
    colorPrimary,
    height,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    width,
    // 
    key,
    value,
    xValue,
    yValue,
    // 
    _classCanvas,
    _classDots,
    _classGraph,
    _classXAxis,
    _classYAxis,
    _dotOpacity,
    _dotRadius,
    _ticksSpanX,
    _ticksSpanY,
    _transitionDuration,
    _xAxisTextAnchor,
    _xAxisTextOpacity,
    _xAxisTextRotationDegrees,
  } = useMemo(() => merge({}, OPTIONS, options), [options]);
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;
  // .. skip domain, set @init
  const x = xValue().range([0, innerWidth]);
  const y = yValue().range([innerHeight, 0]);
  // @init
  useEffect(() => {
    let svg = null;
    let graph = null;
    let xAxis = null;
    let yAxis = null;
    //
    if (isReady && root) {
      if (isActive) {
        svg = select(root)
          .append("svg")
          .attr("class", _classCanvas)
          .attr("width", width)
          .attr("height", height)
          // .style("border", "1px dotted grey")
          ;
        graph = svg
          .append("g")
          .attr("class", _classGraph)
          .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);
        xAxis = svg
          .append("g")
          .attr("class", _classXAxis)
          .attr("transform", `translate(${paddingLeft}, ${height - paddingBottom})`);
        yAxis = svg
          .append("g")
          .attr("class", _classYAxis)
          .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);
        //
      } else {
        c$.svg && c$.svg.remove();
      }
    }
    //
    setc((c) => ({ ...c, svg, graph, xAxis, yAxis }));
  }, [root, isActive, isReady]);
  //
  // @update; domains, axis
  useEffect(() => {
    if (data && isActive && c$.graph) {
      const { graph, xAxis, yAxis } = c$;
      const dots = graph.selectAll("circle").data(data, key);
      const t = transition("@t1--PlotChart").duration(_transitionDuration);
      const ticksXCount = innerWidth / _ticksSpanX;
      const ticksYCount = innerHeight / _ticksSpanY;
      // update scale domains
      x.domain(extent(data, key));
      y.domain([0, max(data, value)]);
      // run axis
      xAxis.transition(t).call(axisBottom(x).ticks(ticksXCount));
      yAxis.transition(t).call(axisLeft(y).ticks(ticksYCount));
      // [current]
      dots
        .transition(t)
        .attr("cx", (d) => x(key(d)))
        .attr("cy", (d) => y(value(d)));
      // [exit]
      dots
        .exit()
        .attr("fill", "#ff0000")
        .transition(t)
        .attr("fill-opacity", 0)
        .attr("cy", y(0))
        .remove();
      // [enter]
      dots
        .enter()
        .append("circle")
        .attr("r", _dotRadius)
        .attr("cx", (d) => x(key(d)))
        .attr("fill", colorPrimary)
        .attr("class", _classDots)
        // .initial
        .attr("cy", y(0))
        .attr("fill-opacity", 0)
        .transition(t)
        // .animate
        .attr("cy", (d) => y(value(d)))
        .attr("fill-opacity", _dotOpacity);
      // tweak x-axis text
      xAxis
        .selectAll("text")
        .attr("text-anchor", _xAxisTextAnchor)
        .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
        .attr("fill-opacity", _xAxisTextOpacity);
    }
  }, [data, isActive, c$.graph]);
  //
};

export default useChartPlot;
