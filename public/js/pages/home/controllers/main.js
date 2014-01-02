/**
 * The controller for the home page
 * 1. the order of loading different views
 */

define([
	'backbone',
	'jquery',
	'home/views/form-subscribe',
	'home/views/events-list-view',
	'home/collections/event-list'

	],function(Backbone, $, SubscribeForm, EventsListView, EventsListCollection){
		
		var attachViews = function(EventsListCollection){
			// attach the subscribe form
			new SubscribeForm();
			new EventsListView({
				collection: EventsListCollection
			});
		};


		var Main = function(){
			console.log('this is the main.js for the home page');
			attachViews(EventsListCollection);

		};




		return Main;

});