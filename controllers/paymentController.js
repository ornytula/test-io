const axios = require('axios');
const Order = require('../models/Order');
const { paykentaToken } = require('../config/config');

exports.initPayment = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  const resp = await axios.post('https://api.paykenta.ru/init', {
    amount: order.total,
    order_id: order._id,
    // ... остальное по API Paykenta
  }, {
    headers: { Authorization: `Bearer ${paykentaToken}` }
  });
  order.paymentId = resp.data.payment_id;
  await order.save();
  res.json({ payment_url: resp.data.payment_url });
};

exports.handleWebhook = async (req, res) => {
  const { order_id, status } = req.body;
  await Order.findByIdAndUpdate(order_id, { status });
  res.json({ ok: true });
};
