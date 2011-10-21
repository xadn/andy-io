express = require('express')
app = express.createServer()
 
app.use express.static(__dirname + '/public')
app.set 'view engine', 'jade'
 
app.get '/', (request, response) ->
  response.render 'index', { title: 'andy.io' }
 
app.listen process.env.PORT || 5000
console.log "Express server listening on port %d", app.address().port