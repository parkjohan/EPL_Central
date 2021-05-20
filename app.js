
// App Setup
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 6570;

app.engine('.handlebars', handlebars({
    extname: ".handlebars"
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/views'));

// Database
var db = require('./database/db-connector')

// Routes
app.get('/', function(req, res){
    let query1 = "SELECT * FROM epl_teams;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        res.render('index', {data: rows});                  // Render the index.handlebars file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


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

/********** ************/

/*
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// Connect to database
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_parkjoh',
    password: '9692',
    database: 'cs290_parkjoh'
});

app.get('/', function (req, res) {
    var context = {};
    res.render('home', context);
});

app.get('/get-table', function (req, res, next) {
    getWorkoutsTable(req, res, next);
});

app.post('/add', function (req, res, next) {
    pool.query('INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs],
        function (err, result) {
            if (err) {
                next(err);
                return;
            }
            getWorkoutsTable(req, res, next);
        });
});

app.post('/update/:id', function (req, res, next) {
    var sql = 'UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?';
    console.log(req.params)
    console.log(req.body)
    pool.query(sql, [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.params.id],
        function (err, result) {
            if (err) {
                next(err);
                return;
            }
            getWorkoutsTable(req, res, next);
        });
});

app.delete('/delete/:id', function (req, res, next) {
    pool.query('DELETE FROM workouts WHERE id = ?', [req.params.id],
        function (err, result) {
            if (err) {
                next(err);
                return;
            }
            console.log('Number of deleted workouts: ' + result.affectedRows);
            getWorkoutsTable(req, res, next);
        });
});

function getWorkoutsTable(req, res, next) {
    pool.query('SELECT * FROM workouts', function (err, rows) {
        if (err) {
            next(err);
            return;
        }
        res.type('application/json');
        res.send(rows);
    });

}

app.get('/reset-table', function (req, res, next) {
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function (err) {
        var createString = "CREATE TABLE workouts (" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        pool.query(createString, function (err) {
            context.results = "Table reset";
            res.render('home', context);
        })
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (req, res) {
    res.type('plain/text')
    res.status(505);
    res.render('505');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
*/