const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jsonParser = bodyParser.json();
const {recipe} = require('../models/smoothieModel');

mongoose.Promise = global.Promise;

router.use(bodyParser.json());

// get recipes if they have been created yet
router.get('/', (req, res) => {
  recipe.find()
    .then(recipes => {
      res.json(recipes.map(recipe => recipe.serialize()));
    });
});

router.get('/:id', (req, res) => {
  recipe
    .findById(req.params.id)
    .then(recipe => res.json(recipe.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});

// create new recipe
router.post('/', (req, res) => {
  const requiredFields = ['title', 'ingredients'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  recipe.create({
    title: req.body.title,
    ingredients: req.body.ingredients
  })
  .then(recipe => res.status(201).json(recipe.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong'});
  });
});

// update recipe
router.put('/:id', (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id value must match'
    });
  }
  const updated = {};
  const updateableFields = ['title', 'ingredients'];
  updateableFields.forEach(field => {
    if(field in req.body) {
      updated[field] = req.body[field];
    }
  });
  recipe.findByIdAndUpdate(req.params.id, {$set: updated}, {
    new: true})
    .then(updatedRecipe => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

// delete recipe
router.delete('/:id', (req, res) => {
  recipe.findByIdAndRemove(req.params.id)
        .then(() => {
          res.status(204).json({message:'success'});
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({error: 'something went wrong'});
        });
});


module.exports = router;