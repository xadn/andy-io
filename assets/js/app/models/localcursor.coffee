#= require cursor

namespace 'App.Models', (exports) ->

	class exports.LocalCursor extends App.Models.Cursor

		socket: io.connect '/cursors'

		initialize: ->
			_.bindAll @
			this.set os: @getOS()

		getOS: ->
			if ~navigator.appVersion.indexOf 'Mac'
				'Mac'
			else
				'Windows'

		sync: ->
			@socket.emit 'update', @
