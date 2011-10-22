express = require('express')
app	= express.createServer()
io = require('socket.io').listen(app)

app.set 'view engine', 'jade'
app.use express.static(__dirname + '/public')
app.listen process.env.PORT || 5000
 
app.get '/', (request, response) ->
	response.render 'index', { title: 'andy.io' }
 
app.get '/say/:text', (request, response) ->
	response.send request.params.text
	sockets.forEach (socket) -> socket.emit 'message', { message: request.params.text }

sockets = []

io.sockets.on 'connection', (socket) ->
	sockets.push socket
	socket.emit 'message', { message: "hello world" }
	console.log "sent message"



	# setInterval ( ->
	# 	socket.emit 'message', { message: "hello world" }
	# 	console.log "sent message"
	# ), 2000