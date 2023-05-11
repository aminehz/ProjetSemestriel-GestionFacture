import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {IoIosAddCircle} from "react-icons/io";
import {BsFillTrashFill} from "react-icons/bs";
import {GrUpdate} from "react-icons/gr";
import Footer from '../layouts/Footer';
import NavBar from '../layouts/NavBar';


const Stock= () =>{
const [stock,setStock]=useState([]);
const [productName, setProductName] = useState('');
const [productQuantity, setProductQuantity] = useState('');
const [productPrice, setProductPrice] = useState('');
const [product,setProduct]=useState('');
const [show,setShow]=useState(false);
const [showUpdate,setShowUpdate]=useState(false);
const handleCloseUpdate= () => setShowUpdate(false);
const handleShowUpdate=() => setShowUpdate(true);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


useEffect(()=>{
axios.get('http://localhost:3000/getProducts')
.then(response=>{
    setStock(response.data);
})
.catch(error => {
    console.log(error);
});
},[]);

const deleteProduct = (productId,e) =>{
    e.preventDefault();
    
    console.log("product id ",productId);
    axios.delete(`http://localhost:3000/deleteProduct/${productId}`)
    .then((response) => console.log(response))
    .then(()=>{
        window.location.reload();
    })
    .catch(error=> {
        console.log(error);
    });
}

const addProduct=(e)=>{
    e.preventDefault();
    setShow(false);
const newProduct={productName:productName,productPrice:productPrice,productQuantity:productQuantity};
    axios.post('http://localhost:3000/addProduct',newProduct)
    .then((response)=> console.log(response.data))
    .then(window.alert('Product Added'))
    .then(()=>{
        window.location.reload();
    })
    .catch(error =>{
        if(error.response.status === 500) {
            window.alert('the name should be unique');
        }
    });
}

const updateProduct=(e) => {
    e.preventDefault();

    const upProduct={productName:productName,productPrice:productPrice,productQuantity:productQuantity};
    axios.put(`http://localhost:3000/updateProduct/${product}`,upProduct)
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
     <div className='container-fluid'>
       <div className="row">
       <div className="col-md-2">
            <NavBar />
          </div>
          <div className="col-md-9 mt-5">
       <div className='card stockCard'>
        <div className='card-header bg-dark text-white stockCard'>
          Product List
        </div>
        <div className='card-body '>
          <table className='table'>
            <thead>
              <tr>
                <th>Product Name</th>
               
                <th>Product Quantity</th>
                <th>Product Price</th>
                <th>Action</th>
                <th><button type='button' className='btn bg-transparent' onClick={handleShow}><IoIosAddCircle style={{width:'50px',height:'35px'}}/></button></th>
              </tr>
            </thead>
            <tbody>
                    {stock.map((product)=>(
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div
                              class="d-flex flex-column justify-content-center"
                            >
                              <h6 class="mb-0 text-sm">{product.productName}</h6>
                              
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{product.productQuantity}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <p>{product.productPrice}</p>
                        </td>
                        <td class="align-middle d-flex justify-content-center align-item-center">
                        <button type="submit" class="btn bg-transparent" onClick={() => {handleShowUpdate();setProduct(product._id);setProductName(product.productName);setProductPrice(product.productPrice);setProductQuantity(product.productQuantity)}}><GrUpdate className='StockIcon'/></button>
                        <form onSubmit={deleteProduct}>    
                         <button type="button" class="btn bg-transparent" onClick={(e) => deleteProduct(product._id,e)} ><BsFillTrashFill className='StockIcon'/></button>
                         </form>
                        </td>
                      </tr>
                    ))}
                    </tbody>
          </table>
        </div>
      </div>
      <Footer/>
      </div>
      </div>
      </div>

      <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={updateProduct}>
       <div className='form-group'>
           <label>Product Name</label>
           <input type="text" className='form-control' id="productName" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
       </div>
       <div className='form-group'>
           <label>Product Price</label>
           <input type="text" className='form-control' id="productPrice" placeholder='Product Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
       </div>
       <div className='form-group'>
           <label>Product Quantity</label>
           <input type="text" className='form-control' id="productQuantity" placeholder='Product Quantity' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
       </div>

   </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button type='submit' variant="success"  onClick={updateProduct}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={addProduct}>
       <div className='form-group'>
           <label>Product Name</label>
           <input type="text" className='form-control' id="productName" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
       </div>
       <div className='form-group'>
           <label>Product Price</label>
           <input type="text" className='form-control' id="productPrice" placeholder='Product Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
       </div>
       <div className='form-group'>
           <label>Product Quantity</label>
           <input type="text" className='form-control' id="productQuantity" placeholder='Product Quantity' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
       </div>
   
   </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={addProduct}>
            Add 
          </Button>
        </Modal.Footer>
      </Modal>


</div> 
);

};
export default Stock;