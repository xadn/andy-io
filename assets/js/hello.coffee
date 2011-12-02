(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){
    success();
  }

  var Message = Backbone.Model.extend({
    defaults: {
      text: 'hello world'
    }
  });

  var MessageList = Backbone.Collection.extend({
    model: Message
  });

  var MessageView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click span.delete': 'remove'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove'); // every function that uses 'this' as the current object should be in here

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('text')+'</span>');
      return this; // for chainable calls, like .render().el
    },

    unrender: function(){
      $(this.el).remove();
    },

    remove: function(){
      this.model.destroy();
    }
  });


  var MessageListView = Backbone.View.extend({
    el: $('body'),
    events: {
      'submit' : 'addMessage'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addMessage', 'appendMessage'); // every function that uses 'this' as the current object should be in here

      this.collection = new MessageList();
      this.collection.bind('add', this.appendMessage); // collection event binder

      this.render();
    },

    render: function(){
      _(this.collection.models).each(function(message){ // in case collection is not empty
        appendMessage(message);
      }, this);
    },

    addMessage: function(){
      var message = new Message();
      message.set({
        text: $(':input[type=text]').val()
      });
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
})(jQuery);