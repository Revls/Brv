var Brv = Em.Application.create({
  rootElement: '#main',
  // nuestra copia de ajax, performance + ejecutarse dentro de este loop
  ajax: function() {
    return $.ajax.apply(this, arguments)
  },

  trasient: Em.Object.create(),

  about: Em.Object.create({
    iurl: '/components/flat-ui/images/illustrations/bag.png',
    name: 'Ejecutivos 5 Estrellas'
  })
})

Brv.Router.map(function(){
  this.resource('login')
  this.resource('home', function (){
    this.resource('day', {path:':day'})
  })
})

Brv.IndexRoute = Em.Route.extend({
  redirect: function (){
    this.transitionTo('login')
  }
})

Brv.HomeRoute = Em.Route.extend({
  model: function(){
    return Brv.loggedUser || Brv.User.create({})
  }
})

Brv.LoginRoute = Em.Route.extend({
  model: function (){
    return Brv.about
  }
})

;/**
 * getBuses
 * ------------
 * Regresa los buses actuales en servicio por ciudad y dia
 * en formato de promesa
 *
 * Ex.
 *
 *    Brv.getBuses('teguz').then(function (resp){
 *      resp.data -> Array con buses
 *    })
 */
Brv.getBuses = function (id){
  return Em.$.getJSON('/api/v1/buses.json?id=' + id + '&date=' + +new Date)
          .then(function (data){
            return data
          })
}

Brv.getLogin = function(user, id){
  var promise = new Em.RSVP.Promise()
  Em.$.post('/api/v1/users/login', {user: user, password: id}, function (res){
    if (res.status === 'ok') return promise.resolve(res)
    return promise.reject(res)
  })
  return promise
}
;/**
 * #BUS
 * ------------
 * Bus Model, cupos es automaticamente modificable cuando
 * pasajeros.pushObject sucede...
 * 
 */
Brv.Bus = Em.Object.extend({
  init: function (){
    this._super()
    this.set('pasajeros', [])
  },
  bid: null,
  capacidad: null,
  cupos: function (){
    var left = this.get('capacidad') - this.get('pasajeros').length
    
    if (left > -1) {
      return left
    }
    this.get('pasajeros').pop()
    return 0
  }.property('pasajeros.@each')
})

Brv.User = Em.Object.extend({
  id: null,
  name: null,
  isLogged: false,
  maxTime: 1000*3600
})
;Brv.Router.map(function(){
  this.resource('login')
  this.resource('home', function (){
    this.resource('day', {path:':day'})
  })
})

Brv.IndexRoute = Em.Route.extend({
  redirect: function (){
    this.transitionTo('login')
  }
})

Brv.HomeRoute = Em.Route.extend({
  model: function(){
    return Brv.loggedUser || Brv.User.create({})
  }
})

Brv.LoginRoute = Em.Route.extend({
  model: function (){
    return Brv.about
  }
})

;!function(){

var Months = []
var m = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
         'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado']

var Month = Em.Object.extend({
  id: null,
  name: null,
  days: null
})

Brv.CalendarView = Em.View.extend({
  classNames: ['calendar'],
  click: function(e){
    var $target = Em.$(e.target)
    if (!isNaN($target.text())){
      this.get('controller.target.router').transitionTo('day', $target.text())
    }
  },

  render: function (buffer){
    var date = getPropperDate(new Date())
    var calendar = []
    for (var i = 1; i <= date.days; i++){
      calendar.push({
        day: getDay(date._month, i, date.year),
        date: i
      })
    }
    
    buffer.push('<div class="span9">')
    days.forEach(function(day){
      buffer.push('<div class="span1 calendar-header palette ')
      if (date) buffer.push('palette-alizarin')
      buffer.push('">' + day + '</div>')
    })
    
    calendar.forEach(function(day, i){
      if (i == 0 && day.day !== 'Domingo') {
        fillOld(days.indexOf(day.day), buffer)
      }
      buffer.push('<div class="span1 calendar-day palette ')
      if (date.day === day.date) buffer.push('today palette-concrete')
      else buffer.push('palette-clouds')
      buffer.push('">' + day.date +'</div>')
    }, this)
    buffer.push('</div>')
  }

})

function fillOld(days, buffer){
  for (var i = 0; i < days; i++){
    buffer.push('<div class="span1 palette palette-night">31</div>')
  }
}

function getMonth(n){
  return Months[n].get('name')
}

function getDays(n){
  return Months[n].get('days')
}

function getDay(month, day, year){
  var date = new Date((month.get('id') + 1) + '-' + day + '-' + year)
  return days[date.getDay()]
}

for (var i = 1; i < 13; i++) {// define dias del mes
  if ((i % 2 !== 0 && i != 8 && i != 2)){
    Months.push(Month.create({id: i - 1, name: m[i - 1], days: 30}))
  } else if (i !== 2){
    Months.push(Month.create({id: i - 1, name: m[i - 1], days: 31}))
  } else {
    Months.push(Month.create({id: i - 1, name: m[i - 1], days: 28}))
  }
}



function getPropperDate(date){
  var month = date.getMonth()
  return {
    month: getMonth(month),
    _month: Months[month],
    year: date.getUTCFullYear(),
    day: date.getDay(),
    days: getDays(month)
  }
}

}()
;Brv.LoginFormView = Ember.View.extend({
  login: null,
  password: null,
  attempts: 0,
  errorOnLogin: false,
  submitLogin: function() {
    var self = this
      , router = this.get('controller.target.router')
      , user = this.get('username')
      , passwd = this.get('password')

    Brv.getLogin(user, passwd)
    .then(function(){
      Brv.loggedUser = Brv.User.create({username: user, isLogged: true})
      router.transitionTo('home.index')
    }, function (error){
      self.set('attempts', +self.get('attempts') + 1)
      self.set('errorOnLogin', true)
    })
  },
})
