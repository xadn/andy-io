#= require ../collections/messages
#= require ../models/message
#= require message

namespace 'App.Views', (exports) ->

	class exports.Messages extends Backbone.View

		el: $ 'body'

		collection: App.Collections.Messages

		events:
			submit : 'getText'

		initialize: ->
			_.bindAll @, 'render', 'sendMessage', 'appendMessage'
			@collection.bind 'add', @appendMessage

		render: ->
			@appendMessage message for message in @collection.models

		getText: ->
			messageText = $(':input[type=text]').val()
			@sendMessage messageText if messageText
			$(':input[type=text]').val('')

		sendMessage: (messageText) ->
				message = new App.Models.Message text: messageText
				@collection.trigger 'send', message
				@collection.add message

		appendMessage: (message) ->
			messageView = new App.Views.Message model: message
			$('#recievedMessages', @el).prepend(messageView.render().el)

