define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){

	return Backbone.Model.extend({
		defaults: {
			x: 0,
			y: 0
		},

		initialize: function() {
			_.bindAll(this, 'setPosition', 'getLeft', 'getTop', 'sync');
		},

		setPosition: function(left, top) {
			this.set({
				x: left / $(window).height(),
				y: top /$(window).width()
			});
		},

		getLeft: function() {
			return this.get('x') * $(window).height();
		},

		getTop: function() {
			return this.get('y') * $(window).width();
		},

		sync: function() {}
	});

});