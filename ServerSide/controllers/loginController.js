const {Client,Supplier}= require('../models/User');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const supplier = await Supplier.findOne({ email, password });
    const client = await Client.findOne({ email, password });
  
    if (supplier) {
      req.user = { type: 'supplier', id: supplier._id };
     
      return res.json({ message:'supplier has loggedin' });
    } else if (client) {
      req.user = { type: 'client', id: client._id };
      
      return res.json({ message:'client has loggedin' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  };
  