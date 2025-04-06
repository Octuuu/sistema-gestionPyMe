const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.post('/', auth, productController.create);
router.get('/', auth, productController.getAll);
router.get('/:id', auth, productController.getById);
router.put('/:id', auth, productController.update);
router.delete('/:id', auth, productController.remove);

module.exports = router;
