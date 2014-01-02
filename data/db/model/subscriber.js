/**
 * Model for subscribers
 * @type {[type]}
 */
var Model = require('./base'),
	SubscriberModel = new Model('subscriber');

module.exports = SubscriberModel;

// Methods
SubscriberModel.subscribe = function(userInfo, callback){
	this.insert({
		firstname: userInfo.firstname,
		lastname: userInfo.lastname,
		email: userInfo.email,
		created: new Date()
	}, callback);
};