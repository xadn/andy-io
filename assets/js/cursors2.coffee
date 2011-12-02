socket.on "mouseMovement", (data) ->
	unless cursors[data.client_id]
		$("body").append "<img id=\"" + data.client_id + "\" src=\"/images/macCursor.png\"></img>"
		cursors[data.client_id] = $("#" + data.client_id)

	offsetX = data.x * $(window).width()
	offsetY = data.y * $(window).height()

	cursors[data.client_id].offset
		top: offsetY
		left: offsetX


socket.on "clientDisconnect", (data) ->
	if cursors[data.client_id]
		cursors[data.client_id].fadeOut "slow", ->
			cursors[data.client_id].remove()
			delete cursors[data.client_id]


prevPercentX = 0
prevPercentY = 0

onMouseMove = (mouseEvent) ->
	percentX = mouseEvent.pageX / $(window).width()
	percentY = mouseEvent.pageY / $(window).height()
	diffX = Math.abs(prevPercentX - percentX)
	diffY = Math.abs(prevPercentY - percentY)
	if diffX > 0.01 or diffY > 0.01 or diffX + diffY > 0.014
		socket.emit "mouseMovement",
			x: percentX
			y: percentY
			os: osType

		prevPercentX = percentX
		prevPercentY = percentY
		$(document).unbind "mousemove", onMouseMove
		setTimeout (->
			$(document).bind "mousemove", onMouseMove
		), 100