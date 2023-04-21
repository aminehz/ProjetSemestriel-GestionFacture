const mongoose = require('mongoose');

itemSchema= new mongoose.Schema({
  itemDescription:String,
  itemQuantity:Number,
  itemPrice:Number
});


const billSchema = new mongoose.Schema({
    items:[itemSchema],
  totalPrice:{
    type: Number,
    required:true,
  },
  
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;