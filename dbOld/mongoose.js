const mongoose = require('mongoose');
const icons = require('../src/assets/icons.js');

const url = 'mongodb://localhost:27017/etsy';

mongoose.connect(process.env.MONGO_URL || url, { useNewUrlParser: true });
const randomIndex = () => Math.floor(Math.random() * icons.length);

const reviewSchema = new mongoose.Schema({
  author: {
    name: String,
    photo: { type: String, default: icons[randomIndex()] },
  },
  rating: Number,
  purchased: Boolean,
  body: String,
  photo: String,
  prodId: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  prodId: String,
  image: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Reviews: mongoose.model('Review', reviewSchema),
  db: mongoose,
  Products: Product,
};
