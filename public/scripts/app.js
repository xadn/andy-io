define(['jquery', 'models/localcursor', 'models/cursor-collection', 'views/localcursor', 'views/cursor-collection', '/socket.io/socket.io.js'],
	function($, LocalCursor, CursorCollection, LocalCursorView, CursorCollectionView){

		return {
			initialize: function() {
				var localCursor = new LocalCursor();

				var cursorCollection = new CursorCollection();

				var localCursorView = new LocalCursorView({model: localCursor});

				var cursorCollectionView = new CursorCollectionView({collection: cursorCollection});

				var socket = io.connect();


				localCursor.bind('change', function() {
					socket.emit('updateCursor', localCursor);
				});

				socket.on('updateCursor', cursorCollection.updateData);

				socket.on('deleteCursor', cursorCollection.deleteData);
			}
		};

});