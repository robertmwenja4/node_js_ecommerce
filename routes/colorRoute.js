const router = require('express').Router();
const colorController = require('../controllers/colorsController.js')

router.post('/addColor', colorController.addColor);
router.get('/getAllColors', colorController.getAllColors);
router.get('/:id', colorController.getOneColor);
router.put('/:id', colorController.updateColor);
router.delete('/:id', colorController.deleteColor);

module.exports = router;