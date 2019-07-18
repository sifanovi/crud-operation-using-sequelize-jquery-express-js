var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require("multer");

var DB = require('../models/index');
var sequelize = DB.sequelize;
var userModel = sequelize.models.user;


passport.use('local-login',new LocalStrategy(function(username, password,done) {

  return userModel
  .findOne({ where: { username: username } })
  .then(function(user) {

    // successful query to database
    if(!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }


      if(user.dataValues.password == password) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }

  })
  .catch(function(err) { // something went wrong with query to db

      return done(err);

  });
}));

// serialize session, only store user id in the session information
passport.serializeUser(function(user, done) {
    done(null, user);
});

// from the user id, figure out who the user is...
passport.deserializeUser(function(userId, done){
    userModel
    .findOne({ where: { id: userId.id  } })
    .then(function(user){
      done(null, user);
    }).catch(function(err){

      done(err, null);
    });
});
