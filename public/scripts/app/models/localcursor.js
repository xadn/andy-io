define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Cursor.extend({
		initialize: function() {
			_.bindAll(this, 'getOS');
			// _.bindAll(this, 'getOS', 'sync');
			this.set({OS: this.getOS()});
		},

		getOS: function() {
			return ~navigator.appVersion.indexOf('Mac') ? 'Mac' : 'Windows'
		},

		// sync: function(method, model, options) {

		// 	// console.log( JSON.stringify(model) );

		// 	switch (method) {
		// 		case 'create':
		// 			// this.set({id : 1});
		// 		case 'update':
		// 			// this.get('socket').emit('updateCursor', model);
		// 	}
		// }
	});

});