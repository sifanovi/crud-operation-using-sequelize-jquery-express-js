var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res){
 
    res.render('layouts/register');
  
});



module.exports = router;
