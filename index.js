const express=require('express');
const path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// add dependencies: passport, passport-local, express-session, connect-flash
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Initialize passport variables
 require('./config/passport');

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
app.use(flash());

// setup the session middleware

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            user: req.user,
            message: err.message,
            error: err
        });
    });
}

// app.use(session({
//   secret: 'my secret',
//   resave: false,
//   saveUninitialized: true
//   }));
// app.use(passport.initialize());
// app.use(passport.session());


app.listen('8001',()=>console.log('server started'));