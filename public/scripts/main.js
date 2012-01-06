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

	require(['backbone', 'io'], function() {
		console.log('backbone loaded');
	});
}());