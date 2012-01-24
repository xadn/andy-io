#= require ../models/cursor

namespace 'App.Views', (exports) ->

	class exports.Cursor extends Backbone.View

		tagName: 'img'

		model: App.Models.Cursor

		OSToIcon:
			Mac : '/images/macCursor.png'
			Windows : '/images/winCursor.png'

		initialize: ->
			_.bindAll @, 'render', 'unrender'
			@model.bind 'change', @render
			@model.bind 'destroy', @unrender
			$(@el).attr 'src', @OSToIcon[@model.get('OS')]

		render: ->
			$(@el).offset
				left: @model.getLeft()
				top: @model.getTop()
			@

		unrender: ->
			$(@el).fadeOut('slow')

