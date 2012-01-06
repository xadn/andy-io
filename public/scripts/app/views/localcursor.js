define(['jquery', 'underscore', 'backbone', 'models/localcursor'], function($, _, Backbone, LocalCursor){

	return Backbone.View.extend({
		el: document,

		model: LocalCursor,

		events: {
			'mousemove': 'onMouseMove'
		},

		initialize: function() {
			_.bindAll(this, 'onMouseMove');
		},

		onMouseMove: function(e) {
			this.model.setLeft(e.pageX);
			this.model.setTop(e.pageY);
			this.model.save();
		}
	});

});