import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import Stock from "./components/Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
           <Route path="/" element={<><Header/><Home/></>} />
           <Route path="/stock" element={<><Header/><Stock/></>} />
        </Routes>

       
        <Footer />
      </div>
    </Router>
  );
}

export default App;
