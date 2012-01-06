define(['jquery', 'underscore', 'backbone', 'models/cursor'], function($, _, Backbone, Cursor){

	return Backbone.Collection.extend({
		model: Cursor
	});

});