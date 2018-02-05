const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const smoothieSchema = mongoose.Schema({
  title: {type: String, required: true},
  ingredients: {type: Array, required: true},
  created: {type: Date, default: Date.now}
});

smoothieSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    ingredients: this.ingredients,
    created: this.created
  };
};

const recipe = mongoose.model('recipe', smoothieSchema);

module.exports = {recipe};
