const express=require('express');
const path=require('path');
route=express.Router();
const app=express();
const fs=require('fs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const  hbs    = require('hbs');
app.set('views',path.join(__dirname,"views"));


app.set( 'view engine', 'hbs' );

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/footer.hbs', 'utf8'));
hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/partials/header.hbs', 'utf8'));

app.use('/api',require('./route/api').route);
app.use('/client',require('./route/client').route);


app.listen('8001',()=>console.log('server started'));