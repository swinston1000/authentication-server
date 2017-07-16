var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  name: String,
  text: String
});

var beerSchema = new Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: [Number],
  reviews: [reviewSchema]
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;