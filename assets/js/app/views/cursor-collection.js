define(['jquery', 'underscore', 'backbone', 'models/cursor-collection', 'views/cursor'], function($, _, Backbone, CursorCollection, CursorView){

	return Backbone.View.extend({
		el: $('body'),

		collection: CursorCollection,

		initialize: function(){
			_.bindAll(this, 'appendCursor');
			this.collection.bind('add', this.appendCursor);
		},

		appendCursor: function(cursor) {
			var cursorView = new CursorView({ model: cursor });
			$(this.el).append(cursorView.render().el);
		}
	});

});