/**
 * The module for subscribing form
 */

define([
	'backbone',
	'jquery',
	'underscore',
	'jquery-form'
	],
	function(Backbone, $, _){

		var SubscribeForm = Backbone.View.extend({

			isSuccess: false,
			
			// data: {
			// 	'firstname':'',
			// 	'lastname':'',
			// 	'email':''
			// },

			el: "#form-mailinglist-vertical",

			events: {
				"click .do_subscribe": 'subscribeMailing'
			},

			initialize: function(){
				console.log('form-subscribe.js: '+this.$el);
			},

			subscribeMailing: function(ev){
				ev.preventDefault();
				
				this.$el.ajaxSubmit({
					url: '/subscribe',
					success: this.onSuccess,
					error: this.onError
				});
			},

			onSuccess: function(responseText, statusText,  xhr, $form){
				this.isSuccess = true;
				console.log('the form is sucessed: '+responseText+'//statusText: '+ statusText);
			},

			onError: function(res, status,  xhr, $form){
				var errors = $.parseJSON(res.responseText);
				_.map(errors, function(error){
					$("input[name='"+ error.param+"']").val(error.msg);
				});
			}

		});

		return SubscribeForm;

	});