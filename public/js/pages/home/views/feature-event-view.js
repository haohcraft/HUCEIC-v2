define([
	'backbone',
	'jquery',
	'underscore',
	'gmap',
	'owlCarousel'  // just load it
	],function(Backbone, $){

		var FeatureEventView = Backbone.View.extend({

			$slideImages: null,
			$slideButtons: null,

			tpl: _.template($('#featuredEventTemplate').html()),


			initialize: function(){
				this.collection.bind('getLatest:success', this.onGetLatest, this);

				this.collection.getLatest();
			},

			onGetLatest: function(){
				console.log('feature-event-view: onGetLatest');
				this.$el.append(this.tpl({
					date: this.collection.at(0).get('eventDate').text,
					address: this.collection.at(0).get('address').text,
					speaker: this.collection.at(0).get('speaker'),
					topic: this.collection.at(0).get('title')
				}));
				this.setUpCarousel();
				this.$el.show();

				this.$el.find('#map').gMap({
					latitude: this.collection.at(0).get('address').lat,
					longitude: this.collection.at(0).get('address').lng,
                    zoom: 16,
                    markers: [{
                    	latitude: this.collection.at(0).get('address').lat,
						longitude: this.collection.at(0).get('address').lng	
                    }]


				});
			},


			setUpCarousel: function(){
				this.$slideButtons = this.$el.find('.buttons-container');
				this.$slideImages = this.$el.find('.images-container');
				this.initCarousel();


			},

			initCarousel: function(){
				// var owlButtons = this.$slideButtons.owlCarousel();
				var owlImages = this.$slideImages.owlCarousel({
					singleItem: true,
					stopOnHover : true,
					navigation: false
					// autoPlay: 3000
				});

				this.$slideButtons.children('div').each(function(index, el){

					$(el).hover(function(ev){
						var index = ev.currentTarget.getAttribute('data-index');
						owlImages.trigger('owl.goTo', index);
					});	

				});

				// for (var el in this.$slideButtons.children('div')){
				// 	$(el).hover(function(ev){
				// 		owlImages.trigger('owl.goto', 1);
				// 	});
				// }
			}

		});

		return FeatureEventView;

});