/**
 * The module for subscribing form
 */

define([
	'backbone',
	'jquery-form',
	'jquery'
	],
	function(Backbone, JForm, $){

		var SubscribeForm = Backbone.View.extend({

			isSuccess: false,
			
			data: {
				'firstname':'',
				'lastname':'',
				'email':''
			},

			el: "#form-mailinglist-vertical",

			events: {
				"click .do_subscribe": 'subscribeMailing'
			},

			initialize: function(){
				console.log('form-subscribe.js: '+this.$el);
			},

			subscribeMailing: function(ev){
				ev.preventDefault();
				console.log('the .do_subscribe button has been clicked');
				this.data.firstname = this.$el.find('first_name').val();
				this.data.lastname = this.$el.find('last_name').val();
				this.data.email = this.$el.find('email').val();
				
				this.$el.ajaxSubmit({
					url: '/subscribe',
					data: this.data,
					success: this.onSuccess,
					error: this.onError
				});
			},

			onSuccess: function(responseText, statusText,  xhr, $form){
				this.isSuccess = true;
				console.log('the form is sucessed: '+responseText+'//statusText: '+ statusText);
			},

			onError: function(res, status,  xhr, $form){
				var responseText = res.responseText;
				console.log('the form is failed: '+responseText+'//statusText: '+ status);	
			}

		});

		return SubscribeForm;

	});