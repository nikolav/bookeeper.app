import React from "react";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";
import { useFlags } from "../../app/store";
import PortalOverlays from "../PortalOverlays/PortalOverlays";

// https://mhnpd.github.io/react-loader-spinner/
// yarn add react-loader-spinner
// rgb(15, 23, 42)
// <RotatingLines width="100%" strokeColor="rgb(15, 23, 42)" />
// <Bars heigth="100%" width="100%" color="rgb(15, 23, 42)" ariaLabel="loading-indicator" />
const LoaderBars = () => {
  const flags = useFlags();
  const isActive = flags.isProcessing();
  //
  return (
    isActive && (
      <PortalOverlays>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 0.55,
            y: 0,
            transition: { duration: 0.23 },
          }}
          className="fixed right-10 bottom-4 z-50"
        >
          <Bars
            heigth="20"
            width="50"
            color="rgb(15, 23, 42)"
            ariaLabel="loading-indicator"
          />
        </motion.div>
      </PortalOverlays>
    )
  );
};

export default LoaderBars;
