#= require ../models/localcursor

namespace 'App.Views', (exports) ->

	class exports.LocalCursor extends Backbone.View

		el: document

		model: App.Models.LocalCursor

		events:
			mousemove: 'onMouseMove'

		initialize: ->
			_.bindAll @, 'onMouseMove'

		onMouseMove: (event) ->
			@model.setPosition event.pageX, event.pageY
