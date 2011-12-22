(function($){

	var Message = Backbone.Model.extend({
		defaults: {
			text: 'hello world'
		},
		sync: function(method, model, options) {
			switch (method) {
				case 'create':
					window.socket.emit('message', model);
					break;
			}
		}
	});

	var MessageList = Backbone.Collection.extend({
		model: Message
	});

	var MessageView = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			_.bindAll(this, 'render', 'unrender');
			this.model.bind('change', this.render);
		},
		render: function(){
			$(this.el).html('<div class="message">'+this.model.escape('text')+'</div>');
			return this;
		},
		unrender: function(){
			$(this.el).remove();
		},
	});

	var MessageListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'submit' : 'sendMessage'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'sendMessage', 'recieveMessage', 'appendMessage');
			this.collection = new MessageList();
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

	var messageListView = new MessageListView();

	window.socket.on('message', function(data){
		messageListView.recieveMessage(data);
	});

})(jQuery);