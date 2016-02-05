// gulp
var gulp = require('gulp');


// plugins
var del = require('del');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var replace = require('gulp-replace-task');
var sass = require('gulp-sass');
var url = require('url');
var karma = require('karma').Server;

//sources
var jsSources = ['./src/*.js'];
var htmlSources = ['./templates/*.html'];
var sources = [];
sources = (jsSources + ',' + htmlSources).split(',');

// tasks

gulp.task('index', function () {
  var target = gulp.src('./templates/index.html');
  
  //{read: false} returns only path names to add to index file.
  var src = gulp.src(jsSources, {
              read:false
          });
  
  return target.pipe(
          inject(src, {addRootSlash : false, addPrefix : '.'}))
    .pipe(gulp.dest('./www'));
});

gulp.task('copy', function () {
  del(['./www/src/*', 
      './www/templates/*'])
          .then(function (paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
    });
  gulp.src('./src/*').pipe(gulp.dest('./www/src'));
  gulp.src('favicon.ico').pipe(gulp.dest('./www'));
  gulp.src('./templates/*').pipe(gulp.dest('./www/templates'));
  gulp.src('./assets/**/*').pipe(gulp.dest('./www/assets'));
  gulp.src('./bower_components/moment/moment.js').pipe(gulp.dest('./www/lib/moment'));
  gulp.src('./bower_components/**/*.min.js').pipe(gulp.dest('./www/lib'));
  gulp.src('./bower_components/**/*.min.css').pipe(gulp.dest('./www/lib'));
  gulp.src('./bower_components/robotodraft/robotodraft.css').pipe(gulp.dest('./www/lib'));
});

gulp.task('lint', function() {
  gulp.src(jsSources)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('styles', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('serve', ['watch'], function () {
     browserSync.init({
      server: {
         baseDir: './www'
      }});

      gulp.watch(htmlSources).on('change', reload);
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['lint', 'copy'], reload);
    gulp.watch(htmlSources, ['copy'], reload);
    gulp.watch('sass/*.scss',['styles'], reload);
});

gulp.task('test', function (done) {
  new karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// default task
gulp.task('default',
  ['lint', 'styles', 'copy', 'index', 'serve']
);

// testing task
gulp.task('testing',
  ['lint', 'test']
);

