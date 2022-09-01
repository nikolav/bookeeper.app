import React, { useState } from "react";
import PortalOverlays from "../PortalOverlays/PortalOverlays";
import { motion, AnimatePresence } from "framer-motion";
import { has } from "../../util";
// https://popper.js.org/react-popper/
import { usePopper } from "react-popper";
//
const DEFAULT_DURATION_IN = 0.2;
const DEFAULT_DURATION_OUT = 0.1;
const APPEAR = {
  slideUp: {
    initial: { opacity: 0, y: 12, scale: 1 },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: DEFAULT_DURATION_OUT },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: DEFAULT_DURATION_IN },
    },
  },
  slideUpExitPop: {
    initial: { opacity: 0, y: 12, scale: 1 },
    exit: {
      transition: { duration: 0 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: DEFAULT_DURATION_IN },
    },
  },
  slideLeft: {
    initial: { opacity: 0, x: 12, scale: 1 },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: DEFAULT_DURATION_OUT },
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: DEFAULT_DURATION_IN },
    },
  },
  puff: {
    initial: { opacity: 0, scale: 1.05 },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: DEFAULT_DURATION_OUT },
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: DEFAULT_DURATION_IN },
    },
  },
  fade: {
    initial: { opacity: 0 },
    exit: { opacity: 0, transition: { duration: DEFAULT_DURATION_OUT } },
    animate: { opacity: 1, transition: { duration: DEFAULT_DURATION_IN } },
  },
  _default: {
    initial: { opacity: 0 },
    exit: { opacity: 0, transition: { duration: DEFAULT_DURATION_OUT } },
    animate: { opacity: 1, transition: { duration: DEFAULT_DURATION_IN } },
  },
};
//
// type Placement =
//   | 'auto'
//   | 'auto-start'
//   | 'auto-end'
//   | 'top'
//   | 'top-start'
//   | 'top-end'
//   | 'bottom'
//   | 'bottom-start'
//   | 'bottom-end'
//   | 'right'
//   | 'right-start'
//   | 'right-end'
//   | 'left'
//   | 'left-start'
//   | 'left-end';
////
////
const Popper = ({
  anchor,
  isActive = true,
  placement = "auto",
  offset = [0, 0],
  options = {},
  children,
  ...rest
}) => {
  const popperConfig = {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
    ],
    ...options,
  };
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(anchor, popperElement, popperConfig);
  //
  return isActive ? (
    <PortalOverlays>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-[1] m-0 p-0"
        {...rest}
      >
        {children}
      </div>
    </PortalOverlays>
  ) : null;
};
//
const PopperAppear = ({
  isActive = false,
  effect = "slideUp",
  className,
  children,
  // anchor
  // placement,
  // offset,
  // options,
  ...rest
}) => {
  if (!has(APPEAR, effect)) effect = "_default";
  //
  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <Popper isActive={isActive} {...rest}>
          <motion.div
            initial={APPEAR[effect].initial}
            exit={APPEAR[effect].exit}
            animate={APPEAR[effect].animate}
            className={`m-0 p-0 ${className}`}
            key="PopperAppear-root"
            {...rest}
          >
            {children}
          </motion.div>
        </Popper>
      )}
    </AnimatePresence>
  );
};
//
// @@
Popper.Appear = PopperAppear;
//@@
export default Popper;

/*
<Popper
    isActive
    anchor={el}
    placement="top"
    offset={[0, 0]}>

  {children}

</Popper>
*/
