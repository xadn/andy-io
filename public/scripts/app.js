define(
	['jquery',
	'models/localcursor', 'models/cursor-collection', 'views/localcursor', 'views/cursor-collection',
	'models/message-collection', 'views/message-collection', 'views/message',
	'/socket.io/socket.io.js'],
	function($, LocalCursor, CursorCollection, LocalCursorView, CursorCollectionView,
		MessageCollection, MessageCollectionView, MessageView){

		return {
			initialize: function() {

				var socket = io.connect();

				var localCursor = new LocalCursor();

				var cursorCollection = new CursorCollection();

				var localCursorView = new LocalCursorView({model: localCursor});

				var cursorCollectionView = new CursorCollectionView({collection: cursorCollection});

				var messageCollection = new MessageCollection();

				var messageCollectionView = new MessageCollectionView({collection: messageCollection});


				socket.on('updateCursor', cursorCollection.updateData);

				socket.on('deleteCursor', cursorCollection.deleteData);

				socket.on('message', function(data) {
					messageCollection.add(data);
				});

				localCursor.bind('change', function() {
					socket.emit('updateCursor', localCursor);
				});

				messageCollection.bind('send', function(message) {
					socket.emit('message', message);
				});
			}
		};

});