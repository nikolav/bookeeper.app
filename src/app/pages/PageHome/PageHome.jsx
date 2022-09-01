import { useState, useRef } from "react";
import {
  // Filesystem,
  // ApplicationBar,
  ContextMenu,
} from "../../../components";
import contextMenu from "../../../assets/context-menu/demo";
// import { getNodeKey } from "../../../util";
//

export default function PageHome() {
  const r$ = useRef();
  //
  return (
    <section className="text-center">
      <h1>@index</h1>
      {/* <ApplicationBar /> */}
      <hr className="m-0 p-0 block mb-2" />
      <button ref={r$} className="button">
        ok
      </button>
      <ContextMenu ID="wonnzyhpqpf" menu={contextMenu} anchor={r$} />
      {/* <pre className="bg-stone-900/50 text-xs min-h-[6rem] text-left flex items-center">
        {f$ ? JSON.stringify(f$, null, 2) : "No file selected."}
      </pre> */}
      {/* <Filesystem
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
      /> */}
    </section>
  );
}
