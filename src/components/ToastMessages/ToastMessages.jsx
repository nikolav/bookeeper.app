import React from "react";
import { ToastContainer } from "react-toastify";
import PortalOverlays from "../PortalOverlays/PortalOverlays";

// https://fkhadra.github.io/react-toastify/api/toast-container
const ToastMessages = () => (
  <PortalOverlays>
    <ToastContainer
      autoClose={4567}
      closeOnClick
      draggable
      hideProgressBar
      // limit={3}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      // top-right, top-center, top-left,
      // bottom-right, bottom-center, bottom-left
      //   @toast.POSITION
      position="top-right"
      rtl={false}
      //
      // closeButton
      // icon={false}
      // theme=light|dark|colored
    />
  </PortalOverlays>
);

export default ToastMessages;
