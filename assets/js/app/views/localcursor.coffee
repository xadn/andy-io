#= require ../models/localcursor

namespace 'App.Views', (exports) ->

	class exports.LocalCursor extends Backbone.View

		el: document

		model: App.Models.LocalCursor

		events:
			mousemove: 'onMouseMove'

		initialize: ->
			_.bindAll @

		onMouseMove: (event) ->
			@model.set
				x: event.pageX
				y: event.pageY
			@model.save()

