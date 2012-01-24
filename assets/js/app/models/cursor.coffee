
namespace 'App.Models', (exports) ->

	class exports.Cursor extends Backbone.Model

		defaults:
			x: 0
			y: 0

		initialize: ->
			_.bindAll @, 'setPosition', 'getLeft', 'getTop', 'sync'

		setPosition: (left, top) ->
			this.set
				x: left / $(window).height()
				y: top /$(window).width()

		getLeft: ->
			@get('x') * $(window).height();

		getTop: ->
			@get('y') * $(window).width();

		sync: ->

