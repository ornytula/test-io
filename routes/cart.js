const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth'); // middleware для JWT

// Получить корзину
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }) || { items: [] };
  res.json({ items: cart.items });
});

// Добавить товар
router.post('/add', auth, async (req, res) => {
  const { _id, name, price } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  const index = cart.items.findIndex(i => i.productId === _id);
  if (index >= 0) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({ productId: _id, name, price, quantity: 1 });
  }

  await cart.save();
  res.json({ items: cart.items });
});

// Удалить товар
router.delete('/remove/:id', auth, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { items: { productId: req.params.id } } },
    { new: true }
  );
  res.json({ items: cart ? cart.items : [] });
});

module.exports = router;
