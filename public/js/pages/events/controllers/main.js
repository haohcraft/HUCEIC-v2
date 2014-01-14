define([
	'backbone',
	'jquery',
	'components/form-subscribe',
	'components/models/event',
	'components/collections/event-list',
	'pages/events/views/event-create-view',
	'components/views/event-list-view'
	],function(Backbone, $, SubscribeForm, EventModel, EventListCollection, EventCreateView, EventListView){
		
		var attachViews = function(){
			// attach the subscribe form
			new SubscribeForm();


			// attach the event-create section, if possible
			if($.find('.event-new').length != 0){
				new EventCreateView({
					el: '.event-new',
					model: new EventModel()
				});
			}

			// attach the event list section
			new EventListView({
				el: '.event-list',
				collection: new EventListCollection()

			});

		};


		var Main = function(){
			console.log('this is the main.js for the events page');
			attachViews();

		};




		return Main;

});