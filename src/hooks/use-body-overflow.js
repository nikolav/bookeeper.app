import { useState, useEffect } from "react";
import { assign, addClass, hasClass, removeClass } from "../util";

const OVERFLOW_HIDDEN_CLASS = "overflow-hidden";
//
const useBodyOverflow = () => {
  const [overflowHidden, setOverflowHidden] = useState();
  //
  const body = window?.document.body;
  //
  // @init
  useEffect(() => {
    setOverflowHidden(hasClass(body, OVERFLOW_HIDDEN_CLASS));
  }, []);
  //
  // @update
  useEffect(() => {
    if (overflowHidden) {
      addClass(body, OVERFLOW_HIDDEN_CLASS);
      return;
    }
    //
    removeClass(body, OVERFLOW_HIDDEN_CLASS);
  }, [overflowHidden]);
  //
  return assign(() => overflowHidden, {
    hidden: (isHidden) => setOverflowHidden(true === isHidden),
  });
};

//
export default useBodyOverflow;
