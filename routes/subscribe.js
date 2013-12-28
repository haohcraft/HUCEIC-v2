var util = require('util');

module.exports = function(req, res, next){
	//
	req.sanitize('first_name').trim();
	req.sanitize('last_name').trim();
	req.sanitize('email').trim();

	console.log(req.body.email);
	// Validate
	req.assert('email',"The email address is not valid!").isEmail();
	req.assert('first_name', "The first name is not valid.").notEmpty();
	req.assert('last_name', "The last name is not valid").notEmpty();


	var errors = req.validationErrors();
	if (errors) {

		res.send(errors, 400);
		return;
	}

	res.json({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	});


};
