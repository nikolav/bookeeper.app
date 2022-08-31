import React from "react";
import { Popper, PortalOverlays } from "../index";

const ContextMenu = ({ menu, ...rest }) => {
  return (
    isOpen && (
      <PortalOverlays end={true}>
        <Popper.Appear {...rest}>ContextMenu</Popper.Appear>
      </PortalOverlays>
    )
  );
};

export default ContextMenu;
