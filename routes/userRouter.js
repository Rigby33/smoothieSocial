const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

let token;

const {user} = require('../models/userModel');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const requiredFields = ['username', 'password'];
  for (let i =0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      return res.status(422).json({
        code:422,
        reason: 'ValidationError',
        message: 'Missing Field',
        location: field
      });
    }
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonStringField = explicityTrimmedFields.find(field => req.body[field].trim() !== req.body[field]);
    if(nonStringField) {
      const message = `${nonStringField} cannot start or end with whitespace`;
      return res.status(422).json({
        code: 422,
        reasons: 'ValidationError',
        message: message,
        location: nonStringField
      });
    }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min
  );

  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max
  );

  if(tooSmallField || tooLargeField) {
    const message = tooSmallField ? `${tooSmallField} must be at least ${sizedFields[tooSmallField].min} characters long` : `${tooLargeField} must be at most ${sizedFields[tooLargeField].max}`;
    return res.status(422).json({
      code: 422,
      reasons: 'ValidationError',
      message: message,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = ''} = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();

  return user.find({username})
  .count()
  .then(count => {
    if (count > 0) {
      return Promise.reject({
        code: 422,
        reason: 'ValidationError',
        message: 'Username already taken',
        location: 'username'
      });
    }
      return user.hashPassword(password);
  })
  .then(hash => {
    return user.create({
      username,
      password: hash,
      firstName,
      lastName
    });
  })
  .then(user => {
    return res.status(201).json(user.serialize());
  })
  .catch(err => {
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err.message);
    }
    res.status(500).json({code: 500, message: 'Internal server error'});
  });
});

router.post('/login', (req, res) => {
  console.log('loggin in');
  user.findOne({
    username: req.body.username
  }).then(loggingInUser => {
    if(!loggingInUser) {
      res.send('Username not found').status(500);
      return;
    }
    bcrypt.compare(req.body.password, loggingInUser.password).then((match) => {
      if(!match) {
        res.send('Password is incorrect').status(500);
        return;
      }
      let userInfo = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }
      token = jwt.sign(userInfo, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY, algorithm: 'HS256'});
      res.status(200).json({
        message: `${loggingInUser.username} successfully logged in`,
        userId: loggingInUser._id,
        token: token
      });
    }); 
  }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  });

module.exports = router;