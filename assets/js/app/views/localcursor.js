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
			this.model.setPosition(e.pageX, e.pageY);
		}
	});

});