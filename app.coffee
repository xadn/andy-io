express = require('express')
app	= express.createServer()
io = require('socket.io').listen(app)

app.set 'view engine', 'jade'
app.use express.static(__dirname + '/public')
app.use express.bodyParser()
app.listen process.env.PORT || 5000

sockets = []

io.configure ->
	io.set "transports", ["xhr-polling"]
	io.set "polling duration", 10
 
app.get '/', (request, response) ->
	response.render 'index', { title: 'andy.io' }

app.post '/messages', (request, response) ->
	sockets.forEach (socket) -> socket.emit 'message', { message : request.body.message }

io.sockets.on 'connection', (client) ->
	sockets.push client

	client.emit 'message', { message: "hello world" }

	client.on 'disconnect', ->
		sockets.filter (socket) -> socket != client