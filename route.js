// route.js


/**
 * Module dependencies
 */

var home = require('./routes/home'),
	about = require('./routes/about'),
	//For the form
	subscribe = require('./routes/subscribe');

module.exports = function(app){
	// Home page
	app.get('/', home);

	// About page
	app.get('/about', about);


	//Subscribe 
	app.post('/subscribe', subscribe);


}