
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
                //pick a date
                this.$dateField.datetimepicker();
                this.$addressField.addresspicker();
			},

			/**
			 * [createEvent description]
			 * @param  {[type]} ev [description]
			 * @return {[type]}    [description]
			 */
			createEvent: function(ev){
				ev.preventDefault();

                this.model.save(newEventData);


			},
			/**
			 * Save the fields on the clien side
			 * @return {[type]} [description]
			 */
			saveState: function(){
				
				if (!Utils.supportsHtmlStorage()){
					return;
				}

				this.newEventData = {
					'title': this.$titleField.val(),
					'speaker': this.$speakerField.val(),
					'type': this.$typeField.val(),
					'description': this.$descriptionField.val(),
					'date': this.$dateField.val(),
					'address': this.$addressField.val()
				};

				Store.set(this.NEW_EVENT, this.newEventData);

			},

			loadState: function(){
				
				if (!Utils.supportsHtmlStorage()){
					return;
				}

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