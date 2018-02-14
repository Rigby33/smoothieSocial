const mongoose = require('mongoose');
const {user} = require('../models/userModel');
mongoose.Promise = global.Promise;

const smoothieSchema = mongoose.Schema({
  title: {type: String, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'user'},
  ingredients: {type: Array, required: true},
  created: {type: Date, default: Date.now},
});

smoothieSchema.methods.serialize = function() {
  return {
    id: this._id,
    userId: this.userId,
    title: this.title,
    ingredients: this.ingredients,
    created: this.created
  };
};

const recipe = mongoose.model('recipe', smoothieSchema);

module.exports = {recipe};
