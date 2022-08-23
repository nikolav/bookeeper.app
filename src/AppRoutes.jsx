import { Route } from "react-router-dom";
import { AnimatedRoutes, RouteTransition } from "./components";
//
import { PageHome, PageAbout } from "./app/pages";
//
function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;
