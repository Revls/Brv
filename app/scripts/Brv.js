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

