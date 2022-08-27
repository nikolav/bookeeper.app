import { useEffect } from "react";
import { AppBar } from "./components/app";
import AppRoutes from "./AppRoutes";
import { ToastMessages } from "./components";
import { LoaderBars } from "./components/loaders";
//
import { useBrowser, useAppEvents } from "./hooks";
import { DEFAULT__COMMAND } from "./assets/menu";
import {
  COMMAND__NEW_TEXT_FILE,
  COMMAND__NEW_FILE,
} from "./assets/menu/main/file";

//
function App() {
  // @boot
  const { isMounted, isReady } = useBrowser();
  const dispatch$ = useAppEvents();
  useEffect(() => {
    if (isMounted && isReady) {
      // run global boot methods @App.loaded
      // ship logic in separate module..
      //
      // handle AppBar commands
      [DEFAULT__COMMAND, COMMAND__NEW_TEXT_FILE, COMMAND__NEW_FILE].forEach(
        (command) =>
          dispatch$.addEventListener(command, (node) => {
            const { label } = node.value();
            // @demo handler
            setTimeout(() =>
              // eslint-disable-next-line
              window.alert(`@demo | running [${label}] | OK to close.`)
            );
          })
      );
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
