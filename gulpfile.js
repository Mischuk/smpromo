'use strict';

var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var jadeInheritance = require('gulp-jade-inheritance');
var changed      = require('gulp-changed');
var cached       = require('gulp-cached');
var gulpif       = require('gulp-if');
var filter       = require('gulp-filter');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;
var args   = require('yargs').argv;
var nib = require('nib');

var serverUrl = args.proxy;

if (!serverUrl) {
  serverUrl = 'local.example.dev';
}

// Confingure our directories
var paths = {
  jade:   'jade',
  js:     'js/modules/*.js',
  jsVendor:     'js/plugins.js',
  css:    'css',
  styles: 'styles',
  img:    'img',
};

//////////////////////////////
// Begin Gulp Tasks
//////////////////////////////
gulp.task('lint', function () {
  return gulp.src([
      paths.js
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts', function() {
  return gulp.src(paths.js)
    // Concatenate everything within the JavaScript folder.
    .pipe(concat('functions.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('functions.min.js'))
    // Strip all debugger code out.
    .pipe(stripDebug())
    // Minify the JavaScript.
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

//////////////////////////////
// Stylus Tasks
//////////////////////////////
gulp.task('styles', function () {
  gulp.src(paths.styles + '/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      paths:  ['node_modules', 'styles/globals'],
      import: ['jeet/stylus/jeet', 'nib', 'rupture/rupture', 'variables', 'mixins'],
      use: [nib()],
      'include css': true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

//////////////////////////////
// Jade Tasks
//////////////////////////////
gulp.task('jade', function() {
  return gulp.src(['jade/**/*.jade'])
    .pipe(changed('templates/', {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('jade')))
    .pipe(jadeInheritance({basedir: 'jade'}))
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./templates/'))
    .pipe(browserSync.stream());
});

//////////////////////////////
// Autoprefixer Tasks
//////////////////////////////
gulp.task('prefix', function () {
  gulp.src(paths.css + '/*.css')
    .pipe(prefix(["last 8 version", "> 1%", "ie 8"]))
    .pipe(gulp.dest(paths.css));
});

//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
  gulp.watch(paths.js, ['lint', 'scripts']);
  gulp.watch(paths.styles + '/**/*.styl', ['styles']);
  gulp.watch(paths.jade + '/**/*.jade', ['jade']);
  gulp.watch(paths.styles + '/globals/**/*.styl', ['styles']);
});

//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  //browserSync.init({
  //  proxy: serverUrl
  //});
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

//////////////////////////////
// Server Tasks
//////////////////////////////
gulp.task('default', ['scripts', 'watch', 'prefix']);
gulp.task('serve', ['scripts', 'watch', 'prefix', 'browserSync'])
