express = require('express')
app	= express.createServer()
io = require('socket.io').listen(app)
_ = require('underscore')

app.set 'view engine', 'jade'
app.use express.static(__dirname + '/public')
app.use require('connect-assets')()
app.use express.bodyParser()
app.listen 8080


app.get '/', (request, response) ->
	response.render 'index', { title: 'andy.io' }


messages = io.of '/messages'

messages.on 'connection', (socket) ->

	socket.emit 'new', text: "hello world"

	socket.on 'new', (data) ->
		socket.broadcast.emit 'new', data


cursors = io.of '/cursors'

cursors.on 'connection', (socket) ->

	socket.on 'update', (data) ->
		socket.broadcast.emit 'update', _(data).extend {id : Number socket.id}

	# client.on 'disconnect', ->
		# client.broadcast.emit 'deleteCursor', {id : Number client.id}
