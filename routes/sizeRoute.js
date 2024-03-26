const router = require('express').Router();
const sizeController = require('../controllers/sizesController.js')

router.post('/addSize', sizeController.addsize);
router.get('/getAllSizes', sizeController.getAllsizes);
router.get('/:id', sizeController.getOnesize);
router.put('/:id', sizeController.updatesize);
router.delete('/:id', sizeController.deletesize);

module.exports = router;