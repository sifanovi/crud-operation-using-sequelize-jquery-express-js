const route =require('express').Router();

route.use('/batch',require('./batch'));
route.use('/course',require('./course'));
route.use('/department',require('./departments'));
route.use('/faculty',require('./faculty'));
route.use('/include',require('./include'));
route.use('/student',require('./student'));
route.use('/takes',require('./takes'));
route.use('/marks',require('./marks'));
route.use('/register',require('./register'));
route.use('/notice',require('./notice'));


exports=module.exports={route};