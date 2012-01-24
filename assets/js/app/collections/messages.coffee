#= require ../models/message

namespace 'App.Collections', (exports) ->

	class exports.Messages extends Backbone.Collection

		model: App.Models.Message
