import {MdInventory} from "react-icons/md";
import { Link } from "react-router-dom";
import {RiBillLine} from "react-icons/ri";
import {BiArchiveIn} from "react-icons/bi";
import {BsPersonAdd} from "react-icons/bs";
import {FaClipboardList} from "react-icons/fa";

const NavBar = () => {
  return (
    <div>
      <div className="card navPosition">
        <div
          className="card-header bg-dark text-white vh-100"
          
        >
            <div className="d-flex justify-content-center align-item-center">
            <h3>Dashboard</h3>
            </div>
          <ul style={{ listStyle: "none" }} className="d-flex flex-column justify-content-center navList">
            <li className="nav-item p-3">
              
            <Link to="/Stock">
            <button type="boutton" className="btn bg-transparent text-white " ><MdInventory  className="NavIcon"/> Stock </button>
            </Link>  
             
            </li>

            <li className="nav-item p-3">
                <Link to="/Facture">
                    <button type="button" className="btn bg-transparent text-white">
                    <RiBillLine className="NavIcon" /> Facture
                    </button>
                </Link>
                
            </li>

            <li className="nav-item p-3 ">

                <Link to="/Archive">
                <button type="button" className="btn bg-transparent text-white">
                <BiArchiveIn className="NavIcon" /> Archive
                </button>
                </Link>
            </li>

            <li className="nav-item p-3">
                <Link to="/Clients">
                <button type="button" className="btn bg-transparent text-white">
                <BsPersonAdd className="NavIcon" /> Client
                </button>
                </Link>
            </li>

            <li className="nav-item p-3">
             <Link to="/DemandeFacture">
             <button type="button" className="btn bg-transparent text-white">
                <FaClipboardList className="NavIcon" /> Demande
                </button>
             </Link>
                
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
