const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true,
    },
    productQuantity:{
        type:String,
        required:true,
    },
    productPrice:{
        type:String,
        required:true,
    },
});
const Product=mongoose.model('Product',productSchema);
module.exports= Product;

