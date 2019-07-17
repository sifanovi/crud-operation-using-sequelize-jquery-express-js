var express = require('express');
var router = express.Router();
var passport = require('passport');
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var User = sequelize.models.user;

router.get('/', function(req, res){
  if(req.isAuthenticated()) {
    res.redirect('/client/student');
  } else {
    res.render('layouts/login', { user: req.user, message: "error" });
  }
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/client/student',
  failureRedirect: '/client/login',
  
}));
module.exports = router;
