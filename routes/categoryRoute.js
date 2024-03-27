const router = require('express').Router();
const categoryController = require('../controllers/categoryController.js')

router.post('/addCategory', categoryController.addCategory);
router.get('/getAllCategories', categoryController.getAllCategorys);
router.get('/:id', categoryController.getOneCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;