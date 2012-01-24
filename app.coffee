# process.env.NODE_ENV = 'production'

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


io.sockets.on 'connection', (client) ->
	client.emit 'message', { message: "hello world" }

	client.on 'updateCursor', (data) ->
		client.broadcast.volatile.emit 'updateCursor', _(data).extend {id : Number client.id}

	client.on 'message', (data) ->
		client.broadcast.emit 'message', data

	client.on 'disconnect', ->
		client.broadcast.emit 'deleteCursor', {id : Number client.id}
