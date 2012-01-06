(function () {
	'use strict';

	require.config({
		paths: {
			io: '/socket.io/socket.io',
			jquery: 'libs/jquery',
			underscore: 'libs/underscore',
			backbone: 'libs/backbone'
		}
	});

	require(['app'], function() {
	});
}());