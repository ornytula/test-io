const User = require('../models/User');

exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.userId).populate('cart.product');
  res.json({ items: user.cart });
};

exports.addToCart = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const { productId, quantity } = req.body;
  const idx = user.cart.findIndex(i => i.product.equals(productId));
  if (idx >= 0) user.cart[idx].quantity += quantity || 1;
  else user.cart.push({ product: productId, quantity: quantity || 1 });
  await user.save();
  await user.populate('cart.product');
  res.json({ items: user.cart });
};

exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.cart = user.cart.filter(i => !i.product.equals(req.params.id));
  await user.save();
  await user.populate('cart.product');
  res.json({ items: user.cart });
};
