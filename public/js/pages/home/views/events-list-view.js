

define([
	'backbone',
	'jquery'
	], 
	function(Backbone, $){

		var EventsListView = Backbone.View.extend({

			el: '#carousel',

			initialize: function(){
				this.render();
			},

			render: function(){
				this.collection.fetch({
					success: function(res){
						console.log('getEvents success: '+res);
					},

					error: function(res){
						console.log(res, 'errors!!');
					}
				});
			}


		});


		return EventsListView;

});