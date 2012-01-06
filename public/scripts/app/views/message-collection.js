define(['jquery', 'underscore', 'backbone', 'models/message-collection', 'views/message'], function($, _, Backbone, MessageCollection, MessageView){

	return Backbone.View.extend({
		el: $('body'),

		collection: MessageCollection,

		events: {
			'submit' : 'sendMessage'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'sendMessage', 'recieveMessage', 'appendMessage');

			this.collection.bind('add', this.appendMessage);

			this.render();
		},

		render: function(){
			_(this.collection.models).each(function(message){
				appendMessage(message);
			}, this);
		},

		sendMessage: function(){
			var messageText = $(':input[type=text]').val();
			$(':input[type=text]').val('');
			if (messageText) {
				var message = new Message({text: messageText});
				message.save();
				this.collection.add(message);
			}
		},

		recieveMessage: function(message){
			this.collection.add(message);
		},

		appendMessage: function(message){
			var messageView = new MessageView({
				model: message
			});
			$('#recievedMessages', this.el).prepend(messageView.render().el);
		}
	});

});