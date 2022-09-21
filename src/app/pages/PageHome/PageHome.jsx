// import {
//   // BoxResizeLeft,
//   // BoxResizeRight,
//   // BoxResizeTop,
//   // Spotlight,
// TabsIndicator,
// } from "../../../components";
//
import { useEffect, useRef, useState } from "react";
import { random } from "../../../util"
import { useChartBarsH } from "../../../hooks"
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/blob/production--application-command-bar/src/app/pages/PageHome/PageHome.jsx";
//
export default function PageHome() {
  const r$ = useRef()
  const [d$, setd] = useState(null)
  //
  useEffect(() => {
    setd([
      { name: "🥝", count: random(100) },
      { name: "🍋", count: random(100) },
      { name: "🍌", count: random(100) },
      { name: "🍊", count: random(100) },
      { name: "🍎", count: random(100) }
    ])
  }, [])
  useChartBarsH({
    data: d$, 
    root: r$?.current,
    options: {
      key: (d) => d.name,
      value: (d) => d.count,
      colorPrimary: "steelblue"
    }
  })
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
      </div>
    </section>
  );
}
