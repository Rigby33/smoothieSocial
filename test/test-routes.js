const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const {app, runServer, closeServer} = require('../server');
const {user} = require('../models/userModel');
const {recipe} = require('../models/smoothieModel');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

chai.use(chaiHttp);
let token;
let userId;

function createUser() {
  let newUser = {
    username: 'testingusername',
    password: 'testingpassword',
    firstName: 'first',
    lastName: 'last'
  }
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post('/auth/register')
      .send(newUser)
      .then((res) => {
        logUserIn()
          .then(() => {
            resolve()
          });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function logUserIn() {
  let theUser = {
    username: 'testingusername',
    password: 'testingpassword',
    firstName: 'first',
    lastName: 'last'
  }

  return new Promise((resolve, reject) => {
    chai.request(app)
      .post('/auth/login')
      .send(theUser)
      .then(res => {
        token = res.body.token;
        userId = res.body.userId;
        seedTestDb();
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function seedTestDb() {
  const seedRecipes = [];
  for (let i = 0; i < 5; i++) {
    seedRecipes.push(generateRecipe());
  }
  return recipe.insertMany(seedRecipes);
}

function generateRecipe() {
  return {
    userId: userId,
    title: faker.lorem.sentence(),
    ingredients: faker.lorem.words()
  }
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('smoothieSocial API resources', function() {

  before(function(done) {
    Promise.resolve(runServer(TEST_DATABASE_URL)).then(() => {
      Promise.resolve(createUser()).then(() => {
        done()
      });
    });
  });

  after(function() {
    tearDownDb();
    closeServer();
  });

  describe('GET endpoint', function () {
    it('Should get data from smoothies endpoint', function() {
      return chai
        .request(app)
        .get('/smoothies')
        .set('authorization', token)
        .then((res) => {
          expect(res.body).to.have.length.of.at.least(1);
          expect(res).to.have.status(200);
        });
    });

    it('Should get recipes created by specific user', function() {
      return chai
        .request(app)
        .get(`/smoothies/${userId}`)
        .set('authorization', token)
        .then(res => {
          expect(res.body).to.have.length.of.at.least(1);
          expect(res).to.have.status(200);
        });
    });

    it('Should get recipe by recipe id', function() {
      return recipe.findOne()
        .then(recipe => {
          let recipeid = recipe._id;
          return chai
            .request(app)
            .get(`/smoothies/update/${recipeid}`)
            .set('authorization', token)
        })
        .then(res => {
          expect(res.body).to.be.a('object');
          expect(res).to.have.status(200);
        });
    });
  });

  describe('PUT and POST endpoints', function() {
    it('Should post data on smoothies endpoint', function() {
      let newRecipe = generateRecipe();
      return chai
        .request(app)
        .post('/smoothies')
        .send(newRecipe)
        .set('authorization', token)
        .then(res => {
          expect(res).to.be.json;
          expect(res.body.id).to.not.be.null;
          expect(res).to.be.a('object');
          expect(res.body.title).to.equal(newRecipe.title);
          expect(res.body.ingredients).to.be.a('array');
          expect(res).to.have.status(201)
        });
    });

    it('Should update a recipe based on recipe id', function() {
      let updateData = {
        title: 'New title',
        ingredients: ['new', 'new', 'new'],
      };
      return recipe.findOne()
        .then(recipe => {
          updateData.id = recipe._id;
          return chai
            .request(app)
            .put(`/smoothies/${recipe._id}`)
            .set('authorization', token)
            .send(updateData)
        })
        .then(res => {
          expect(res).to.have.status(204);
          return recipe.findById(updateData.id);
        })
        .then(recipe => {
          expect(recipe.title).to.equal(updateData.title);
        });
    });
  });

  describe('DELETE endpoing', function() {
    it('Should delete smoothie recipe', function() {
      return recipe.findOne()
        .then(recipe => {
          return chai
            .request(app)
            .delete(`/smoothies/${recipe._id}`)
            .set('authorization', token)
          })
            .then(res => {
              expect(res).to.have.status(204);
              return recipe.findById(recipe._id);
            })
              .then(res => {
                expect(res).to.be.null;
              });
    });
  });
});