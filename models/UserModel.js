var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plm = require('passport-local-mongoose')

var UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.plugin(plm);

var User = mongoose.model("User", UserSchema);

module.exports = User;