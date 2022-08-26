import { useEffect } from "react";
//
const useClickAway = (
  // ref
  root,
  // callback
  handle,
  // wait dom
  isActive$ = true
) => {
  const html = document.documentElement;
  //
  const handle_ = (evt) => {
    root?.current && !root.current.contains(evt.target) && handle(evt);
  };
  //
  const cleanup = () => html.removeEventListener("click", handle_);
  //
  useEffect(() => {
    isActive$ && html.addEventListener("click", handle_);
    return cleanup;
  }, [isActive$]);
  //
  return cleanup;
};

export default useClickAway;
