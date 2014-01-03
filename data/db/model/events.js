/**
 * Model for events
 * @type {[type]}
 */
var Model = require('./base'),
	EventsModel = new Model('events');

var GoogleSpreadsheets = require("google-spreadsheets"),
	KEY = '0At7_MFZRuMbkdF9mMU90UG1tRS1rM2NMTW5veC1qa0E';

module.exports = EventsModel;

/**
 * Get the events from the google spread sheet
 * @return {[type]} [description]
 */
EventsModel.getEventsFromGoogleSheet = function(){

	GoogleSpreadsheets({
			key: KEY
		}, function(err, spreadsheet) {
			spreadsheet.worksheets[0].rows({
			}, function(err, result) {
					console.log(result[0].content);
			        return {hao: 'hao',huang:'huang'};
			});
	});



};

/**
 * Create a new event
 * @param  {[type]}   eventInfo [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
EventsModel.createNew = function(eventInfo, callback){

	this.insert({
		date: eventInfo.date, 				// The date of the event, type Date
		address: eventInfo.address,			// The address, type String
		topic: eventInfo.topic,				// The topic, type String
		speaker: eventInfo.speaker,			// The speaker, type [String, String,...]
		descriptions: eventInfo.descriptions,	// The description, type String
		mediaPath: eventInfo.mediaPath,		// The path/url of the media(pics, videos), type String
		typeOfEvent: eventInfo.typeOfEvent				// The type of the event, type String 

	}, callback);

};