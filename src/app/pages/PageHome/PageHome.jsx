import { useState } from "react";
import { Filesystem } from "../../../components";
import { getNodeKey } from "../../../components/Filesystem/Filesystem";

export default function PageHome() {
  const [f$, setf] = useState();
  return (
    <section className="text-center">
      <h1>@index</h1>
      <pre className="bg-stone-900/50 text-xs min-h-[6rem] text-left flex items-center">
        {f$ ? JSON.stringify(f$, null, 2) : "No file selected."}
      </pre>
      <Filesystem
        key="grcnxyhffbb"
        onSelect={(node) => {
          if (!node) {
            setf(null);
            return;
          }
          //
          const nodeValue = node.value();
          const { label } = nodeValue;
          setf({ path: getNodeKey(node), file: label });
        }}
      />
    </section>
  );
}
