import { Route } from "react-router-dom";
import { AnimatedRoutes, RouteTransition } from "./components";
//
import { AppBar } from "./components/app";
import { PageHome, PageAbout } from "./app/pages";
import { LoaderBars } from "./components/loaders";
//
import "./App.css";
//
function App() {
  return (
    <>
      {/*  */}
      {/*  */}
      <AppBar />

      {/*  */}
      {/*  */}
      <AnimatedRoutes>
        <Route
          path="/"
          element={
            <RouteTransition>
              <PageHome />
            </RouteTransition>
          }
        />
        <Route
          path="about"
          element={
            <RouteTransition>
              <PageAbout />
            </RouteTransition>
          }
        />
      </AnimatedRoutes>

      {/*  */}
      {/*  */}
      <LoaderBars />
    </>
  );
}

export default App;
