// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },           // внешний ID, напр. "lp002"
  name: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },

  bodyShape: String,
  neckJoint: String,
  color: String,
  pickups: String,
  caseIncluded: { type: String, enum: ['Да', 'Нет'] },
  gigbagIncluded: { type: String, enum: ['Да', 'Нет'] },

  imagePreview: String,
  galleryImages: [String],
  audioDemo: String,
  videoDemos: [String],

  category: { type: String }, // например "electric_guitars"

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
