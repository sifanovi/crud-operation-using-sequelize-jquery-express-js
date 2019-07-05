const route =require('express').Router();

route.use('/batch',require('./batch'));
route.use('/course',require('./course'));
route.use('/department',require('./department'))
route.use('/faculty',require('./faculty'))
route.use('/student',require('./student'))


exports=module.exports={route};