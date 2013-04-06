/**
 * _5stars
 * -------------------------
 * @author: Alejandro Morales <vamg008@gmail.com>
 * @date: date
 */ 'use strict';

var http = require('http')
  , express = require('express')
  , api = require('./api')

var app = express()

/* Default configuration */
app.use(express.static(__dirname + '/../app'))
app.use(express.bodyParser())
app.set('port', process.env.PORT || 8080)
app.set('name', '_5stars')

var apir = api(app)

app.get('/api/v1/horarios/:mes/:dia.json', apir.fhorario)
app.get('/api/v1/horarios.json', apir.horario)
app.get('/api/v1/buses.json', apir.buses)
app.get('/api/v1/buses/:id.json', apir.fbus)
app.post('/api/v1/users/login', apir.login)

http.createServer(app).listen(app.get('port'), function(){
  console.log('_5stars running on %d', this.address().port)
})


