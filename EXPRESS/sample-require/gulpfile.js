'use strict';

var gulp = require('gulp'),
liveReload = require('gulp-livereload'),
amdOptimize = require('amd-optimize'),
concat = require('gulp-concat'),
//shell = require('gulp-shell'),//para correr comandos por consola
jshint = require('gulp-jshint');
var paths = {
	jade : 'views/**/*.jade',
	js:{
		origin:'public/javascripts/development/app/**/*.js',
		dest:'public/javascripts/production/'
	}
}

// Run the r.js command, such a simple task :)
/*
gulp.task('scripts', shell.task([
  // This is the command
  'r.js -o build/r/build.js'
]))
*/

gulp.task('js',function(){
	return gulp.src(['public/javascripts/development/app/controllers/*.js','public/javascripts/development/app/app.js'])
	//.pipe(jshint({asi:true}))
	//.pipe(jshint.reporter('default'))
	.pipe(concat('all.js'))
	.pipe(gulp.dest(paths.js.dest))
	.pipe(liveReload())
})

gulp.task('watch',function(){
	liveReload.listen()
	 gulp.watch(paths.js.origin, ['js']);

})

gulp.task('default', ['watch']);


