import { useEffect } from "react";
import { useBrowser } from "./index";

const useOn = (refTarget, setup, isActive = true) => {
  const { jQuery: $ } = useBrowser();
  useEffect(() => {
    const node = refTarget?.current;
    let node$;
    let cleanup;
    //
    if (node && $) {
      node$ = $(node);
      cleanup = () => node$.off(Object.keys(setup).join(" "));
      if (isActive) {
        node$.on(setup);
      } else {
        cleanup();
      }
    }
    //
    return cleanup;
  }, [refTarget?.current, isActive, $]);
};

export default useOn;
