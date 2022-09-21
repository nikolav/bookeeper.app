// import {
//   // BoxResizeLeft,
//   // BoxResizeRight,
//   // BoxResizeTop,
//   // Spotlight,
// TabsIndicator,
// } from "../../../components";
//
import { useEffect, useRef, useState } from "react";
import { scaleTime } from "d3";
import { random, range } from "../../../util"
import { useChartBarsH, useChartPlot } from "../../../hooks"
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/blob/production--application-command-bar/src/app/pages/PageHome/PageHome.jsx";
//
const fakeData = () => 
  ["🥝", "🍋", "🍌", "🍊", "🍎"]
  .map(name => ({ name, count: random(100)}));
export default function PageHome() {
  const r$ = useRef()
  const r2$ = useRef()
  const [d$, setd] = useState(fakeData())
  const [i1$, seti1] = useState()
  //
  const setFakeData = () => setd(fakeData());
  useEffect(() => {
    seti1(setInterval(setFakeData, 5678));
    return clearInterval(i1$);
  }, [])
  useChartBarsH({
    data: d$, 
    root: r$?.current,
    options: {
      key: (d) => d.name,
      value: (d) => d.count,
      width: 550,
      height: 400,
    }
  })
  // useChartPlot({
  //   data: range(2001, 2022).map(y => ({ date: "" + y, value: random(1000)})),
  //   root: r2$?.current,
  //   options: {
  //     key: d => new Date(d.date),
  //     value: d => d.value,
  //     xValue: scaleTime,
  //   }
  // })
  //
  return (
    <section className="text-center">
      <div className="mt-12">
        <p className="flex justify-center gap-20">
          <a
            className="link text-indigo-500"
            rel="norefferer noopenenr"
            target="_blank"
            href={GIT_LINK}
          >
            code@github
          </a>
          <a
            className="link text-indigo-500"
            rel="norefferer noopenenr"
            target="_blank"
            href="https://nikolav.rs/"
          >
            admin
          </a>
        </p>
        <div ref={r$} />
        <div ref={r2$} />
      </div>
    </section>
  );
}
