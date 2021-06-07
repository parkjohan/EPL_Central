
// App Setup
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

PORT = 6572;

app.engine('.handlebars', handlebars({
    extname: ".handlebars"
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// Database Access
var db = require('./database/db-connector');

// GET Routes
app.get('/', function (req, res) {
    res.render('index')
});

app.get('/players', function (req, res) {
    let playerQuery = "SELECT * FROM epl_top_players;";

    // Execute the query
    db.pool.query(playerQuery, function (error, rows, fields) {
        res.render('players', { data: rows });
    })
});

app.get('/matches', function (req, res) {
    let matchQuery = "SELECT * FROM epl_matches;";

    db.pool.query(matchQuery, function (err, rows, fields) {
        res.render('matches', { data: rows });
    })
});

app.get('/seasons', function (req, res) {
    let seasonQuery = "SELECT * FROM epl_seasons;";

    db.pool.query(seasonQuery, function (err, rows, fields) {
        res.render('seasons', { data: rows });
    })
});

app.get('/teams', function (req, res) {
    let teamsQuery = "SELECT * FROM epl_teams;";

    db.pool.query(teamsQuery, function (err, rows, fields) {
        res.render('teams', { data: rows });
    });
});

app.get('/champions', function (req, res) {
    let championsQuery = "SELECT * FROM season_champion_teams;";

    db.pool.query(championsQuery, function (err, rows, fields) {
        res.render('champions', { data: rows });
    });
});

// POST Routes --- INSERT data into the db
app.post('/add-team', function (req, res) {

    // Get the form data from request body
    let data = req.body;

    // Create the query and run it on the database
    let addTeamQuery = `INSERT INTO epl_teams (teamName, city, headCoachLname) VALUES ('${data.teamName}', '${data.city}', '${data.headCoachLname}')`;
    db.pool.query(addTeamQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, perform a SELECT * on bsg_people
        let query2 = "SELECT * FROM epl_teams;";
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
    })
})

app.post('/add-player', function (req, res) {

    // Get the form data from request body
    let data = req.body;

    // Create the query and run it on the database
    let addPlayerQuery = `INSERT INTO epl_top_players (playerFname, playerLname, teamID, nationality) VALUES ('${data.playerFname}', '${data.playerLname}', '${data.teamID}', '${data.nationality}')`;
    db.pool.query(addPlayerQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, perform a SELECT * on bsg_people
        let query2 = "SELECT * FROM epl_top_players;";
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
    })
});

app.post('/add-match', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Switch out query info to match our form.
    // Create the query and run it on the database
    let query1 = `INSERT INTO epl_matches (matchDate, teamHome, teamHomeScore, teamAway, teamAwayScore, teamWon) VALUES ('${data.matchDate}', '${data.teamHome}', '${data.teamHomeScore}', '${data.teamAway}', '${data.teamAwayScore}', '${data.teamWon}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, perform a SELECT * on bsg_people
        let query2 = "SELECT * FROM epl_matches;";
        db.pool.query(query2, function (error, rows, fields) {

            // If there was an error on the second query, send a 400
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back and display the table
            else {
                console.log(rows);  // print the table
                res.send(rows);
            }
        })
    })
});

app.post('/add-season', function (req, res) {
    // Get the form data from request body
    let data = req.body;

    // Create the query and run it on the database
    let addSeasonQuery = `INSERT INTO epl_seasons (seasonStartDate, seasonEndDate, matchOfTheSeasonID) VALUES ('${data.seasonStartDate}', '${data.seasonEndDate}', '${data.matchOfTheSeasonID}')`;
    db.pool.query(addSeasonQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, perform a SELECT * on bsg_people
        let query2 = "SELECT * FROM epl_seasons;";
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
    })
})

app.post('/add-champion', function (req, res) {
    // Get the form data from request body
    let data = req.body;

    // Create the query and run it on the database
    let addSeasonQuery = `INSERT INTO season_champion_teams (seasonID, teamID) VALUES ('${data.seasonID}', '${data.teamID}')`;
    db.pool.query(addSeasonQuery, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, perform a SELECT * on bsg_people
        let query2 = "SELECT * FROM season_champion_teams;";
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
    })
})

// UPDATE Routes
app.put('/update-player/:id', function (req, res) {
    var data = req.body;
    var updatePlayerQuery = "UPDATE epl_top_players SET playerFname=?, playerLname=?, teamID=?, nationality=? WHERE id=?";
    var inserts = [data.playerFname, data.playerLname, data.teamID, data.nationality];
    db.pool.query(updatePlayerQuery, inserts, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

app.put('/update-match/:id', function (req, res) {
    var data = req.body;
    var updateMatchQuery = "UPDATE epl_matches SET matchDate=?, teamHome=?, teamHomeScore=?, teamAway=?, teamAwayScore=?, teamWon=? WHERE id=?";
    var inserts = [data.matchDate, data.teamHome, data.teamHomeScore, data.teamAway, data.teamAwayScore, data.teamWon];
    db.pool.query(updateMatchQuery, inserts, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

app.put('/update-team/:id', function (req, res) {
    var data = req.body;
    var update = "UPDATE epl_teams SET teamName=?, city=?, headCoachLname=? WHERE id=?";
    var inserts = [data.teamName, data.city, data.headCoachLname];
    db.pool.query(updateSeasonQuery, inserts, function (err, result) {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

app.put('/update-season/:id', function (req, res) {
    var data = req.body;
    var updateSeasonQuery = "UPDATE epl_seasons SET seasonStartDate=?, seasonEndDate=?, matchOfTheSeasonID=? WHERE id=?";
    var inserts = [data.seasonStartDate, data.seasonEndDate, data.matchOfTheSeasonID];
    db.pool.query(updateSeasonQuery, inserts, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.delete('/delete-team/:id', function (req, res) {
    var deleteTeamQuery = "DELETE FROM epl_teams WHERE teamID = ?";
    var inserts = [req.params.teamID];
    db.pool.query(deleteTeamQuery, inserts, function (error, result, fields) {
        if (error) {
            console.log(error)
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        } else {
            let teamsQuery = "SELECT * FROM epl_teams;";

            db.pool.query(teamsQuery, function (err, rows, fields) {
                res.render('teams', { data: rows });
            });
        }
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (req, res) {
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

// Listener
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});