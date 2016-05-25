'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model');

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

// place right after the session setup middleware
app.use(function (req, res, next) {
  // console.log('session', req.session);
  next();
});

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  // console.log('counter', ++req.session.counter);
  next();
});

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

// make sure this comes after the session middleware, otherwise req.session will not be available
app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.dataValues.id;
      res.json(user.dataValues);
    }  
  })
  .catch(next);
});

app.post('/signup', function (req, res, next) {
  console.log('req.body', req.body);
  User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(function (user) {
      req.session.userId = user.dataValues.id;
      res.json(user.dataValues);  
  })
  .catch(next);
});

app.use(require('./error.middleware'));

module.exports = app;
