var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon'),
  connect = require('gulp-connect'),
  del = require('del'),
  jade = require('gulp-jade');

var paths = {
  css: ['app/assets/css/app.css', 'app/modules/**/css/*.css'],
  js: ['app/config/*.js', 'app/modules/**/js/*.js'],
  jade: ['app/modules/**/views/*.jade']
};

gulp.task('connect', function() {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/**','app/**','node_modules/**'] })
    .on('restart', function () {
      console.log('>> node restart');
    });
});

gulp.task('uglify', function() {
  return gulp.src(paths.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({
      message: 'Uglify task complete'
    }));
});

gulp.task('minify', function() {
  return gulp.src(paths.css)
    .pipe(concatCss('app.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({
      message: 'Minify task complete'
    }));
});

gulp.task('styles', function() {
  return gulp.src(paths.css)
    .pipe(concatCss('app.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/partials/'))
    .pipe(notify({
      message: 'Jade task complete'
    }));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint());
});

gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

// Watch
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(paths.css, ['styles']);

  // Watch .js files
  gulp.watch(paths.js, ['scripts']);

  // Watch .jade files
  gulp.watch(paths.jade, ['jade']);

  // Watch any files in dist/, reload on change
  // gulp.watch(['dist/**']).on('change', livereload.changed);

});

// Default task
gulp.task('default', ['connect', 'watch']);

gulp.task('build', ['scripts', 'styles', 'jade'])
