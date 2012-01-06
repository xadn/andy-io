(function () {
	'use strict';

	require.config({
		paths: {
			models: 	'app/models',
			views: 		'app/views',
			routers: 	'app/routers',
			jquery: 	'libs/jquery',
			underscore: 'libs/underscore',
			backbone: 	'libs/backbone',
			domready: 	'libs/domReady'
		}
	});

	require(['app'], function(App) {
		App.initialize();
	});
}());