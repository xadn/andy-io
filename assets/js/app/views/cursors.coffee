#= require ../collections/cursors cursor

namespace 'App.Views', (exports) ->

	class exports.Cursors extends Backbone.View

		el: $ 'body'

		collection: App.Collections.Cursors

		initialize: ->
			_.bindAll @, 'appendCursor'
			@collection.bind 'add', @appendCursor

		appendCursor: (cursor) ->
			cursorView = new App.Views.Cursor model: cursor
			$(@el).append cursorView.render().el

