define(['jquery', 'models/localcursor', 'models/cursor-collection', 'views/localcursor', 'views/cursor-collection', '/socket.io/socket.io.js'],
	function($, LocalCursor, CursorCollection, LocalCursorView, CursorCollectionView){

		console.log('app loaded');

		var socket = io.connect();

		var localCursor = new LocalCursor({socket: socket});

		var localCursorView = new LocalCursorView({model: localCursor});

});