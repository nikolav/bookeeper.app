import { useState } from "react";

export default function useStateSwitch(initial = false) {
  //
  const [isActive, setIsActive] = useState(initial);
  //
  const on = () => setIsActive(true);
  const off = () => setIsActive(false);
  const toggle = () => setIsActive(!isActive);
  //
  toggle.on = on;
  toggle.off = off;
  //
  return { isActive, toggle };
}
