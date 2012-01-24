#= require cursor

namespace 'App.Models', (exports) ->

	class exports.LocalCursor extends App.Models.Cursor

		initialize: ->
			_.bindAll @, 'getOS'
			this.set OS: @getOS()

		getOS: ->
			if ~navigator.appVersion.indexOf 'Mac'
				'Mac'
			else
				'Windows'
