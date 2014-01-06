

define([
	'backbone',
	'jquery',
	'underscore',
	'components/models/event'
	], function(Backbone, $, _, EventModel){

		var EventListCollection = Backbone.Collection.extend({

			model: EventModel,

			// url: '/api/events/',

			initialize: function(){
				this.fetch();
			},

			fetch: function(){
				$.get(
					'api/events/getAllEvents',
					_.bind(this.onGetAllEvents, this)
					).fail(function(erro){
						$.trigger('getAllEvents:error', this);
					});
			},

			onGetAllEvents: function(events){
				console.log('onGetAllEvents', events);
				this.add(events);
				this.trigger('getAllEvents:success', this);
			}

		});

		return EventListCollection;

});