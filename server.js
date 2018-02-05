const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');
const smoothieRouter = require('./routes/smoothieRouter');

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(express.static('./public'));

app.use('/smoothies', smoothieRouter);

app.use('*', (req, res) => {
  return res.status(404).json({
    message: 'Not Found'
  });
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve(server);
      }).on('error', err => {
        reject(err)
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };
