import { BrowserRouter } from "react-router-dom";
//
import { AppBar } from "./components/app";
import "./App.css";
//
function App() {
  return (
    <BrowserRouter>
      <main className="app-main">
        <AppBar />
      </main>
    </BrowserRouter>
  );
}

export default App;
