define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Backbone.Collection.extend({
		model: Cursor,

		initialize: function(){
			_.bindAll(this, 'updateData');
		},

		updateData: function(data) {
			var cursor = this.get(data.id);

			if (cursor) {
				cursor.set({x: data.x, y: data.y});
			} else {
				this.add(data);
			}
		}
	});

});