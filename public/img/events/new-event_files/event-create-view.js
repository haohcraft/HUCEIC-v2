
define([
	'backbone',
	'jquery',
	'utils',
	'underscore',
	'store',
	'pen-markdown', //just load
	'pubsub' //just load,
	'addresspicker'
	],function(Backbone, $, Utils, _, Store){

		var EventCreateView = Backbone.View.extend({

			$titleField: null,
            $speakerField: null,
            $descriptionField: null,
            $typeField: null,
			$newEvent: null,

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
				
				// Set up text editor
				// this.setUpPen();

				// Load previous data
				// this.loadState();

				
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
				this.$newEvent = this.$el.find('.event-new-container');
				// Using document.querySelector is necessary
				// for Utils.getText()
				this.$titleField = document.querySelector('.title'); 
                this.$speakerField = document.querySelector('.speaker');
                this.$descriptionField = document.querySelector('.description');
                this.$typeField = document.querySelector('.type');
			},

			/**
			 * [setUpPen description]
			 */
			setUpPen: function(){

				var options = {
				  editor: this.el, // {DOM Element} [required]
				  class: 'event-new', // {String} class of the editor,
				  debug: false, // {Boolean} false by default
				  stay: false,
				  textarea: '<textarea name="content"></textarea>', // fallback for old browsers
				  list: [
				    'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
				    'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
				  ] // editor menu list
				};

				this.Editor  = new Pen(options);

			},
			/**
			 * [createEvent description]
			 * @param  {[type]} ev [description]
			 * @return {[type]}    [description]
			 */
			createEvent: function(ev){
				ev.preventDefault();

				

				this.setField();
                var newEventData = {
					'eventData': this.$newEvent.html(),
					'title': Utils.getText(this.$titleField),
					'speaker': Utils.getText(this.$speakerField),
					'type': Utils.getText(this.$typeField),
					'description': Utils.getText(this.$descriptionField)
				};

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

				Store.set(this.NEW_EVENT, this.$newEvent.html());

			},

			loadState: function(){
				
				if (!Utils.supportsHtmlStorage()){
					return;
				}

				if(Store.get(this.NEW_EVENT)){
					this.$newEvent.html(Store.get(this.NEW_EVENT));
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