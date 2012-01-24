define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Cursor.extend({
		initialize: function() {
			_.bindAll(this, 'getOS');
			this.set({OS: this.getOS()});
		},

		getOS: function() {
			return ~navigator.appVersion.indexOf('Mac') ? 'Mac' : 'Windows'
		}
	});

});