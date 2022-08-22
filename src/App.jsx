import { Route } from "react-router-dom";
import { AnimatedRoutes, RouteTransition } from "./components";
//
import { AppBar } from "./components/app";
import "./App.css";
//
function App() {
  return (
    <>
      <AppBar />
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
    </>
  );
}

export default App;

//
function PageHome() {
  return (
    <section className="text-center">
      <h1>@index</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
        nesciunt suscipit perspiciatis.
      </p>
    </section>
  );
}
function PageAbout() {
  return (
    <section className="text-center">
      <h1>@about</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae
        perferendis totam?
      </p>
    </section>
  );
}
