// backend/server.js
require('dotenv').config(); // Загружаем переменные окружения

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Импорты маршрутов
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Порт для запуска
const PORT = process.env.PORT || 3001;

// Запуск сервера и подключение к БД
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  } catch (err) {
    console.error('❌ Ошибка подключения к MongoDB или запуске сервера:', err);
    process.exit(1);
  }
}

start();
