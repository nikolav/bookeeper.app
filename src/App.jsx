import { AppBar } from "./components/app";
import AppRoutes from "./AppRoutes";
import { ToastMessages } from "./components";
import { LoaderBars } from "./components/loaders";
//
function App() {
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
