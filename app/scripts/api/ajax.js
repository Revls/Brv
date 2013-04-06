/**
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
