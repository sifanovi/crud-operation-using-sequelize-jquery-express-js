var express=require('express');
var route=express.Router();



route.use('/',function(req,res)
{
    res.render('layouts/home');
})

module.exports=route;