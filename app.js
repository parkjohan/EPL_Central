/*
// App Setup
var exphbs = require('express-handlebars');
var express = require('express');
var app = express();
PORT = 6570;

app.require('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

// Database
var db = require('./database/db-connector')

// Routes
app.get('/', function(req, res){
    res.render('index')
});

app.get('/matches', function(req, res){
    res.render('matches')
});

app.get('/players', function(req, res){
    res.render('players')
});

app.get('/seasons', function(req, res){
    res.render('seasons')
});

app.get('/teams', function(req, res){
    res.render('teams')
});

app.get('/champions', function(req, res){
    res.render('champions')
});


// Listener
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});



// This is using handlebars and express for templating.
// We can switch it out when we want making sure it works on flip server too.
*/