const route =require('express').Router();

route.use('/batch',require('./batch'));
route.use('/course',require('./course'));
route.use('/department',require('./department'));
route.use('/faculty',require('./faculty'));
route.use('/student',require('./student'));
route.use('/marks',require('./marks'));
route.use('/login',require('./login'));
route.use('/logout',require('./logout'))

route.use('/signup',require('./signup'))
route.use('/home',require('./home'))
route.use('/teacher',require('./teacher'))
route.use('/result',require('./result'))


exports=module.exports={route};