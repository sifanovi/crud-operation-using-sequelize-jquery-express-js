var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('../../util/');

router.get('/', function(req, res){
  if(req.isAuthenticated()) {
    res.redirect('/client/student');
  } else {
    res.render('layouts/login', { user: req.user, message: "error" });
  }
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/client/student',
  failureRedirect: '/client/login',
  
}));
module.exports = router;
