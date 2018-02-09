const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {user} = require('./models/userModel');
const {JWT_SECRET} = require('./config');

const localStrategy = new LocalStrategy((username, password, callback) => {
  let theUser;
  user.findOne({username: username})
  .then(_user => {
    theUser = _user;
    if(!theUser) {
      return Promise.reject({
        reason: 'LoginError',
        message: 'Incorrect username or password'
      });
    }
    return theUser.validate(password);
  })
  .then(isValid => {
    if(!isValid) {
      return Promise.reject({
        reason: 'LoginError',
        message: 'Incorrect username or password'
      });
    }
    return callback(null, user);
  })
  .catch(err => {
    if(err.reason === 'LoginError') {
      return callback(null, false, err);
    }
    return callback(err, false);
  });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    alorithm: ['Hs256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
});

module.exports = { localStrategy, jwtStrategy };