var EventModelDB = require('../../data/db/model/events');

exports.eventListPage = function(req, res, next){
	res.render('pages/events', {
		app: 'events'
	});
};


exports.newEventPage = function(req, res, next){

	res.render('pages/events', {
		app: 'events',
		admin: 'haohcraft'
	});


};

exports.createEvent = function(req, res, next){
	console.log('events/createEvent');
	console.log(req.body);
	var newEvent = req.body;

	EventModelDB.createEvent(newEvent, function(err){
		if(err){
			console.log('Failed to create a new event!');
			res.send(500, 'Failed');
		}else{
			console.log('Successfully created a new event!');
			res.send(200, 'Sucessed');
		}
	});
};

exports.getAllEvents = function(req, res, next){
	console.log('events/getAllEvents');

	EventModelDB.getAllEvents(function(err, events){
		console.log('allEvents: ',  err);
		if (err){
			res.send(500, err);
		} else {
			res.send(200, events);
		}

	});
};

exports.getLatestEvent = function(req, res, next){
	console.log('events/getLatestEvent');
	EventModelDB.getLatest(function(err, event){

		console.log('getLatest', event, err);

	});
};



