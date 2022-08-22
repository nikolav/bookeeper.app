import { BrowserRouter } from "react-router-dom";
//
import { AppBar } from "./components/app";
import "./App.css";

import { useResourceMain } from "./app/store";
//
function App() {
  const { resourceMain } = useResourceMain();
  return (
    <BrowserRouter>
      <pre className="text-xs">{JSON.stringify({ resourceMain }, null, 2)}</pre>
      <main className="app-main">
        <AppBar />
      </main>
    </BrowserRouter>
  );
}

export default App;
