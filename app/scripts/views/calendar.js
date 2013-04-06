!function(){

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
