const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const auth = require('../middlewares/auth');

router.post('/', auth, saleController.create);
router.get('/', auth, saleController.getAll);

module.exports = router;
