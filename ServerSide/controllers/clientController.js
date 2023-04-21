const {Client,Supplier}= require('../models/User');

module.exports.createClient=async(req,res)=>{
    const { email,password } = req.body;
    const { supplierId } = req.params;
    const client = new Client({ email,password });
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      
      return res.status(404).json({ message: 'Supplier not found' });
    }
    supplier.clients.push(client);
    await Promise.all([client.save(), supplier.save()]);
    res.status(201).json(client);
};

module.exports.getClients=async(req,res)=>{
    const { supplierId } = req.params;
    const supplier = await Supplier.findById(supplierId).populate('clients');
    res.json(supplier.clients);
};



module.exports.updateClient = async (req, res) => {
  const { supplierId, clientId } = req.params;
  const { email, password } = req.body;

  try {
    const supplier = await Supplier.findById(supplierId).populate('clients');
    
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    const client = supplier.clients.find(c => c._id.toString() === clientId);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    client.email = email;
    client.password = password;
    
    await supplier.save();
    
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports.deleteClient=async(req,res)=>{
    const { supplierId, clientId } = req.params;
    const supplier = await Supplier.findById(supplierId).populate('clients');
    supplier.clients=supplier.clients.filter(client=> client._id !=clientId);
   
    try {
      
      await supplier.save();
      res.json({ message: 'Client deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

