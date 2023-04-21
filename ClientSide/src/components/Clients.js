import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {IoIosAddCircle} from "react-icons/io";
import {BsFillTrashFill} from "react-icons/bs";
import {GrUpdate} from "react-icons/gr";

const Client = () =>{
  const [client,setclient]=useState([]);
  const [clientEmail, setclientEmail] = useState('');
  const [clientPassword, setclientPassword] = useState('');
  const [clientFacture, setclientFacture] = useState('');
  const [clientD,setClientD]=useState('');
  const [show,setShow]=useState(false);
  const [showUpdate,setShowUpdate]=useState(false);
  const handleCloseUpdate= () => setShowUpdate(false);
  const handleShowUpdate=() => setShowUpdate(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  useEffect(()=>{
  axios.get('http://localhost:3000/getClients/641d833d392df9f58456d53a')
  .then(response=>{
      setclient(response.data);
  })
  .catch(error => {
      console.log(error);
  });
  },[]);
  
  const deleteClient = (clientId,e) =>{
      e.preventDefault();
      
      console.log("product id ",clientId);
      axios.delete(`http://localhost:3000/deleteClient/641d833d392df9f58456d53a/${clientId}`)
      .then((response) => console.log(response))
      .then(()=>{
          window.location.reload();
      })
      .catch(error=> {
          console.log(error);
      });
  }
  
  const addClient=(e)=>{
      e.preventDefault();
      setShow(false);
  const newClient={email:clientEmail,password:clientPassword};
      axios.post('http://localhost:3000/createClient/641d833d392df9f58456d53a',newClient)
      .then((response)=> console.log(response.data))
      .then(window.alert('Client Added'))
      .then(()=>{
          window.location.reload();
      })
      .catch(error =>{
          if(error.response.status === 500) {
              window.alert('the name should be unique');
          }
      });
  }
  
  const updateClient=(e) => {
      e.preventDefault();
  
      const upClient={email:clientEmail,password:clientPassword};
      axios.put(`http://localhost:3000/updateClient/641d833d392df9f58456d53a/${clientD}`,upClient)
      .then((response)=>{
          console.log(response.data);
          handleCloseUpdate();
      })
      .then(window.alert('Product Updated'))
      .then(()=>{
          window.location.reload(); 
      })
      .catch((error)=>{
          console.log(error);
      });
  }
  
  return (
      <div className="">
        <div className='card stockCard'>
        
          <div className='card-header bg-dark text-white stockCard'>
            Client List
          </div>
          <div className='card-body '>
            <table className='table'>
              <thead>
                <tr>
                  <th>Client Email</th>
                 
                  <th>Client password</th>
                  <th>Facture</th>
                  <th>Action</th>
                  <th><button type='button' className='btn bg-transparent ' onClick={handleShow}><IoIosAddCircle style={{width:'50px',height:'35px'}}/></button></th>
                </tr>
              </thead>
              <tbody>
                      {client.map((client)=>(
                        <tr>
                          <td>
                            <div class="d-flex px-2 py-1">
                              <div
                                class="d-flex flex-column justify-content-center"
                              >
                                <h6 class="mb-0 text-sm">{client.email}</h6>
                                
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">{client.password}</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <p>{client.bills}</p>
                          </td>
                          <td class="align-middle d-flex justify-content-center align-item-center">
                          <button type="submit" class="btn bg-transparent" onClick={() => {handleShowUpdate();setClientD(client._id);setclientEmail(client.email);setclientFacture(client.bills);setclientPassword(client.password)}}><GrUpdate className='StockIcon'/></button>
                          <form onSubmit={deleteClient}>    
                           <button type="button" class="btn bg-transparent" onClick={(e) => deleteClient(client._id,e)} ><BsFillTrashFill className='StockIcon'/></button>
                           </form>
                          </td>
                        </tr>
                      ))}
                      </tbody>
            </table>
          </div>
        </div>
  
  
  
        <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={updateClient}>
         <div className='form-group'>
             <label>Client Email</label>
             <input type="text" className='form-control' id="clientEmail" placeholder='Client email' value={clientEmail} onChange={(e) => setclientEmail(e.target.value)} />
         </div>
         <div className='form-group'>
             <label>Client Password</label>
             <input type="text" className='form-control' id="clientPassword" placeholder=' Client password' value={clientPassword} onChange={(e) => setclientPassword(e.target.value)} />
         </div>
  
     </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button type='submit' variant="success"  onClick={updateClient}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
  
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={addClient}>
         <div className='form-group'>
             <label>Client Email</label>
             <input type="text" className='form-control' id="clientEmail" placeholder='Client Email' value={clientEmail} onChange={(e) => setclientEmail(e.target.value)} />
         </div>
         <div className='form-group'>
             <label>Client Password</label>
             <input type="text" className='form-control' id="clientPassword" placeholder='Client Password' value={clientPassword} onChange={(e) => setclientPassword(e.target.value)} />
         </div>
     
     </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary" onClick={addClient}>
              Add 
            </Button>
          </Modal.Footer>
        </Modal>
  
  
  </div> 
  );
  
};
export default Client;