//= require ../models/message-collection
//= require ../models/message
//= require message

var MessageCollectionView = Backbone.View.extend({
	el: $('body'),

	collection: App.Collections.Messages,

	events: {
		'submit' : 'sendMessage'
	},

	initialize: function(){
		_.bindAll(this, 'render', 'sendMessage', 'appendMessage');
		this.collection.bind('add', this.appendMessage);
	},

	render: function(){
		_(this.collection.models).each(function(message){
			this.appendMessage(message);
		}, this);
	},

	sendMessage: function(){
		var messageText = $(':input[type=text]').val();
		$(':input[type=text]').val('');
		if (messageText) {
			var message = new Message({text: messageText});
			this.collection.trigger('send', message);
			this.collection.add(message);
		}
	},

	appendMessage: function(message){
		var messageView = new MessageView({
			model: message
		});
		$('#recievedMessages', this.el).prepend(messageView.render().el);
	}
});

