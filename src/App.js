import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Adduuid from "./pages/Adduuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-uuid">Add UDID</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/add-uuid" element={<Adduuid />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
