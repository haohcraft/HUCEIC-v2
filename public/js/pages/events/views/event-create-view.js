
define([
	'backbone',
	'jquery',
	'utils',
	'underscore',
	'store',
	'jquery-form', //just load
	'pubsub', //just load
	'jquery-placeholder', //just load
	'datetimepicker',
	'addresspicker' 
	],function(Backbone, $, Utils, _, Store){

		var EventCreateView = Backbone.View.extend({

			$titleField: null,
            $speakerField: null,
            $descriptionField: null,
            $typeField: null,
			$dateField: null,
			$addressField: null,
			$latField: null,
			$lngField: null,


			newEventData: null,

			Editor: null,

			NEW_EVENT: 'newEvent',

			

			events: {
				'click .do_createEvent': 'createEvent',
				'click .event-container': 'saveState',
				'keyup': 'saveState'

			},


			initialize: function(){
				
				this.setSubscribes();

				this.setField();

				// Load previous data
				this.loadState();

				
			},

			setSubscribes: function(){
				$.subscribe('newEvent:success', _.bind(this.onNewEventSuccess, this));
				$.subscribe('newEvent:error', _.bind(this.onNewEventError, this));
			},
			/**
			 * bindElement
			 * @return {[type]} [description]
			 */
			setField: function(){
				this.$titleField = this.$el.find('input[name="title"]'); 
                this.$speakerField = this.$el.find('input[name="speaker"]');
                this.$descriptionField = this.$el.find('textarea[name="description"]');
                this.$typeField = this.$el.find('input[name="type"]');
                this.$dateField = this.$el.find('input[name="date"]');
                this.$addressField = this.$el.find('input[name="address"]');
                this.$latField = this.$el.find('input[name="lat"]');
                this.$lngField = this.$el.find('input[name="lng"]');
                //pick a date
                this.$dateField.datetimepicker();

                //pick a address
                this.$addressField.addresspicker({
                	elements: {
                		lat: '.lat',
                		lng: '.lng'
                	}

                });
			},

			/**
			 * [createEvent description]
			 * @param  {[type]} ev [description]
			 * @return {[type]}    [description]
			 */
			createEvent: function(ev){
				ev.preventDefault();

				this.saveState();
                this.model.save(this.newEventData);


			},
			/**
			 * Save the fields on the clien side
			 * @return {[type]} [description]
			 */
			saveState: function(){

				this.newEventData = {
					'title': Utils.trim(this.$titleField.val()),
					'speaker': Utils.trim(this.$speakerField.val()),
					'type': Utils.trim(this.$typeField.val()),
					'description': Utils.trim(this.$descriptionField.val()),
					'date': Utils.trim(this.$dateField.val()),
					'address': Utils.trim(this.$addressField.val()),
					'lat': Utils.trim(this.$latField.val()),
					'lng': Utils.trim(this.$lngField.val())
				};

				Store.set(this.NEW_EVENT, this.newEventData);

			},

			loadState: function(){
				
				var previousData = Store.get(this.NEW_EVENT);

				if(previousData){

					 
					_.each(this.$el.find('input'), function(field){
						var name = $(field).attr('name');
						$(field).val(previousData[name]);
					});
				}


			},

			onNewEventSuccess: function(){
				console.log('onNewEventSuccess');
				Store.remove(this.NEW_EVENT);

			},

			onNewEventError: function(){
				console.log('onNewEventError');
			}



		});

		return EventCreateView;
});