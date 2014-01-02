var EventModel = require('../../data/db/model/event');


module.exports = function(req, res, next){

	var resutls = EventModel.getEventsFromGoogleSheet();

	console.log('eventsJS: '+ resutls);

	res.send(200, 'resutls');


}