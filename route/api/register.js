var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true}));
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var User = sequelize.models.user;

router.post('/', function(req, res) {
  // first fill the database with this new user's information
  //console.log(JSON.stringify(req.body));
  User.findOne({
      where: { username: req.body.username },
      attributes: [ 'username' ]
    })
    .then(function(user) {
        console.log(user);
      if(!user) {
        // create that user as no one by that username exists
        User
          // all go in directly, all our field names are the same
          .create(req.body)
          .then(function(user) {
             res.send({status:"201",data:user,message:"User Created Succesfully"})

          });
      } else {
        // there's already someone with that username
 res.send({status:"500",data:user,message:"User Already Exist"})


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
