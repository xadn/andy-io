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
			$(this.el).html('<span style="color:black;">'+this.model.get('text')+'</span>');
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
			var message = new Message();
			message.set({
				text: $(':input[type=text]').val()
			});
			message.save();
			this.collection.add(message);
			$(':input[type=text]').val('');
		},
		recieveMessage: function(message){
			this.collection.add(message);
		},
		appendMessage: function(message){
			var messageView = new MessageView({
				model: message
			});
			$('#recievedMessages', this.el).append(messageView.render().el);
		}
	});

	var messageListView = new MessageListView();

	window.socket.on('message', function(data){
		messageListView.recieveMessage(data);
	});

})(jQuery);