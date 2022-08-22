import { createPortal } from "react-dom";
//
export const PORTAL_ID_END = "aupinafrdxo";
export const PORTAL_ID_START = "wxovjutabig";
//
export default function PortalOverlays({ end = false, children }) {
  const portal_ = () =>
    document.getElementById(true === end ? PORTAL_ID_END : PORTAL_ID_START);
  //
  return createPortal(children, portal_());
}
