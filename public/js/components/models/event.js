define([
	'backbone',
	'jquery',
	'pubsub' //just load

	],function(Backbone, $){

		var EventModel = Backbone.Model.extend({

			defaults: {
				eventData: null,
				title: '',
				speaker: '',
				type: '',
				description: ''
			},

			save: function(data){
				this.saveEvent(data);

			},

			saveEvent: function(data){

				$.post(
					'api/events/createEvent', 
					data, 
					this.onSaveSuccess // when success
					).fail(function(error){
						$.publish('newEvent:error', error);

				});

			},

			onSaveSuccess: function(res, status){
				$.publish('newEvent:success');

			}


		});

		return EventModel;

});