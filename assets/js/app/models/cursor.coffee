
namespace 'App.Models', (exports) ->

	class exports.Cursor extends Backbone.Model

		defaults:
			x: 0
			y: 0
			os: 'Windows'

		sync: ->

