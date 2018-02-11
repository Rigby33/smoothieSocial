const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');
const {user} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

chai.use(chaiHttp);
let token;

describe('validUser', function() {
  const username = 'testingusername';
  const password = 'testingpassword';
  const firstName = 'first';
  const lastName = 'last';

  before(function() {
    return runServer();
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
      })
      );
  });

  afterEach(function() {
    return user.remove({username: username});
  });

  it('Should return a valid token', function () {
    return chai
      .request(app)
      .post('/auth/login')
      .send({ username, password })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        token = res.body.token;
        expect(token).to.be.a('string');
      });
    });

  it('Should get data from smoothies endpoint', function() {
    return chai
    .request(app)
      .post('/auth/login')
      .send({ username, password })
      .then(res => {
        token = res.body.token;
        console.log(token);
        return chai
          .request(app)
          .get('/smoothies')
          .set('authorization', token)
          .then(res => {
            expect(res).to.have.status(200);
          });
        });
    });
  });