import { useLocation, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import variantsPageTransitions from "../../assets/page-transitions";
import { useBodyOverflow } from "../../hooks";
//
export const RouteTransition = ({ children }) => {
  const overflow = useBodyOverflow();
  //
  return (
    <motion.div
      variants={variantsPageTransitions.fade}
      // variants={variantsPageTransitions.slideLeft}
      initial="from"
      exit="out"
      animate="in"
      onAnimationStart={() => overflow.hidden(true)}
      onAnimationComplete={() => overflow.hidden(false)}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence initial={false}>
      <Routes key={location.pathname} location={location}>
        {children}
      </Routes>
    </AnimatePresence>
  );
};
