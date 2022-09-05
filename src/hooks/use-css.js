import { useReducer, useEffect } from "react";
import { useBrowser } from "./index";
import { merge } from "../util";

const useCss = (ref$, css = {}, isActive = true) => {
  const [state, dispatch] = useReducer(
    (state, payload) => {
      return merge({}, state, payload);
    },
    { ...css }
  );
  const { jQuery: $ } = useBrowser();
  useEffect(() => {
    let node;
    if (isActive) {
      node = ref$?.current;
      if (node && $) {
        $(node).css(state);
      }
    }
  }, [state, isActive, $, ref$?.current]);
  //
  return mergeCss;
  //
  function mergeCss(callback) {
    dispatch(callback(state));
  }
};

export default useCss;
