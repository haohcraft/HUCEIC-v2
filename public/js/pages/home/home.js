/**
 * The bootup js for home page
 */
require([
	'jquery',
	'pages/home/controllers/main'

	], function($, Main){

	new Main();

});