import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    <div className="stock">
        <button type='button' className='btn btn-secondary' onClick={handleShow}  id='addProductBtn' ><div className='w-100'>Add Product</div></button>
        <table className=" container mt-3 table table-bordered border-dark" id="stockTable">
            <thead className="table-secondary">
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Quantity</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((product)=>(
                    <tr>
                    <th scope="row">{product.productName}</th>
                    <th scope="row">{product.productQuantity}</th>
                    <th scope="row">{product.productPrice}</th>

                    <th scope='row'>
                          
                          <button type="submit" class="btn btn-outline-success m-2" onClick={() => {handleShowUpdate();setProduct(product._id);setProductName(product.productName);setProductPrice(product.productPrice);setProductQuantity(product.productQuantity)}}>Update</button>
                         
                          
                        <form onSubmit={deleteProduct}>    
                        <button type="button" class="btn btn-outline-danger m-2" onClick={(e) => deleteProduct(product._id,e)} >Delete</button>
                        </form>
                        
                    </th>
                </tr>
                ))}
                
            </tbody>
        </table>

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
          <Button type='submit' variant="success" onClick={updateProduct}>
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