#= require ../models/message

namespace 'App.Collections', (exports) ->

	class exports.Messages extends Backbone.Collection

		model: App.Models.Message

		socket: io.connect '/messages'

		initialize: ->
			_.bindAll @
			@bind 'send', @send
			@socket.on 'new', @recieve

		send: (message) ->
			@socket.emit 'new', message

		recieve: (data) ->
			@add data

