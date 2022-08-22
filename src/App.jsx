import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//
// import { AppBar } from "./components/app";
import "./App.css";

const PageHome = () => {
  return (
    <section className="text-center">
      <h1>@index</h1>
    </section>
  );
};
const PageAbout = () => {
  return (
    <section className="text-center">
      <h1>@about</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae
        perferendis totam?
      </p>
    </section>
  );
};
//
function App() {
  return (
    <BrowserRouter>
      <>
        <nav className="flex space-x-4 justify-center items-center font-bold">
          <Link to="/">home</Link>
          <Link to="about">about</Link>
        </nav>
      </>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="about" element={<PageAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
