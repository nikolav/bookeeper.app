import { BrowserRouter } from "react-router-dom";
//
import { AppBar } from "./components";
import "./App.css";
//
function App() {
  return (
    <BrowserRouter>
      <main className="app-main">
        <AppBar />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, maiores dolore. Quia, temporibus. Quidem quibusdam dolore maxime, veniam totam nihil exercitationem quae consequuntur, quaerat, harum distinctio quasi ipsa doloremque natus.</p>
      </main>
    </BrowserRouter>
  );
}

export default App;
