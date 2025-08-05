const express = require('express');
const router = express.Router();
const Favorites = require('../models/Favorites');
const auth = require('../middleware/auth'); // middleware для JWT

// Получить избранное
router.get('/', auth, async (req, res) => {
  const fav = await Favorites.findOne({ userId: req.user.id }) || { products: [] };
  res.json({ products: fav.products });
});

// Добавить товар в избранное
router.post('/add', auth, async (req, res) => {
  const { _id } = req.body; // id товара
  let fav = await Favorites.findOne({ userId: req.user.id });

  if (!fav) {
    fav = new Favorites({ userId: req.user.id, products: [] });
  }

  if (!fav.products.find(pid => pid.toString() === _id)) {
    fav.products.push(_id);
  }

  await fav.save();
  res.json({ products: fav.products });
});

// Удалить товар из избранного
router.delete('/remove/:id', auth, async (req, res) => {
  const fav = await Favorites.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: req.params.id } },
    { new: true }
  );
  res.json({ products: fav ? fav.products : [] });
});

module.exports = router;
