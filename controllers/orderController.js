const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const items = user.cart.map(i => ({
    product: i.product,
    quantity: i.quantity,
    price: i.product.price
  }));
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = await Order.create({
    user: user._id, items, total, status: 'new'
  });
  // очищаем корзину
  user.cart = [];
  await user.save();
  res.json({ orderId: order._id, total });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).populate('items.product');
  res.json(orders);
};
