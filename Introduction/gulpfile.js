'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

/*******************************************************
Setting up gulp task.
Example: gulp.task('task-name', function(){
  //stuff goes in here
})
*******************************************************/
gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('bulld/styles'))
});