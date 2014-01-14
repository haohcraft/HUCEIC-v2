// route.js


/**
 * Module dependencies
 */

var home = require('./routes/home'),
	about = require('./routes/about'),
	events = require('./routes/events'),
	
	// Some APIs
	apiSubscribe = require('./routes/api/subscribe'),
	apiEvents = require('./routes/api/events');

module.exports = function(app){
	// Home page
	app.get('/', home);

	// About page
	app.get('/about', about);


	//Subscribe 
	app.post('/api/subscribe', apiSubscribe);

	//Events
	app.get('/events', events.eventListPage);
	app.get('/new-event', events.newEventPage);
	app.post('/api/events/createEvent', apiEvents.createEvent); // this should go first
	app.get('/api/events/:action', function(req, res){
		var action = req.params.action;
		apiEvents[action](req, res);
	});
	app.del('/api/events/deleteEvent', apiEvents.deleteEvent);



}