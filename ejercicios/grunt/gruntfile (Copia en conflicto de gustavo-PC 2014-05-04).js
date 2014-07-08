'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


  // Project configuration.
  grunt.initConfig({
    uncss: {
      dist: {
        src: ['/tests/index.html'],
        dest: '/dist/css/tidy.css'
      }
    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'uncss:dist'
  ]);

};
