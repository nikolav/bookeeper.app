import { useEffect } from "react";
import { AppBar } from "./components/app";
import AppRoutes from "./AppRoutes";
import { ToastMessages } from "./components";
import { LoaderBars } from "./components/loaders";
//
import { useBrowser, useAppEvents } from "./hooks";
import { configure as configureAppBarCommands } from "./assets/menu";
//
function App() {
  // @boot
  const { isMounted, isReady } = useBrowser();
  const emit$ = useAppEvents();
  useEffect(() => {
    // run global boot methods @App.loaded
    // ship logic in separate modules..
    if (isMounted && isReady) {
      //
      // handle AppBar commands
      configureAppBarCommands(emit$);
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
