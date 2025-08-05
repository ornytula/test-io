const mongoose = require('mongoose');

const CartItem = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Cart', new mongoose.Schema({
  userId: String,
  items: [CartItem],
}));
