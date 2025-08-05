const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Заполните все поля' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Неверные данные' });
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
  res.json({ token });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('name email');
  res.json({ user });
};
