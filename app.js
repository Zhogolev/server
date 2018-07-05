var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
    secret: 'coc-coc-celebrities',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 60000
    }
}));

var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var LinkController = require('./link/LinkController');
app.use('/api/links', LinkController);

app.get('/', function(req, res) {
     console.log('get', req.session.id);
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

app.get('/login', function(req, res) {
    console.log(req.session.token);
    if (req.session.token) return res.redirect('/');
	res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});







module.exports = app;