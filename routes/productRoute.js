const router = require('express').Router();
const productController = require('../controllers/productsController.js')

router.post('/addProduct', productController.addProduct);
router.get('/getProducts', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;