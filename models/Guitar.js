const { Schema, model } = require('mongoose');

const guitarSchema = new Schema({
  name:             { type: String, required: true },
  brand:            { type: String, required: true },
  bodyShape:        { type: String, required: true },
  color:            { type: String, required: true },
  pickups:          { type: String, required: true },
  gigbagIncluded:   { type: Boolean, default: false },
  price:            { type: Number, required: true },
  rating:           { type: Number, default: 0 },
  imagePreview:     { type: String, required: true },
  shortDescription: { type: String, required: true },
  description:      { type: String }          // полный текст
}, { collection: 'electric_guitars' });

module.exports = model('Guitar', guitarSchema);
