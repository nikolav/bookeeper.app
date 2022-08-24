import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Collapse = ({
  // open/close
  isOpen,
  //
  height = "auto",
  // content
  children,
  //
  // animation in/out speeds/easy
  duration = 0.1,
  spring = false,
  //
  // container
  ...rest
}) => {
  const transitionType = spring
    ? { type: "spring" }
    : { type: "tween", ease: "easeOut" };
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          animate={{
            opacity: 1,
            height,
            transition: {
              ...transitionType,
              duration,
            },
          }}
          initial={{ opacity: 0, height: 0 }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              ...transitionType,
              duration: duration / 2,
            },
          }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Collapse;
