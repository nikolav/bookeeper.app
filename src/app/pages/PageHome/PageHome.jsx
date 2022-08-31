import { useState, useRef } from "react";
import { Filesystem } from "../../../components";
import { getNodeKey } from "../../../util";
//
export default function PageHome() {
  const [f$, setf] = useState();
  //
  return (
    <section className="text-center">
      <h1>@index</h1>
      <hr className="m-0 p-0 block mb-2" />
      <pre className="bg-stone-900/50 text-xs min-h-[6rem] text-left flex items-center">
        {f$ ? JSON.stringify(f$, null, 2) : "No file selected."}
      </pre>
      <div className="grid grid-cols-2 gap-2">
        <div>
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

        <div>
          <p>
            {" "}
            <em>ReactJS</em> <strong>&lt;Filesystem&gt;</strong>
          </p>
          <p>Filesystem component for desktop type online applications.</p>
          <p>
            <a
              className="link text-indigo-500"
              rel="norefferer noopenenr"
              target="_blank"
              // href={GIT_LINK}
            >
              code@github
            </a>
          </p>
          <p>
            <a
              className="link text-indigo-500"
              rel="norefferer noopenenr"
              target="_blank"
              href="https://nikolav.rs/"
            >
              admin
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
