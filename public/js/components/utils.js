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
		},

		getText: function(el){
			ret = '';
			var length = el.childNodes.length;
			for(var i = 0; i<length; i++){
				var node = el.childNodes[i];
				if(node.nodeType != 8){
					if(node.nodeType != 1){
						ret += node.nodeValue;
					} else {
						ret += this.getText(node);
					}
				}
			}

			return this.trim(ret)


		},

		trim: function(str){
			return str.replace(/^\s+|\s+$/g, '');
		}

	};

	return utils;
})

