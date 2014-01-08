define([
	'backbone',
	'underscore',
	'jquery',
	'pubsub' //just load
	],function(Backbone, underscore, $){


		var EventList = Backbone.View.extend({

			$event: null,
			deletedEvent: null,

			tpl: _.template($('#template-eventlist-item').html()),

			events: {
				'click .do_deleteEvent': 'deleteEvent'
			},


			initialize: function(){
				this.collection.bind('getAllEvents:success', this.onGetAllEvents, this);
				this.collection.on('change', _.bind(this.render, this));
				$.subscribe('deleteEvent: success', _.bind(this.onEventDeleteSucess, this));
				$.subscribe('newEvent:success', _.bind(this.onNewEventSuccess, this));

				this.$event = this.$el.find('.event');
			},

			render: function(){

				for (var i = 0; i< this.collection.length; i++){
					var event = this.collection.at(i),
						eventData = event.get('eventDate'),
						$eventClone = this.$event.clone();

					var mongoId = event.get('_id');

					this.$el.append(this.tpl({
						index: i,
						eventId: mongoId,
						eventData: eventData,
						admin: "admin"
					}));
				}

			},

			onGetAllEvents: function(){
				console.log('list-view: onGetAllEvents');
				this.render();
				
			},

			deleteEvent: function(ev){

				console.log('event-list-view: deleteEvent');
				this.deletedEvent = ev.currentTarget.parentElement;

				var mongoId = this.deletedEvent.getAttribute('data-eventId'),
					collectionIndex = this.deletedEvent.getAttribute('data-index');

				this.collection.remove(this.collection.at(collectionIndex));
				$.publish('eventCollection:delete', [collectionIndex, mongoId]);
				
			},

			onEventDeleteSucess: function(){
				console.log('event-list-view: onEventDeleteSucess');
				$(this.deletedEvent).hide();

			},

			onNewEventSuccess: function(){
				console.log('event-list-view: onNewEventSuccess');
				this.$el.html('');
				this.collection.fetch();
			}


		});

		return EventList;
});