var gulp = require('gulp'),
	lessCss = require('gulp-less'), 
	path = require('path'),
	uncss = require('gulp-uncss'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat');

gulp.task('less', function () {
  gulp.src('less/*.less')
    .pipe(lessCss({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('css',function(){
	return gulp.src('css/dev/*.css')
	.pipe(concat('styles.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('css'))
})

gulp.task('uncss',function(){
	return gulp.src('css/styles.css')
	.pipe(uncss({
		html:['index.html']
	}))
	.pipe(gulp.dest('./out'));
})

gulp.task('default',function(){
/*
	gulp.run('css')
	gulp.run('uncss')
	gulp.watch('css/dev/*.css',function(){
		gulp.run('css')
	})
	gulp.run('less')
	
	gulp.watch('css/styles.css',function(){
		gulp.run('uncss')
	})
*/
		gulp.src('css/dev/styles.css')
  .pipe(uncss({
      html: ['index.html'],
  }))
  .pipe(gulp.dest('./out'));
	
})