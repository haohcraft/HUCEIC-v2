var EventModelDB = require('../../data/db/model/events');



exports.createEvent = function(req, res, next){
	console.log('api/events/createEvent');
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
	console.log('api/events/getAllEvents');

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
	console.log('api/events/getLatestEvent');
	EventModelDB.getLatest(function(err, event){

		console.log('getLatest', event, err);

	});
};

exports.getTop10 = function(req, res, next){
	console.log('api/events/getTop10');
	EventModelDB.getTop10(function(err, events){

		console.log('getTop10: ',  err);
		if (err){
			res.send(500, err);
		} else {
			res.send(200, events);
		}

	});
};

exports.deleteEvent = function(req, res, next){
	console.log('api/events/deleteEvent');
	console.log(req.body, req.body.id);

	var mongoId = req.body.id;

	EventModelDB.deleteEvent(mongoId, function(err){

		if (err){
			res.send(500, err);
		} 

		res.send(200);
	})
};












