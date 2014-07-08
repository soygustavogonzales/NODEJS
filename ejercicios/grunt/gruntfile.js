module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uncss: {
      dist: {
        src: ['/tests/index.html','/tests/index.html'],
        dest: '/dist/tidy.css'
      },
      test: {
        files: {
          '/tidy.css': ['/index.html']
        },
        options: {
          report: 'gzip'
        }
      }
    },
      less:{
        compile:{
          files:{
            '/styles.css':'/styles.less'
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