#= require ../models/cursor

namespace 'App.Collections', (exports) ->

	class exports.Cursors extends Backbone.Collection

		model: App.Models.Cursor

		initialize: ->
			_.bindAll @, 'updateData', 'deleteData'

		updateData: (data) ->
			cursor = @get data.id

			if cursor
				cursor.set
					x: data.x
					y: data.y
			else
				@add data

		deleteData: (data) ->
			cursor = @get data.id
			cursor.destroy() if cursor

