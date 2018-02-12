const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const {app, runServer, closeServer} = require('../server');
const {user} = require('../models/userModel');
const {recipe} = require('../models/smoothieModel');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
let token;
let userId;

describe('smoothieSocial API resources', function() {
  const username = 'testingusername';
  const password = 'testingpassword';
  const firstName = 'first';
  const lastName = 'last';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return user.hashPassword(password)
      .then(password => 
        user.create({
        username,
        password,
        firstName,
        lastName
      }));
  });

  afterEach(function() {
    return user.remove({username: username});
  });

  describe('Valid User', function () {
    it('Should return a valid token', function () {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          token = res.body.token;
          userId = res.body.userId;
          expect(token).to.be.a('string');
        });
      });
  });

  describe('GET endpoints', function () {
    it('Should get data from smoothies endpoint', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          token = res.body.token;
          userId = res.body.userId;
          return chai
            .request(app)
            .get('/smoothies')
            .set('authorization', token)
            .then(res => {
              expect(res).to.have.status(200);
            });
          });
      });

    it('Should get recipes created by specific user', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          token = res.body.token;
          userId = res.body.userId;
          return chai
            .request(app)
            .get(`/smoothies/${userId}`)
            .set('authorization', token)
            .then(res => {
              expect(res).to.have.status(200);
            });
          });
      });
  });

  describe('PUT and POST endpoints', function () {
    it('Should post data on smoothies endpoint', function() {
      let newRecipe = {
        title: 'New Recipe',
        ingredients: ['thing', 'thing 2', 'thing 3'],
        userId: userId
      }

      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          token = res.body.token;
          userId = res.body.userId;
          return chai
            .request(app)
            .post('/smoothies')
            .set('authorization', token)
            .send(newRecipe)
            .then(res => {
              expect(res).to.have.status(201);
            });
          });
      });

    it('Should update a recipe based on recipe id', function() {
    return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          token = res.body.token;
          userId = res.body.userId;
          return recipe.findOne()
            .then(recipe => {
              let updateData = {
                title: 'new title',
                ingredients: ['new', 'new', 'new'],
                id: recipe._id
              };
              updateData._id = recipe._id;

              return chai
                .request(app)
                .put(`/smoothies/${recipe._id}`)
                .set('authorization', token)
                .send(updateData);
              })
            .then(res => {
              expect(res).to.have.status(204);
            });
          });
      });
  });

  describe('DELETE endpoint', function () {
    it('Should delete smoothie recipe', function() {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password })
        .then(res => {
          token = res.body.token;
          userId = res.body.userId;
          return recipe.findOne()
            .then(recipe => {
              return chai
                .request(app)
                .delete(`/smoothies/${recipe._id}`)
                .set('authorization', token)
              })
                .then(res => {
                  expect(res).to.have.status(204);
                });
              });
      });
  });
});