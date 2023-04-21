import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Facture = () => {
  const [items, setItems] = useState([{ itemDescription: '', itemQuantity: '', itemPrice:0 }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ productName: '', productPrice: 0 });
  const [clientList, setClientList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/getProducts');
      setProductList(response.data);
      console.log(productList);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get('http://localhost:3000/getClients/641d833d392df9f58456d53a');
      setClientList(response.data);
      console.log(clientList);
    };
    fetchClients();
  }, []);

  const handleClientChange = (event) => {
    setSelectedClientId(event.target.value);
  };

  const handleItemChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  
    const newTotalPrice = newItems.reduce((total, item) => total + item.itemQuantity * item.itemPrice, 0);
    setTotalPrice(newTotalPrice);
  };
  

  const handleAddItem = () => {
    setItems([...items, { itemDescription: '', itemQuantity: '', itemPrice: 0 }]);
  };

  const handleProductChange = (index, event) => {
    const selectedProduct = productList.find(product => product.productName === event.target.value);
    const newItems = [...items];
    newItems[index] = { itemDescription: selectedProduct.productName, itemQuantity: newItems[index].itemQuantity, itemPrice: selectedProduct.productPrice };
    setItems(newItems);
    setSelectedProduct(selectedProduct);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/newBill/${selectedClientId}`, { items, totalPrice });
      console.log(response.data);
     
    } catch (error) {
      console.error(error);
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Client:
            <select value={selectedClientId} onChange={handleClientChange}>
                <option value="">choisir le client</option>
                {clientList.map((client)=>(
                    <option key={client._id} value={client._id}>{client.email}</option>
                ))}
            </select>
        </label>
      {items.map((item, index) => (
        <div key={index}>
          <label>
            Product:
            <select value={item.itemDescription} onChange={(event) => { handleProductChange(index,event);  }}>
              <option value="">Select a product</option>
              {productList.map(product => (
                <option key={product._id} value={product.productName}>{product.productName}</option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input type="number" name="itemQuantity" value={item.itemQuantity} onChange={(event) => handleItemChange(index, event)} />
          </label>
          <label>
            Price:
            <input type="number" step="0.01" name="itemPrice" value={item.itemPrice} readOnly />

          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add item</button>
      <label>
        Total price:
        <input type="number" step="0.01" value={totalPrice} onChange={(event) => setTotalPrice(event.target.value)} />
      </label>
      <button type="submit">Create bill</button>
    </form>
  );
};

export default Facture;
