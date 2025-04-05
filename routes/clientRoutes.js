const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middlewares/auth');

router.post('/', auth, clientController.create);
router.get('/', auth, clientController.getAll);
router.get('/:id', auth, clientController.getById);
router.put('/:id', auth, clientController.update);
router.delete('/:id', auth, clientController.remove);

module.exports = router;
