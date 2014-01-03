
define([
	'backbone',
	'jquery',
	'utils',
	'underscore',
	'pen-markdown' //just load
	],function(Backbone, $, Utils, _){

		var EventCreateView = Backbone.View.extend({

			$titleField: null,
			$speakerField: null,
			$descriptionField: null,

			Editor: null,

			el: '.event-new',

			events: {
				'click .do_createEvent': 'createEvent',
				'keyup': 'saveState'
			},

			initialize: function(){
				// Grad the fields
				this.grabFields();
				
				// Set up text editor
				this.setUpPen();

				// Load previous data
				this.loadState();

				
			},
			/**
			 * [grabFields description]
			 * @return {[type]} [description]
			 */
			grabFields: function(){
				this.$titleField = this.$el.find('.title');
				this.$speakerField = this.$el.find('.speaker');
				this.$descriptionField = this.$el.find('.description');
			},
			/**
			 * [setUpPen description]
			 */
			setUpPen: function(){

				var options = {
				  editor: this.el, // {DOM Element} [required]
				  class: 'event-new', // {String} class of the editor,
				  debug: false, // {Boolean} false by default
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

				var titleHtml = this.$titleField.html();
				var speakerHtml = this.$speakerField.html();
				var descriptionHtml = this.$descriptionField.html();


			},
			/**
			 * Save the fields on the clien side
			 * @return {[type]} [description]
			 */
			saveState: function(){
				
				if (!Utils.supportsHtmlStorage()){
					return;
				}

				localStorage['title'] = this.$titleField.html();
				localStorage['speaker'] = this.$speakerField.html();
				localStorage['description'] = this.$descriptionField.html();

			},

			loadState: function(){
				
				if (!Utils.supportsHtmlStorage()){
					return;
				}

				if(localStorage['title']){
					this.$titleField.html(localStorage['title']);
				}		
				if(localStorage['speaker']){
					this.$speakerField.html(localStorage['speaker']);
				}		
				if(localStorage['description']){
					this.$descriptionField.html(localStorage['description']);
				}

			},


		});

		return EventCreateView;
});