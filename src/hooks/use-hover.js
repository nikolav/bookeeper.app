import { useEffect } from "react";
import { useStateSwitch, useBrowser } from "./index";
export default (refElement) => {
  const { isActive: isHover$, toggle: toggleIsHover } = useStateSwitch();
  const { jQuery: $ } = useBrowser();
  //
  useEffect(() => {
    const node = refElement?.current;
    let node$;
    //
    if (node && $) {
      node$ = $(node);
      //
      node$.on({
        mouseenter: toggleIsHover.on,
        mouseleave: toggleIsHover.off,
      });
    }
    //
    return () => node$?.off("mouseenter mouseleave");
    //
  }, [refElement?.current, $]);
  //
  return isHover$;
};
