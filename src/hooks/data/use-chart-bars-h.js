import { useEffect, useState, useMemo } from "react";
import { transition, axisBottom, axisLeft, max, scaleLinear, select, scaleBand } from "d3";
import { merge, map, identity, forEach } from "../../util";
import { useBrowser } from "../index";
////
/////
const OPTIONS = {
    colorPrimary: "currentcolor",
    height: 480,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 16,
    paddingTop: 16,
    width: 640,
    //
    // accesors
    key: (d) => d.key,
    value: (d) => d.value,
    //
    // tweek
    _classBars: "ChartBarsH--bars",
    _classCanvas: "ChartBarsH--canvas",
    _classGraph: "ChartBarsH--graph",
    _classVTicksGroup: "ChartBarsH--vTicksGroup",
    _classVTicksLine: "ChartBarsH--vTicksLine",
    _classXAxis: "ChartBarsH--xAxis",
    _classYAxis: "ChartBarsH--yAxis",
    _paddingInnerBars: 0.02,
    _paddingOuterBars: 0,
    _tickSizeInner: 4,
    _tickSizeOuter: 7,
    _ticksSpanX: 76,
    _transitionDuration: 678,
    _xAxisTextAnchor: "center",
    _xAxisTextFormat: identity,
    _xAxisTextOpacity: 0.92,
    _xAxisTextRotationDegrees: -2,
    _yAxisTextFormat: identity,
    //
    _guides: true,
    _guidesColor: "#000",
    _guidesOpacity: .5,
    _guidesWidth: .1,
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
        vGuides: null,
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
        //
        _classBars,
        _classCanvas,
        _classGraph,
        _classVTicksGroup,
        _classVTicksLine,
        _classXAxis,
        _classYAxis,
        _paddingInnerBars,
        _paddingOuterBars,
        _tickSizeInner,
        _tickSizeOuter,
        _ticksSpanX,
        _transitionDuration,
        _xAxisTextAnchor,
        _xAxisTextFormat,
        _xAxisTextOpacity,
        _xAxisTextRotationDegrees,
        _yAxisTextFormat,
        // 
        _guides,
        _guidesColor,
        _guidesOpacity,
        _guidesWidth,
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
        let vGuides = null;
        //
        if (isReady && root) {
            if (isActive) {
                // domains @init
                svg = select(root)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    // @@
                    // .style("border", "1px dotted grey")
                    .attr("class", _classCanvas);
                // render guides first to place behind*
                if (_guides)
                    vGuides = svg
                        .append("g")
                        .attr("class", _classVTicksGroup)
                        .attr("transform", `translate(${paddingLeft}, ${paddingTop})`);
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
                // 
            } else {
                // remove svg
                chart$.svg && chart$.svg.remove();
            }
        }
        //
        setChart((c) => ({ ...c, svg, graph, xAxis, yAxis, vGuides }));
    }, [isReady, root, isActive]);
    //
    // @update; domains, axis
    useEffect(() => {
        if (data && isActive && chart$.graph) {
            const { graph, xAxis, yAxis, vGuides } = chart$;
            const bars = graph.selectAll("rect").data(data, key);
            const t = transition("@t1--ChartBarsH").duration(_transitionDuration);
            const ticksCount = widthInner / _ticksSpanX;
            //
            // update scale domains
            x.domain([0, max(data, value)]);
            y.domain(map(data, key));
            //
            // run axis
            // ..can format axis here
            xAxis.transition(t)
                .call(
                    axisBottom(x)
                        .ticks(ticksCount)
                        .tickFormat(_xAxisTextFormat)
                        .tickSizeInner(_tickSizeInner)
                        .tickSizeOuter(_tickSizeOuter)
                )
                .call((g) =>
                    g
                        .selectAll("text")
                        .attr("text-anchor", _xAxisTextAnchor)
                        .attr("fill-opacity", _xAxisTextOpacity)
                        .attr("transform", `rotate(${_xAxisTextRotationDegrees})`)
                );
            //
            if (_guides) {
                const vLines = vGuides
                    .selectAll("line")
                    .data(x.ticks(ticksCount));

                vLines
                    .transition(t)
                    .attr("x1", tickValue => x(tickValue))
                    .attr("x2", tickValue => x(tickValue));
                vLines.exit().remove();
                vLines.enter()
                    .append("line")
                    .attr("class", _classVTicksLine)
                    .attr("y1", 0)
                    .attr("y2", heightInner)
                    // 
                    .attr("stroke", _guidesColor)
                    .attr("stroke-width", _guidesWidth)
                    .attr("x1", width)
                    .attr("x2", width)
                    .attr("stroke-opacity", 0)
                    .transition(t)
                    .attr("x1", tickValue => x(tickValue))
                    .attr("x2", tickValue => x(tickValue))
                    .attr("stroke-opacity", _guidesOpacity);
            }
            // 
            yAxis.transition(t)
                .call(
                    axisLeft(y)
                        .tickFormat(_yAxisTextFormat)
                        .tickSizeInner(_tickSizeInner)
                        .tickSizeOuter(_tickSizeOuter)
                );

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
