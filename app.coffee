express = require('express')
app	= express.createServer()
io = require('socket.io').listen(app)
_ = require('underscore')

app.set 'view engine', 'jade'
app.use express.static(__dirname + '/public')
# app.use require('connect-assets')()
app.use express.bodyParser()
app.listen 8080

app.get '/', (request, response) ->
	response.render 'index', { title: 'andy.io' }

sockets = []

io.sockets.on 'connection', (client) ->
	sockets.push client
	client.emit 'message', { message: "hello world" }

	client.on 'updateCursor', (data) ->
		_(sockets).without(client).forEach (socket) -> socket.emit 'updateCursor', _(data).extend {id : Number client.id}

	client.on 'message', (data) ->
		_(sockets).without(client).forEach (socket) -> socket.emit 'message', data

	client.on 'disconnect', ->
		sockets = _(sockets).without(client)
		sockets.forEach (socket) -> socket.emit 'deleteCursor', {id : Number client.id}
