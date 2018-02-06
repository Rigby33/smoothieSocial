const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName
  };
};

userSchema.statics.hasPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const user = mongoose.model('user', userSchema);

module.exports = {user};
