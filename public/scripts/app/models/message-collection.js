define(['jquery', 'underscore', 'backbone', 'models/message'], function($, _, Backbone, Message){

	return Backbone.Collection.extend({
		model: Message
	});

});