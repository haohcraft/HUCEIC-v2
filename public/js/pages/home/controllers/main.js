/**
 * The controller for the home page
 * 1. the order of loading different views
 */

define([
	'backbone',
	'jquery',
	'components/form-subscribe',
	'pages/home/views/event-carousel-view',
	'pages/home/views/feature-event-view',
	'components/collections/event-list'

	],function(Backbone, $, SubscribeForm, EventListView, FeatureEventView, EventListCollection){
		
		var attachViews = function(){
			// attach the subscribe form
			new SubscribeForm();
			new EventListView({
				el: '#carousel',
				collection: new EventListCollection()
			});

			new FeatureEventView({
				el: '#featuredEvent',
				collection: new EventListCollection()
			});

			
		};


		var Main = function(){
			console.log('this is the main.js for the home page');
			attachViews();

		};




		return Main;

});