import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stock from "./components/Supplier/Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import Facture from "./components/Supplier/Facture";
import Layout from "./components/layouts/Layout";
import Client from "./components/Supplier/Clients";
import DemandBill from "./components/Supplier/DemandBill";
import BillClient from "./components/Clients/BillClient";
function App() {
  return (
    <Router>
      <Layout>
      <div className="App">
        <Routes>  
          <Route path="/Stock" element={<Stock/>} />
           <Route path="/Facture" element={<Facture/>} />
           <Route path="/Clients" element={<Client/>} />
           <Route path="/DemandeFacture" element={<DemandBill/>} />
           <Route path="/" element={<SignIn/>}/>
           <Route path="/Client/Facture" element={<BillClient/>} />

        </Routes>
      </div>
      </Layout>
    </Router>


    
  );
}

export default App;
