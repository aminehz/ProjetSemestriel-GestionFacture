const {Supplier,Client} = require('../models/User');
const Bill = require('../models/Bill');
const Product=require('../models/Product');

module.exports.createSupplier= async(req,res) =>{
const {email,password} = req.body;
const supplier=new Supplier({email,password});
await supplier.save();
res.status(201).json(supplier);
};

module.exports.getSuppliers = async (req,res) =>{
const supplier=await Supplier.find().populate('Clients');
res.json(suppliers);
};

module.exports.getSupplierById=async(req,res) =>{
const id=req.params;
const supplier=await Supplier.findById(id).populate('clients');
res.json(supplier);
};

module.exports.updateSupplier=async(req,res) =>{
const id=req.params;
const {email,password}=req.body;
const supplier = await Supplier.findByIdAndUpdate(
id,
{email,password},
{new:true}
);
res.json(supplier);
};

module.exports.deleteSupplier= async (req,res) =>{
const id=req.params;
await Supplier.findByIdAndDelete(id);
res.status(204).end();
};


module.exports.createBill = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { items } = req.body; 
  
      if (!Array.isArray(items)) {
        return res.status(400).json({ message: 'Invalid items' });
      }
  
      const client = await Client.findById(clientId);
  
      const totalItemsPrice = items.reduce((acc, item) => acc + item.itemQuantity * item.itemPrice, 0);
      const newBill = new Bill({
        items: items.map((item) => ({
          itemDescription: item.itemDescription,
          itemQuantity: item.itemQuantity,
          itemPrice: item.itemPrice
        })),
        totalPrice: totalItemsPrice,
        client: client._id
      });
  
      client.bills.push(newBill);
      await Promise.all([newBill.save(), client.save()]);
      res.status(201).json(newBill);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

module.exports.getBills= async(req,res) =>{
    try{
        const {clientId}=req.params;
        const client= await Client.findById(clientId).populate('bills');
        if(!client){
            return res.status(404).json({message:"Client not found"});
        }
        const bills=client.bills.map(bill =>{
            return{
                billId:bill._id,
                email:client.email,
                itemDescription:bill.itemDescription,
                itemQuantity:bill.itemQuantity,
                itemPrice:bill.itemPrice,
                totalPrice:bill.totalPrice,
                clientId:client._id
            };
        });
        res.json(bills);

    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server Error'});
    }
}

module.exports.deleteBill=async(req,res) =>{
    const billId=req.params.billId;
    
   try{
    const bill= await Bill.findById(billId);
    if(!bill){
        return res.status(404).json({error:'Bill not found'});
    }
    await Bill.deleteOne({ _id: billId });
    res.json({message:"Bill has been deleted "});
   }catch(error){
    console.error(error);
    res.status(500).json({message:'Server Error'});
   }
}


module.exports.addProduct=async(req,res) =>{
    const {productName,productPrice,productQuantity}=req.body;
    const product=new Product({productName,productPrice,productQuantity});
    try{
    await product.save();
    res.status(201).json(product);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"the name should be unique"});
    }
}
module.exports.updateProduct=async(req,res) => {
    const productId=req.params.productId;
    const {productName,productPrice,productQuantity}=req.body;
    try{

    
    const product=await Product.findByIdAndUpdate(
        productId,
        {productName,productPrice,productQuantity},
        {new:true}
    );
    res.json(product);
    }
    catch(error){
        console.error(error);
    }
}

module.exports.deleteProduct=async(req,res) =>{
    const productId=req.params.productId;
    try{
        const product=await Product.findByIdAndDelete(productId);
        res.json({message:"Product deleted"});
    }catch(error){
        console.error(error);
    }
}

module.exports.getProducts=async(req,res) => {
    try{

    const products=await Product.find();
    res.json(products);
    }catch(err){
        console.error(err);
    }
}