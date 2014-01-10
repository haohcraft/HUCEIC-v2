/**
 * The module for subscribing form
 */

define([
	'backbone',
	'jquery',
	'underscore',
	'jquery-form',
	'jquery-placeholder' //just load
	],
	function(Backbone, $, _){

		var SubscribeForm = Backbone.View.extend({

			el: ".form-mailinglist-vertical",

			events: {
				"click .do_subscribe": 'subscribeMailing'
			},

			$error: null,

			$success: null,

			initialize: function(){
				console.log('form-subscribe.js: '+this.$el);

				$error = this.$el.find('.error');
				$success = this.$el.find('.success');

				// set up placeholder
				$('input').placeholder();
			},

			subscribeMailing: function (ev) {
				ev.preventDefault();
				
				this.$el.ajaxSubmit({
					url: '/api/subscribe',
					type: 'POST',
					clearForm: true,  // clear the form when success
					beforeSubmit: this.beforeSubmit,
					success: this.onSuccess,
					error: this.onError
				});

				// !!! Important !!! 
		        // always return false to prevent standard browser submit and page navigation 
		        return false; 

			},


			/**
			 * [beforeSubmit description] Clean the highlights for errors
			 */
			beforeSubmit: function(formData, $form, options){

				// Clean all the error highlights
				_.each($form.find('input'), function(field){
					$(field).css('border-color','#e8e8e8');
				});
				// hide the error msg
				$error.hide();
				$success.hide();

				return true;
			},

			onSuccess: function(res, statusText,  xhr, $form){
				$success.text(res).show();
				if(xhr.status == 200){
					$form.find("input[name='subscribe']").val('Done');

					_.delay(function(){
						$form.find("input[name='subscribe']").val('subscribe');	
					}, 1500);
				}

				
			},

			onError: function(res, status,  xhr, $form){
				var errors = res.responseJSON;
				_.map(errors, function(error){
					if(error.msg){
						$form.find("input[name='"+ error.param+"']").val(error.msg).css('border-color', '#ba0600');
					}else{
						$error.text(error);
					}
				});
				// show error msg
				$error.show();
			}

		});

		return SubscribeForm;

	});