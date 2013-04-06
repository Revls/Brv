Brv.LoginFormView = Ember.View.extend({
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
