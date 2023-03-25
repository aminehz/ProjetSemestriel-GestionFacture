const {Router} =require('express');
const clientController=require('../controllers/clientController');
const supplierController=require('../controllers/supplierController');
const loginController=require('../controllers/loginController');

const router=Router();
/*client Routes*/
router.get('/getClients/:supplierId',clientController.getClients);
router.post('/createClient/:supplierId',clientController.createClient);
router.put('/updateClient/:supplierId/:clientId',clientController.updateClient);
router.delete('/deleteClient/:supplierId/:clientId',clientController.deleteClient);
/***** */

/*Supplier Routes*/
router.post('/createSupplier',supplierController.createSupplier);
router.get('/getSupplier',supplierController.getSuppliers);
router.post('/updateSupplier',supplierController.updateSupplier);
router.delete('/deleteSupplier',supplierController.deleteSupplier);
router.post('/newBill/:clientId',supplierController.createBill);
router.get('/getBills/:clientId',supplierController.getBills);
router.get('/deleteBill/:billId',supplierController.deleteBill);
router.post('/addProduct',supplierController.addProduct);
router.put('/updateProduct/:productId',supplierController.updateProduct);
router.delete('/deleteProduct/:productId',supplierController.deleteProduct);
router.get('/getProducts',supplierController.getProducts);
/***** */

/**LogIn */
router.post('/login',loginController.login);
/***** */


module.exports=router;