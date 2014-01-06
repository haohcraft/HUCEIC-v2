/**
 * Backend for storing the subscribers
 */

var SubscriberModelDB = require('../../data/db/model/subscriber');
var MSG_ERROR = "Something is wrong!",
	MSG_EXIST = "The email already exists.",
	MSG_SUCCESS = "YoY, thanks for subscribing our newsletter!";


module.exports = function(req, res, next){


	// Sanitize
	req.sanitize('first_name').trim();
	req.sanitize('last_name').trim();
	req.sanitize('email').trim();

	
	// Validate
	req.assert('email',"The email address is not valid!").isEmail();
	req.assert('email', "What's your email?").notEmpty();
	req.assert('first_name', "What's your first name??").isName().notEmpty();
	req.assert('last_name', "What's your last name??").isName().notEmpty();


	var errors = req.validationErrors();
	if (errors) {
		errors.push(MSG_ERROR);
		res.send(errors, 400);
		return;
	}

	var data = {
		firstname: req.body.first_name,
		lastname: req.body.last_name,
		email: req.body.email
	};

	SubscriberModelDB.getItem({email: data.email}, function(err, items){

		if(err){
			return res.send(500, MSG_ERROR);
		}
		if(items.length){
			return res.send(201, MSG_EXIST);
		}


		SubscriberModelDB.subscribe(data, function(err){
			if(err){
				return res.send(500, MSG_ERROR);
			}

			return res.send(200, MSG_SUCCESS);
		});

	});


};

