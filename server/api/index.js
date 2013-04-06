var crypto = require('crypto')

function md5(str){
  return crypto.createHash('md5').update(str + '').digest('hex')
}

module.exports = function (app){
  
  //Fixed data for the moment
  var buses = require('../data/buses')
    , horarios = require('../data/horarios')
    , users = require('../data/users')


  var Routes = {
    buses: function (req, res){
      res.json({
        status: 'ok',
        data: buses
      })
    },
    fbus: function (req, res){
      var id = req.params.id
        , match = buses.filter(function(bus){
          return bus.bid == id
        })
      if (!match.length) return res.json({status:'nok'}, 404)
      res.json({
        status: 'ok',
        data: match
      })
    },
    // horarios
    horario: function (req, res){
      res.json({
        status: 'ok',
        data: horarios
      })
    },
    fhorario: function (req, res){
      var dia = req.params.dia
        , mes = req.params.mes.toLowerCase()

      var match = horarios.filter(function(hor){
        return hor.day == dia && hor.month == mes
      })
      if (!match.length) return res.json({status:'nok'}, 404)      
      res.json({
        status: 'ok',
        data: match
      })
    },
    // Users
    login: function (req, res){
      var user = req.body.user, passwd = req.body.password
      console.log(user, passwd)
      var match = users.filter(function (u){ return u.username === user})[0]
      if (match && md5(passwd) === match.password ){
        res.json({status:'ok'})
      } else {
        res.json({status:'nok'})
      }
    }
  }
  return Routes
}
