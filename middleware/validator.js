

module.exports = function(req, res, next){

	var expressValidator = require('express-validator');

	// For sanitizing
	expressValidator.Filter.prototype.toLowerCase = function(){
		this.modify(this.str.toLowerCase());
		return this.str;
	};

	// For validating
	expressValidator.Validator.prototype.isName = function(){
		if(!this.str.match(/^[a-zA-Z]+$/)){
			this.error('The name is invalid!');
		}
		return this;
	}

	next();

}

