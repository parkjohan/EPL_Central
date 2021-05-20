
// App Setup
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

PORT = 6570;

app.engine('.handlebars', handlebars({
    extname: ".handlebars"
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// Database
var db = require('./database/db-connector');

// Routes
app.get('/', function (req, res) {
    res.render('index')
})

app.get('/players', function (req, res) {
    //let query1 = "SELECT * FROM bsg_people;";                   // Define our query

    //db.pool.query(query1, function (error, rows, fields) {      // Execute the query
      //  res.render('players', { data: rows });                  // Render the index.handlebars file, and also send the renderer
    //})                                                         
    res.render('players')
});                                                            

app.post('/add-player', function (req, res) {
    res.render("HELLO THIS WORKS");
});

app.get('/matches', function (req, res) {
    let matchQuery = "SELECT * FROM bsg_cert;";

    db.pool.query(matchQuery, function (err, rows, fields) {
        res.render('matches', { data: rows });
    })
});

// Insert data to db
app.post('/add-match', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Switch out query info to match our form.
    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM bsg_people;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back and display the table
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/players', function (req, res) {
    res.render('players')
});

app.get('/seasons', function (req, res) {
    res.render('seasons')
});

app.get('/teams', function (req, res) {
    res.render('teams')
});

app.get('/champions', function (req, res) {
    res.render('champions')
});

// Listener
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});