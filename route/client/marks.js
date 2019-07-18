var express=require('express');
var route=express.Router();
var util = require('../../util/');


route.use('/',util.ensureAuthenticated,function(req,res)
{
    res.render('layouts/marks',{"user":req.user.username});
})

module.exports=route;