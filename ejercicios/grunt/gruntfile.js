module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      uncss: {
          dist: {
              files: [
                  { src: 'index.html', dest: 'mini.css' }
              ]
          }
        }
      ,
      less:{
        compile:{
          files:{
            'styles.css':'styles.less'
          }
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uncss:dist']);

};