const router = require('express').Router();
const orderController = require('../controllers/ordersController.js')

router.post('/createOrder', orderController.createOrder);
router.get('/getAllOrders', orderController.getAllOrders);
router.get('/:id', orderController.getOneOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;