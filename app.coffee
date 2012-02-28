express = require('express')
app	= express.createServer()
io = require('socket.io').listen(app)
_ = require('underscore')

io.enable 'browser client minification'
io.enable 'browser client etag'
io.enable 'browser client gzip'
io.set 'log level', 1
io.set 'transports', ['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling']

app.set 'view engine', 'jade'
app.use express.static(__dirname + '/public')
app.use require('connect-assets')()
app.use express.bodyParser()
app.listen 8080


app.get '/', (request, response) ->
	response.render 'index', title: 'andy.io'


io.of('/messages').on 'connection', (socket) ->
	socket.emit 'new', text: "hello world"

	socket.on 'new', (data) ->
		socket.broadcast.emit 'new', data


io.of('/cursors').on 'connection', (socket) ->
	socket.on 'update', (data) ->
		socket.broadcast.emit 'update', _(data).extend {id : Number socket.id}