var express = require('express');

var app = express();

app.use(express.static('project'));

// http://flip3.engr.oregonstate.edu:6570/

app.set('port', 6570);
app.set('view engine', 'html');

// Database
var db = require('./database/db-connector')

//app.get('/~shaibis/style.css',function(req,res){
	//res.render('home-page');
 // res.sendFile('./style.css', {root : __dirname});
//});

//app.get('/~shaibis/script.js',function(req,res){
	//res.render('home-page');
 // res.sendFile('./script.js', {root : __dirname});
//});

app.get('/',function(req,res){
  res.sendFile('./index.html', {root : __dirname});
  /*
  // ******TESTING ******
	// Define queries
  query1 = 'DROP TABLE IF EXISTS diagnostic;';
  query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
  query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
  query4 = 'SELECT * FROM diagnostic;';

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.pool.query(query1, function (err, results, fields){

    // CREATE TABLE...
    db.pool.query(query2, function(err, results, fields){

      // INSERT INTO...
      db.pool.query(query3, function(err, results, fields){

        // SELECT *...
        db.pool.query(query4, function(err, results, fields){

          // Send the results to the browser
          res.send(JSON.stringify(results));
          //res.sendFile('./index.html', {root : __dirname});
        });
      });
    });
  });*/
});

app.get('/~shaibis/teams',function(req,res){
	
  res.sendFile('./teams.html', {root : __dirname});
});

app.get('/~shaibis/players',function(req,res){
	
  res.sendFile('./players.html', {root : __dirname});
});

app.get('/~shaibis/matches',function(req,res){
	
  res.sendFile('./matches.html', {root : __dirname});
});

app.get('/~shaibis/seasons',function(req,res){
  
  res.sendFile('./seasons.html', {root : __dirname});
});

app.get('/~shaibis/champions',function(req,res){
  
  res.sendFile('./champions.html', {root : __dirname});
});


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});