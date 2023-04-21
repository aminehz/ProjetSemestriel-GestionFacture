import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stock from "./components/Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import Facture from "./components/Facture";
import Layout from "./components/layouts/Layout";
import Client from "./components/Clients";
function App() {
  return (
    <Router>
      <Layout>
      <div className="App">
        <Routes>  
          <Route path="/Stock" element={<Stock/>} />
           <Route path="/Facture" element={<Facture/>} />
           <Route path="/Archive" element={<><Stock/></>} />
           <Route path="/Clients" element={<Client/>} />
           <Route path="/DemandeFacture" element={<><Stock/></>} />
           <Route path="/" element={<SignIn/>}/>

        </Routes>
      </div>
      </Layout>
    </Router>
  );
}

export default App;
