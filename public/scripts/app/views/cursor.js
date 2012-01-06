define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Backbone.View.extend({
		tagName: 'img',

		model: Cursor,

		OSToIcon: {
			'Mac' : '/images/macCursor.png',
			'Windows' : '/images/winCursor.png'
		},

		initialize: function() {
			_.bindAll(this, 'render', 'unrender');
			this.model.bind('change', this.render);
			$(this.el).attr('src', this.OSToIcon[this.model.get('OS')]);
		},

		render: function() {
			$(this.el).offset({
				left: this.model.getLeft(),
				top: this.model.getTop()
			});
			return this;
		},

		unrender: function() {
			$(this.el).fadeOut('slow');
		}
	});

});