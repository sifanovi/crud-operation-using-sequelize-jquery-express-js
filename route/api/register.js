var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true}));
var DB = require('../../models/index');
var flash = require('connect-flash');
var sequelize = DB.sequelize;
var User = sequelize.models.user;

router.post('/', function(req, res) {
  // first fill the database with this new user's information
  //console.log(JSON.stringify(req.body));
  User.findAll({
      where: { username: req.body.username },
      attributes: [ 'username' ]
    })
    .then(function(user) {
      if(!user) {
        // create that user as no one by that username exists
        User
          // all go in directly, all our field names are the same
          .create(req.body)
          .complete(function(err, user) {
            if(err) {
              throw err;
            } else {
              // set the flash message to indicate that user was
              // registered successfully
             // req.flash('error', 'The user was registered successfully')
              // finally redirect to login page, so that they can login
              // and start using our features
              res.redirect('/client/login');
            }
          });
      } else {
        // there's already someone with that username
        res.render('layouts/register', {
          user: req.user,
          message: "That username already exists"
        });
      }
    })
    .catch(function(err){
      throw err;
    })
});

router.get('/', function(req, res){
  // if already authenticated, then no need to register
  // this is a bad case where user is meddling with the URL
  // we just send him to our home page if so
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('layouts/register', { user: req.user, message: "error" });
  }
});

module.exports=router;
