var util = require('util');

module.exports = function(req, res, next){
	// Validate
	req.assert('email').notEmpty().isEmail();


	var errors = req.validationErrors();
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	res.json({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	});


};
