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

