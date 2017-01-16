'use strict';

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


/*******************************************************
Setting up gulp task.
Example: gulp.task('task-name', function(){
  //stuff goes in here
})
*******************************************************/
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.+(scss|sass)')
      .pipe(sass())
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({
          stream: true
      }))
});

/*******************************************************
Setting up gulp watch. This is the syntax for it.
gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
*******************************************************/
// Putting it together with the task and watch.
gulp.task('watch',  ['browserSync', 'sass'], function(){
    gulp.watch('src/scss/**/*.+(scss|sass)', ['sass']);
    // Reloads the borwser whenever HTML or JS files changes
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

/*
BrowserSync task example for live-reloading changes to the browser.
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDri: 'app'
    }
  })
});
*/
// BrowserSync gulptask for live-reloading
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDri: 'build'
    }
  })
});

/*
Gulp clean up task
gulp.task('clean', function() {
  return del.sync('build').then(function(cb){
    return cache.clearAll(cb);
  });
});
*/

gulp.task('clean:dist', function() {
  return del.sync('build');
});

/*
Setting up run-sequence
Syntax:
var runSequence = require('run-sequence');
gulp.task('task-name', function(callback) {
  runSequence('task-one', 'task-two', 'task-three', callback);
});

Array sequence
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
*/
gulp.task('default', function(callback){
  runSequence(['sass', 'browserSync', 'watch'],
    callback
    )
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    callback
    )
});
