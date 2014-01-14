

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

			},

			getLatest: function(){
				$.get(
					'api/events/getLatest',
					_.bind(this.onGetLatest, this)
					).fail(function(err){
						$.publish('getLatest:error', this);	
					});
			},

			onGetLatest: function(events){
				console.log('onGetLatest', events.length);
				this.reset(events);
				this.trigger('getLatest:success', this);

			},

			getTop10: function(){
				$.get(
					'api/events/getTop10',
					_.bind(this.onGetTop10, this)
					).fail(function(err){
						$.publish('getTop10:error', this);	
					});
			},

			onGetTop10: function(events){
				console.log('onGetTop10', events.length);
				this.reset(events);
				this.trigger('getTop10:success', this);

			}



		});

		return EventListCollection;

});