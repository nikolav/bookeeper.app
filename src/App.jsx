import { AppBar } from "./components/app";
import AppRoutes from "./AppRoutes";
import { LoaderBars } from "./components/loaders";
//
import "./App.css";
//
function App() {
  return (
    <>
      <AppBar />
      <AppRoutes />
      <LoaderBars />
    </>
  );
}

export default App;
