import { useEffect } from "react";
import { AppBar } from "./components/app";
import AppRoutes from "./AppRoutes";
import { ToastMessages } from "./components";
import { LoaderBars } from "./components/loaders";
//
import { useBrowser, useAppEvents } from "./hooks";
import { configure as configureAppBarCommands } from "./assets/menu";
import { configure as configureContextmenuCommands } from "./assets/context-menu";
//
function App() {
  // @boot
  const { isMounted, isReady } = useBrowser();
  const emitter = useAppEvents();
  useEffect(() => {
    // run global boot methods @App.loaded
    if (isMounted && isReady) {
      // handle commands
      configureAppBarCommands(emitter);
      configureContextmenuCommands(emitter);
    }
  }, [isMounted, isReady]);
  //
  return (
    <>
      <AppBar />
      <AppRoutes />
      <ToastMessages />
      <LoaderBars />
    </>
  );
}

export default App;
