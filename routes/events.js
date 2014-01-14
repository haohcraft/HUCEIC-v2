/**
 * Get the event related pages
 * 1. /events
 * 2. /event-new
 */

exports.eventListPage = function(req, res, next){
	res.render('pages/events', {
		app: 'events'
	});
};


exports.newEventPage = function(req, res, next){

	res.render('pages/events', {
		app: 'events',
		admin: 'admin'
	});


};