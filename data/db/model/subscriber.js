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

SubscriberModel.getItem = function(key, callback){
	this.find(key).toArray(function(err, items){

		if(err){
			return res.send(500, MSG_ERROR);
		}
		if(items.length){
			return res.send(201, MSG_EXIST);
		}

		callback(err, items);

	});
};