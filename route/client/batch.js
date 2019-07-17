var express=require('express');
var route=express.Router();
var util = require('../../util/');


route.use('/',function(req,res)
{
    res.render('layouts/batch');
})

module.exports=route;