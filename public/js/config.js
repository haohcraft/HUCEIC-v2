/**
 * The config file for requireJS
 */

require = {
	baseUrl: "/js/pages",//according to app.js, ther static folder is already set to /public
	paths:{
		"jquery": "../../ext/jquery/jquery.min",
		"underscore": "../../ext/underscore-amd/underscore",
		"backbone": "../../ext/backbone-amd/backbone",
		"jquery-form": "../../ext/jquery-form/jquery.form"

	}

};
