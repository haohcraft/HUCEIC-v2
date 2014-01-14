


define([
	'backbone',
	'jquery',
	'owlCarousel'
	], 
	function(Backbone, $){

		var EventsListView = Backbone.View.extend({

			scrollCount: null,

			$carousel: null,
			$prev : null,
			$next : null,


			tpl: _.template($('#template-eventlist-horizontal-item').html()),


			initialize: function(){


				this.collection.bind('getTop10:success', this.onGetTop10, this);

				this.collection.getTop10();
			},

			render: function(){

				// Starting from i = 1 to ignore the upcoming event
				for (var i = 1; i< this.collection.length; i++){
					var event = this.collection.at(i),
						title = event.get('title'),
						date = event.get('eventDate'),
						description = event.get('description'),
						speaker = event.get('speaker'),
						address = event.get('address').text,
						mongoId = event.get('_id');

					this.$el.append(this.tpl({
						index: i,
						eventId: mongoId,
						title: title,
						speaker: speaker,
						date: date.text,
						description: description,
						address: address,
						admin: $('.event-new').length != 0 ? 'admin': "" //TODO: need a better logic
					}));
				}
			},

			onGetTop10: function(){
				console.log('event-carousel-view: onGetTop10');
				this.render();
				this.setUpCarousel();

				
			},


			setUpCarousel: function(){
				this.$carousel = this.$el;
				this.$prev = $('.jcarousel-prev');
				this.$next = $('.jcarousel-next');
				this.initCarousel();
			},

			initCarousel: function(){

				var owl = this.$carousel.owlCarousel({
					items: 3,

					itemsCustom: [[0, 1],[768,2],[979, 3], [1199, 3]]

				});

				// navigator
				this.$prev.click(function(){
					owl.trigger('owl.prev');
				});

				this.$next.click(function(){
					owl.trigger('owl.next');
				});



			}

		});


		return EventsListView;

});