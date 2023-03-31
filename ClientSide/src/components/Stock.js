import React,{useState,useEffect} from 'react';
import axios from 'axios';
const Stock= () =>{
const [stock,setStock]=useState([]);
const [productId,setProductId]=useState('');
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
    .catch(error=> {
        console.log(error);
    });




}

return (
    <div className="stock">
        <button type='button' className='btn btn-secondary' id='addProductBtn'><div className='w-100'>Add Product</div></button>
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
                {stock.map(product=>(
                    <tr>
                    <th scope="row">{product.productName}</th>
                    <th scope="row">{product.productQuantity}</th>
                    <th scope="row">{product.productPrice}</th>

                    <th scope='row'>
                          
                          <button type="submit" class="btn btn-outline-success m-2" >Update</button>
                        <form onSubmit={deleteProduct}>
                             
                        <button type="button" class="btn btn-outline-danger m-2" onClick={(e) => deleteProduct(product._id,e)} >Delete</button>
                        </form>
                        
                    </th>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
);

};
export default Stock;