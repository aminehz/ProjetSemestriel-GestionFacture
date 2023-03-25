const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    itemDescription:{
        type:String,
        required:true,
    },
  itemQuantity: {
    type: String,
    required: true,
  },
  itemPrice:{
    type: String,
    required:true,
  },
  totalPrice:{
    type: mongoose.Schema.Types.Decimal128,
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