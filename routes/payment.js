const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

router.post('/payment/init', auth, controller.initPayment);
router.post('/payment/webhook', controller.handleWebhook);

module.exports = router;
