/**
 * The controller for the home page
 * 1. the order of loading different views
 */

define([
	'backbone',
	'jquery',
	'home/views/form-subscribe'

	],function(Backbone, $, SubscribeForm){
		
		var attachViews = function(){
			// attach the subscribe form
			new SubscribeForm();
		};

		var Main = function(){
			console.log('this is the main.js for the home page');
			attachViews();

		};




		return Main;

});