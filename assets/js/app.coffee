#= require_tree app/models
#= require_tree app/collections
#= require app/views/messages
#= require app/views/localcursor
#= require app/views/cursors

class IndexAppView extends Backbone.View
	initialize: ->

		# Models
		localCursor = new App.Models.LocalCursor()
		cursorCollection = new App.Collections.Cursors()
		messageCollection = new App.Collections.Messages()

		# Views
		localCursorView = new App.Views.LocalCursor(model: localCursor)
		cursorCollectionView = new App.Views.Cursors(collection: cursorCollection)
		messageCollectionView = new App.Views.Messages(collection: messageCollection)

		# Socket.io handlers
		socket = io.connect()

		socket.on 'updateCursor', cursorCollection.updateData

		socket.on 'deleteCursor', cursorCollection.deleteData

		socket.on 'message', (data) ->
			messageCollection.add data

		localCursor.bind 'change', ->
			socket.emit 'updateCursor', localCursor

		messageCollection.bind 'send', (message) ->
			socket.emit 'message', message

new IndexAppView()


