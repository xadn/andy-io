#= require_tree app/models
#= require_tree app/collections
#= require app/views/messages
#= require app/views/localcursor
#= require app/views/cursors

class IndexAppView extends Backbone.View
	initialize: ->
		localCursor		= new App.Models.LocalCursor()
		cursors			= new App.Collections.Cursors()
		localCursorView	= new App.Views.LocalCursor(model: localCursor)
		cursorsView		= new App.Views.Cursors(collection: cursors)

		messages		= new App.Collections.Messages()
		messagesView	= new App.Views.Messages(collection: messages)


$(document).ready ->
	new IndexAppView()


