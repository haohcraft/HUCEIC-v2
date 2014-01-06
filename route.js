// route.js


/**
 * Module dependencies
 */

var home = require('./routes/home'),
	about = require('./routes/about'),
	//For the form
	subscribe = require('./routes/api/subscribe');
	events = require('./routes/api/events');

module.exports = function(app){
	// Home page
	app.get('/', home);

	// About page
	app.get('/about', about);


	//Subscribe 
	app.post('/api/subscribe', subscribe);

	//Events
	app.get('/events', events.eventListPage);
	app.get('/new-event', events.newEventPage);
	app.post('/api/events/createEvent', events.createEvent); // this should go first
	app.get('/api/events/:action', function(req, res){
		var action = req.params.action;
		events[action](req, res);
	});



}