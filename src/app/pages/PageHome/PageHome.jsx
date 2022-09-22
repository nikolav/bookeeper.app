// import {
//   // BoxResizeLeft,
//   // BoxResizeRight,
//   // BoxResizeTop,
//   // Spotlight,
// TabsIndicator,
// } from "../../../components";
//
import { 
  useEffect, 
  useRef, 
  useState
} from "react";
// import { random } from "../../../util"
import { 
  // useChartBarsH, 
  useQueryWorldAtlas
} from "../../../hooks"
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/blob/production--application-command-bar/src/app/pages/PageHome/PageHome.jsx";
//
// const fakeData = () => 
//   ["🥝", "🍋", "🍌", "🍊", "🍎"]
//   .map(name => ({ name, count: random(100)}));
export default function PageHome() {
  // const r$ = useRef()
  // const r2$ = useRef()
  // const [d$, setd] = useState(fakeData())
  // const [i1$, seti1] = useState()
  // const setFakeData = () => setd(fakeData());
  //
  const { 
    topology, 
    paths: { countries, interiors, land }, 
    graticule,
    geoDrawFeature 
  } = useQueryWorldAtlas()
  useEffect(() => {
    if (topology && countries && interiors) {
      console.log(topology);
      console.log(countries);
      console.log(interiors);
    }
  }, [topology, countries, interiors])
  // useEffect(() => {
  //   seti1(setInterval(setFakeData, 5678));
  //   return clearInterval(i1$);
  // }, [])
  // useChartBarsH({
  //   data: d$, 
  //   root: r$?.current,
  //   options: {
  //     key: (d) => d.name,
  //     value: (d) => d.count,
  //     width: 550,
  //     height: 400,
  //   }
  // })
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
        <div>
          {
            (countries && interiors) && (
              <svg width="960" height="500" style={{ border: "1px dotted rgba(0,0,0,.2)" }}>
                <path fill="lightgray" stroke="none" d={geoDrawFeature({type: "Sphere"})} />
                <path fill="none" stroke="rgba(0,0,0,.045)" d={geoDrawFeature(graticule())} />
                {
                  // countries.features.map((feature, i) => 
                  //   <path stroke="none" key={i} d={geoDrawFeature(feature)} />)
                  land.features.map((feature, i) => 
                    <path fill="currentcolor" stroke="none" key={i} d={geoDrawFeature(feature)} />)
                }
                <path fill="none" stroke="gray" d={geoDrawFeature(interiors)} />
              </svg>
            )
          }
        </div>
        {/* <div ref={r$} />
        <div ref={r2$} /> */}
      </div>
    </section>
  );
}
