define([
	'backbone',
	'jquery',
	'components/form-subscribe',
	'pages/events/views/event-create-view'
	],function(Backbone, $, SubscribeForm, EventCreateView){
		
		var attachViews = function(){
			// attach the subscribe form
			new SubscribeForm();
			new EventCreateView();

		};


		var Main = function(){
			console.log('this is the main.js for the events page');
			attachViews();

		};




		return Main;

});