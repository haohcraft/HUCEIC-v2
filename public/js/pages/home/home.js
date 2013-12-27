/**
 * The bootup js for home page
 */
require([
	'jquery',
	'home/controllers/main'

	], function($, Main){

	new Main();

});