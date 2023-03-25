const mongoose=require('mongoose');
const {isEmail} = require('validator');
const clientSchema = new mongoose.Schema({
    email:{
        type:String,
        requied:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    bills:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bill'
    }]
});
const supplierSchema=new mongoose.Schema({
    email:{
        type:String,
        requied:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    clients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        }
    ]
});


const Supplier=mongoose.model('Supplier',supplierSchema);
const Client=mongoose.model('Client',clientSchema);
module.exports={Supplier,Client};