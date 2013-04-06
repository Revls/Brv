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
