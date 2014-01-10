

define([
	'backbone',
	'jquery',
	'underscore',
	'components/models/event',
	'pubsub' //just load
	], function(Backbone, $, _, EventModel){

		var EventListCollection = Backbone.Collection.extend({

			model: EventModel,

			// url: '/api/events/',

			initialize: function(){

				$.subscribe('eventCollection:delete', _.bind(this.onEventDelete, this));
				this.fetch();

			},

			fetch: function(){
				$.get(
					'api/events/getAllEvents',
					_.bind(this.onGetAllEvents, this)
					).fail(function(erro){
						$.publish('getAllEvents:error', this);
					});
			},

			onGetAllEvents: function(events){
				console.log('onGetAllEvents', events.length);
				this.reset(events);
				this.trigger('getAllEvents:success', this);
			},

			onEventDelete: function(index, mongoId){
				console.log('event-list Collection: remove');
				$.ajax({
					url: 'api/events/deleteEvent',
					type: 'DELETE',
					data: {id: mongoId},
					success: this.onEventDeleteSucess

				});
			},

			onEventDeleteSucess: function(data, status, jqXHR){
				console.log('onEventRemoveSucess', data, status);
				$.publish('deleteEvent: success');

			}



		});

		return EventListCollection;

});