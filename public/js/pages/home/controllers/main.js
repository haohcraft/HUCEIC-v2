/**
 * The controller for the home page
 * 1. the order of loading different views
 */

define([
	'backbone',
	'jquery',
	'components/form-subscribe',
	'pages/home/views/event-carousel-view',
	'components/collections/event-list'

	],function(Backbone, $, SubscribeForm, EventListView, EventListCollection){
		
		var attachViews = function(EventListCollection){
			// attach the subscribe form
			new SubscribeForm();
			new EventListView({
				el: event-list,
				collection: new EventListCollection()
			});

			
		};


		var Main = function(){
			console.log('this is the main.js for the home page');
			attachViews(EventListCollection);

		};




		return Main;

});