var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Worker = require('./models/model.js');

mongoose.connect('mongodb://localhost/company');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	var applicantsList = Worker.find({}, function(error, results){
		if(error) {
			console.log('Error finding');
		}
		else {
			console.log('Found!');
			console.log(results);
			console.log('type of results: ' + typeof(results));
			res.render('applicants', {results:results} );
		}
	});
	
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	var tempWorker = new Worker({
		'name': req.body.name, 
		'bio': req.body.bio, 
		'skills': req.body.skills,
		'years': req.body.years,
		'why': req.body.why
	});
	console.log(tempWorker);

	tempWorker.save(function(error){
		if(error) {
			console.log('Error writting to the database');
		}
		else {
			console.log('Value in database');
		}
	});

	//res.send('Success!');
	res.redirect('/success');
});

app.get('/success', function(req, res){

	console.log('Redirect fired');
	res.render('success');

});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
