var EventModel = require('../../data/db/model/events');

exports.showEventPage = function(req, res, next){
	res.render('pages/events', {
		app: 'events',
		admin: 'haohcraft'
	});
};


exports.createEvent = function(req, res, next){

	res.render('pages/events', {
		app: 'events',
		admin: 'haohcraft'
	});


};

exports.saveEvent = function(req, res, next){
	console.log('events/saveEvent');
};

exports.getAllEvents = function(req, res, next){
	console.log('events/getAllEvents');
};

exports.getLatestEvent = function(req, res, next){
	console.log('events/getLatestEvent');
};



