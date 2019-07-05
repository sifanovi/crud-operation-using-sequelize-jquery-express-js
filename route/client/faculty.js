var express=require('express');
var route=express.Router();



route.use('/',function(req,res)
{
    res.render('layouts/faculty');
})

module.exports=route;