import { useRef } from "react";
import { ContextMenu } from "../../../components";
import contextMenu from "../../../assets/context-menu/demo";
import imageToolips from "../../../../public/tulips.jpg";
//
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/tree/production--context-menu/src/components/ContextMenu";
//
export default function PageHome() {
  const r$ = useRef();
  //
  return (
    <section className="text-center">
      <h1>@index</h1>
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

      <img
        ref={r$}
        className="block p-2 rounded border-2 shadow w-[320px] mx-auto mt-4"
        src={imageToolips}
        alt="right click to open context menu"
      />
      <ContextMenu ID="wonnzyhpqpf" menu={contextMenu} anchor={r$} />
      <p className="text-center opacity-60 italic">
        Right Click image to open contextmenu
      </p>
    </section>
  );
}
