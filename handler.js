var express = require('express');

var app = express();

app.use(express.static('project'));

app.set('port', 6570);
app.set('view engine', 'html');

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

//app.get('/plot-synopsis',function(req,res){
  
  //res.render('plot.html');
//});

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