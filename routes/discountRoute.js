const router = require('express').Router();
const discountController = require('../controllers/discountController.js')

router.post('/addDiscount', discountController.addDiscount);
router.get('/getAllDiscounts', discountController.getAllDiscounts);
router.get('/getAllActiveDiscounts', discountController.activeDiscounts);
router.get('/:id', discountController.getOneDiscount);
router.put('/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);

module.exports = router;