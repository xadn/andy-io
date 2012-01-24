#= require ../models/message

namespace 'App.Views', (exports) ->

	class exports.Message extends Backbone.View

		tagName: 'li'

		model: App.Models.Message

		initialize: ->
			_.bindAll @, 'render', 'unrender'
			@model.bind 'change', @render

		render: ->
			$(@el).html '<div class="message">'+@model.escape('text')+'</div>'
			@

		unrender: ->
			$(@el).remove()

