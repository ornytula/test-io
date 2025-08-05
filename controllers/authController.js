const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Все поля обязательны' });
  if (await User.findOne({ email })) return res.status(409).json({ error: 'Email уже используется' });

  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Неверный логин или пароль' });

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);
  res.json({ token });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json({ user });
};
