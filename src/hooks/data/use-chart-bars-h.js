import { useEffect, useState, useMemo } from "react";
import { transition, axisBottom, axisLeft, max, scaleLinear, select, scaleBand } from "d3";
import { merge, map } from "../../util";
import { useBrowser } from "../index";
////
/////
const OPTIONS = {
    width: 640,
    height: 480,
    colorPrimary: "currentcolor",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 32,
    //
    // accesors
    key: (d) => d.key,
    value: (d) => d.value,
    //
    // tweek
    _classBars: "ChartBarsHorizontal--bars",
    _classCanvas: "ChartBarsHorizontal--canvas",
    _classGraph: "ChartBarsHorizontal--graph",
    _classXAxis: "ChartBarsHorizontal--xAxis",
    _classYAxis: "ChartBarsHorizontal--yAxis",
    _paddingInnerBars: 0.02,
    _paddingOuterBars: 0,
    _ticksSpanX: 76,
    _ticksSpanY: 92,
    _transitionDuration: 678,
    _xAxisTextOpacity: 0.85,
    _xAxisTextRotationDegrees: -24,
};

const useChartBarsH = ({
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
        _classBars,
        _classCanvas,
        _classGraph,
        _classXAxis,
        _classYAxis,
        _paddingInnerBars,
        _paddingOuterBars,
        _ticksSpanX,
        _ticksSpanY,
        _transitionDuration,
        _xAxisTextOpacity,
        _xAxisTextRotationDegrees,
    } = useMemo(() => merge({}, OPTIONS, options), [options]);
    const widthInner = width - paddingLeft - paddingRight;
    const heightInner = height - paddingTop - paddingBottom;
    //   
    const x = scaleLinear().range([0, widthInner])
    const y = scaleBand()
        .range([0, heightInner])
        .paddingInner(_paddingInnerBars)
        .paddingOuter(_paddingOuterBars);
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
                svg = select(root)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    // @@
                    .style("border", "1px dotted grey")
                    .attr("class", _classCanvas);
                graph = svg
                    .append("g")
                    .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
                    .attr("class", _classGraph);
                xAxis = svg
                    .append("g")
                    .attr("transform", `translate(${paddingLeft}, ${height - paddingBottom})`)
                    .attr("class", _classXAxis);
                yAxis = svg
                    .append("g")
                    .attr("transform", `translate(${paddingLeft}, ${paddingTop})`)
                    .attr("class", _classYAxis);
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
            const { graph, xAxis, yAxis } = chart$;
            const bars = graph.selectAll("rect").data(data, key);
            const t = transition("@t1--ChartBarsH").duration(_transitionDuration);
            //
            // update scale domains
            x.domain([0, max(data, value)]);
            y.domain(map(data, key));
            //
            // run axis
            // ..can format axis here
            xAxis.transition(t).call(axisBottom(x).ticks(widthInner / _ticksSpanX));
            yAxis.transition(t).call(axisLeft(y).ticks(heightInner / _ticksSpanY));

            // [current]
            bars
                .transition(t)
                .attr("y", (d) => y(key(d)))
                .attr("height", y.bandwidth())
                .attr("width", (d) => x(value(d)) - x(0));
            // [exit]
            bars
                .exit()
                // .initial
                .attr("fill", "#ff0000")
                //  
                .transition(t)
                // .animate
                .attr("fill-opacity", 0)
                .attr("width", 0)
                .attr("height", 0)
                .remove();
            // [enter]; update shapes
            bars
                .enter()
                .append("rect")
                .attr("x", x(0))
                .attr("y", (d) => y(key(d)))
                .attr("height", y.bandwidth())
                .attr("fill", colorPrimary)
                .attr("class", _classBars)
                // transition.initial
                .attr("width", 0)
                .attr("fill-opacity", 0)
                // make transition
                .transition(t)
                // transition.animate
                .attr("width", (d) => x(value(d)) - x(0))
                .attr("fill-opacity", 1);
            //   ..tweak x-axis
        }
    }, [data, isActive, chart$.graph]);
};
// 
export default useChartBarsH;
