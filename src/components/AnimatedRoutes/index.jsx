import { useLocation, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import variantsPageTransitions from "../../assets/page-transitions";
//
export const RouteTransition = ({ children }) => (
  <motion.div
    variants={variantsPageTransitions.fade}
    initial="out"
    exit="out"
    animate="in"
  >
    {children}
  </motion.div>
);

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
