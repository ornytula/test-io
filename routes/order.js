const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.post('/order', auth, controller.createOrder);
router.get('/orders', auth, controller.getOrders);

module.exports = router;
