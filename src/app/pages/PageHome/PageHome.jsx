import {
  //   // BoxResizeLeft,
  //   // BoxResizeRight,
  //   // BoxResizeTop,
  //   // Spotlight,
  TabsIndicator,
} from "../../../components";
import { useState } from "react";
import { sample } from "../../../util";
//
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/blob/production--application-command-bar/src/app/pages/PageHome/PageHome.jsx";
//
export default function PageHome() {
  const [k, setk] = useState("$0");
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
        <p>
          Komponenta <strong>&lt;ContextMenu&gt;</strong> za web aplikacije
          desktop tipa.
        </p>
      </div>
      <button onClick={() => setk(sample(["$0", "$1", "$2"]))}>go</button>
      <div className="**w-64 ***bg-blue-300 mx-auto">
        <TabsIndicator current={k} />
      </div>
    </section>
  );
}
