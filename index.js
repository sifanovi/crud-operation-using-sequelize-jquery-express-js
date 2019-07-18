const express = require('express');
const path = require('path');
const app = express();

// add dependencies: passport, passport-local, express-session, connect-flash
var passport = require('passport');
require('./config/passport');
var flash = require('connect-flash');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


route = express.Router();

const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const hbs = require('hbs');
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartial('footer', fs.readFileSync(__dirname + '/views/partials/footer.hbs', 'utf8'));
hbs.registerPartial('header', fs.readFileSync(__dirname + '/views/partials/header.hbs', 'utf8'));

app.use('/api', require('./route/api').route);
app.use('/client', require('./route/client').route);
app.use(flash());

// setup the session middleware





app.listen('8001', () => console.log('server started'));