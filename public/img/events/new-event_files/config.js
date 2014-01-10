/**
 * The config file for requireJS
 */

require = {
	baseUrl: "/js",//according to app.js, ther static folder is already set to /public
	paths:{
		"jquery": "../ext/jquery/jquery.min",
		"underscore": "../ext/underscore-amd/underscore",
		"backbone": "../ext/backbone-amd/backbone",
		"jquery-form": "../ext/jquery-form/jquery.form",
		"pen-markdown": "../ext/pen/src/markdown",
		"pen": "../ext/pen/src/pen",
		"utils":"components/utils",
		"store":"../ext/store/store.min",
		"jquery-placeholder":"../ext/jquery-placeholder/jquery.placeholder.min",
		"pubsub": "../ext/pubsub/pubsub"

	},

	shim: {
		'pen-markdown':{
			deps: ['pen'],
			exports: 'Pen'
		},

		'jquery-placeholder':{
			deps: ['jquery'],
			exports: 'jquery-placeholder'
		},

		'pubsub': {
			deps: ['jquery'],
			exports: 'pubsub'
		}
	}


};
