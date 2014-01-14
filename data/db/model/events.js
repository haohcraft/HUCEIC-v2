/**
 * Model for events
 * @type {[type]}
 */
var Model = require('./base'),
	EventsModel = new Model('events');


module.exports = EventsModel;


/**
 * Create a new event
 * @param  {[type]}   eventInfo [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
EventsModel.createEvent = function(data, callback){

	this.insert({
		title: data.title,
		speaker: data.speaker,
		type: data.type,
		description: data.description,
		eventDate: {
			text: data.date,
			date: new Date(data.date)

		},
		address: {
			text: data.address,
			lat: data.lat,
			lng: data.lng
		},
		
		created: new Date() 
	}, callback);

};

EventsModel.getAllEvents = function(callback){
	this.find({}, {sort:{"eventDate.date": -1}}).toArray(callback);
};

EventsModel.getTop10 = function(callback){
	this.find({},{limit: 10, sort:{"eventDate.date": -1}}).toArray(callback);
};

EventsModel.getLatest = function(callback){
	this.find({},{limit: 1, sort:{"eventDate.date": -1}}).toArray(callback);
};

EventsModel.deleteEvent = function(_id, callback){
	this.removeById(_id, callback);
};

EventsModel.getEventById = function(_id, callback){
	this.findOne({_id: _id}, callback);
};


