define([
	'backbone',
	'underscore'
	],function(Backbone, underscore){


		var EventList = Backbone.View.extend({

			$event: null,


			initialize: function(){
				this.collection.bind('getAllEvents:success', this.onGetAllEvents, this);

				this.$event = this.$el.find('.event');
			},

			onGetAllEvents: function(){
				console.log('list-view: onGetAllEvents');

				for (var i = 0; i< this.collection.length; i++){
					var event = this.collection.at(i),
						eventData = event.get('eventDate'),
						$eventClone = this.$event.clone();


					if (i == 0){
						$('.event-container').html(eventData);
					} else {
						$eventClone.find('.event-container').html(eventData);
						this.$el.append($eventClone);
					}
				}
			}
		});

		return EventList;
});