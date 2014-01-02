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

	//Get Events
	app.get('/api/events', events);


}