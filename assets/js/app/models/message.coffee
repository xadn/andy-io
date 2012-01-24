#= require ../../lib/utils

namespace 'App.Models', (exports) ->

	class exports.Message extends Backbone.Model

		defaults:
			text: 'hello world'
