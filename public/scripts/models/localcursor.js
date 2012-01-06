define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Cursor.extend({
		initialize: function() {
			_.bindAll(this, 'onMouseEvent', 'getOS', 'sync');
			$(document).bind('mousemove', this.onMouseEvent)
			this.set({OS: this.getOS()});
		},

		onMouseEvent: function(mouseEvent) {
			this.setLeft(mouseEvent.pageX);
			this.setTop(mouseEvent.pageY);
			this.save();
		},

		getOS: function() {
			return ~navigator.appVersion.indexOf('Mac') ? 'Mac' : 'Windows'
		},

		sync: function(method, model, options) {
			switch (method) {
				case 'create':
					this.set({id : 1});
					window.socket.emit('createCursor', model);
				case 'update':
					window.socket.emit('updateCursor', model);
			}
		}
	});

});