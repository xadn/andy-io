define(['jquery', 'underscore', 'backbone', 'models/cursor-collection', 'views/cursor'], function($, _, Backbone, CursorCollection, CursorView){

	return Backbone.View.extend({
		el: $('body'),

		model: CursorCollection,

		initialize: function(){
			_.bindAll(this, 'onUpdateCursor', 'onDeleteCursor', 'appendCursor');
			this.collection = new CursorCollection();
			this.collection.bind('add', this.appendCursor);
			window.socket.on('updateCursor', this.onUpdateCursor);
			window.socket.on('deleteCursor', this.onDeleteCursor);
		},

		onUpdateCursor: function(cursor) {
			var cursor = this.collection.get(cursor.id)
			if (!cursor) {
				this.collection.add(cursor);
			} else {
				cursor.set({
					x: cursor.x,
					y: cursor.y
				});
			}
		},

		onDeleteCursor: function(cursor) {
			var cursor = this.collection.get(cursor.id);
			cursor.el.fadeOut('slow');
			this.collection.remove(cursor);
		},

		appendCursor: function(cursor) {
			var cursorView = new CursorView({ model: cursor });
			$(this.el).append(cursorView.render().el);
		}
	});

});