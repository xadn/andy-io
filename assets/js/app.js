//= require app/models/message
//= require app/models/message-collection
//= require app/views/message-collection

var IndexAppView = Backbone.View.extend({
	initialize: function() {

			var App = {};
			App.Models = {};
			App.Collections = {};
			App.Views = {};
			// Models
			// var localCursor = new LocalCursor();
			// var cursorCollection = new CursorCollection();
			var messageCollection = new App.Collections.Messages();

			// Views
			// var localCursorView = new LocalCursorView({model: localCursor});
			// var cursorCollectionView = new CursorCollectionView({collection: cursorCollection});
			// var messageCollectionView = new MessageCollectionView({collection: messageCollection});

			// Socket.io handlers
			// var socket = io.connect();

			// socket.on('updateCursor', cursorCollection.updateData);

			// socket.on('deleteCursor', cursorCollection.deleteData);

			// socket.on('message', function(data) {
			// 	messageCollection.add(data);
			// });

			// localCursor.bind('change', function() {
			// 	socket.emit('updateCursor', localCursor);
			// });

			// messageCollection.bind('send', function(message) {
			// 	socket.emit('message', message);
			// });
		}
});

new IndexAppView();


