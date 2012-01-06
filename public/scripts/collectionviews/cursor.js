define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Backbone.View.extend({
		el: $('body'),

		initialize: function(){
			_.bindAll(this, 'onUpdateCursor', 'onDeleteCursor', 'appendCursor');
			this.collection = new RemoteCursorCollection();
			this.collection.bind('add', this.appendCursor);
			window.socket.on('updateCursor', this.onUpdateCursor);
			window.socket.on('deleteCursor', this.onDeleteCursor);
		},

		onUpdateCursor: function(remoteCursor) {
			var cursor = this.collection.get(remoteCursor.id)
			if (!cursor) {
				this.collection.add(remoteCursor);
			} else {
				cursor.set({
					x: remoteCursor.x,
					y: remoteCursor.y
				});
			}
		},

		onDeleteCursor: function(remoteCursor) {
			var cursor = this.collection.get(remoteCursor.id);
			cursor.el.fadeOut('slow');
			this.collection.remove(cursor);
		},

		appendCursor: function(remoteCursor) {
			var remoteCursorView = new RemoteCursorView({
				model: remoteCursor
			});
			$(this.el).append(remoteCursorView.render().el);
		}
	});

});