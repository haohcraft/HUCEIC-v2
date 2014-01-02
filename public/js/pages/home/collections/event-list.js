

define([
	'backbone',
	'jquery'
	], function(Backbone, $){

		var EventsList = Backbone.Collection.extend({

			url: '/api/events',

			initialize: function(){}

		});

		return new EventsList();

});