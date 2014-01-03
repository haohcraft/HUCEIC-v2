/**
 * Utility JS
 */

define([],function(){
	var utils = {
		/**
		 * Check whether or not the Browser supports the 'localStorage'
		 * @return {[type]} [description]
		 */
		supportsHtmlStorage: function(){
			try {
				return 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
				return false;
			}
		}

	};

	return utils;
})

