#= require ../models/cursor

namespace 'App.Views', (exports) ->

	class exports.Cursor extends Backbone.View

		tagName: 'img'

		model: App.Models.Cursor

		OSToIcon:
			Mac : '/images/macCursor.png'
			Windows : '/images/winCursor.png'

		initialize: ->
			_.bindAll @
			@model.bind 'change', @render
			@model.bind 'destroy', @unrender

			$(@el).attr 'src', @OSToIcon[@model.get('os')]
			$(@el).css('z-index', 1)

		render: ->
			$(@el).offset
				left: @model.get('x')
				top: @model.get('y')
			@

		unrender: ->
			$(@el).fadeOut('slow')

