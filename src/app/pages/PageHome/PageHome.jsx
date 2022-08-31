import { useState, useRef } from "react";
import { Filesystem } from "../../../components";
import { getNodeKey } from "../../../util";
//
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/blob/production--filesystem/src/components/Filesystem/Filesystem.jsx";
//
export default function PageHome() {
  const [f$, setf] = useState();
  //
  return (
    <section className="text-center">
      <h1>@index</h1>
      <hr className="m-0 p-0 block" />
      <pre className="bg-stone-900/50 text-xs min-h-[6rem] text-left flex items-center rounded p-2">
        {f$ ? JSON.stringify(f$, null, 2) : "No file selected."}
      </pre>
      <p>
        <strong>&lt;Filesystem&gt;</strong> komponenta za web aplikacije desktop
        tipa.
      </p>
      <p className="flex justify-evenly items-center">
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
      <div className="px-12 mt-4">
        <Filesystem
          ID="grcnxyhffbb"
          onSelect={(node) => {
            if (!node) {
              setf(null);
              return;
            }
            //
            const { label: file } = node.value();
            setf({ path: getNodeKey(node), file });
          }}
        />
      </div>
    </section>
  );
}
