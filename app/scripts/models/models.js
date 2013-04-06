/**
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
