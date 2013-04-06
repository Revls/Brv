'use strict';

module.exports = function(grunt) {
  
  var path = require('path'), server
  // Project configuration.
  grunt.initConfig({
    watch:{
       ember_templates: {
         files: 'app/scripts/templates/**/*.hbs',
         tasks: ['ember_templates']
       },
       javascripts: {
        files: 'app/scripts/**/*.js',
        tasks: ['concat:dist']
       }
    },  
    ember_templates:{
      compile: {
        options: {
          templateName: function (sourceFile) {
            return sourceFile.replace(/app\/templates\//, '')
                             .replace(/\.hbs$/, '')
                             .replace(/\_/, '/')
          }
        },
        files: {
          'app/scripts/templates/templates.js': 'app/scripts/templates/templates/**/*.hbs'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/scripts/app.js','app/scripts/**/*.js', '!app/scripts/templates/templates.js'],
        dest: 'app/build/Brv.js'
      },
      all:{
        src: ['app/build/vendor.js', 'app/build/FStars.js'],
        dest: 'app/build/application-all.js'
      },
      vendor: {
        src: ['app/vendor/jquery-2.0.0.b2.js',
              'app/vendor/handlebars-1.0.0-rc.3.js',
              'app/vendor/**/*.js'],
        dest: 'app/build/vendor.js'
      }
    }
  })


  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-ember-templates')

  grunt.registerTask('default', ['watch', 'ember_templates'])

}
