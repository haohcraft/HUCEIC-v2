/**
 * [mongo description] For db
 * @type {[type]}
 */
var mongo = require('mongoskin');

var dbcfg = {
	user: "haohcraft",
	password: '19880101',
	url: 'dharma.mongohq.com:10079/huceic'
};

module.exports = mongo.db(
	'mongodb://'
	+dbcfg.user
	+':'
	+dbcfg.password
	+'@'
	+dbcfg.url
	);