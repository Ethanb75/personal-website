var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require("gulp-babel");
var server = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

// paths to build and retrieve files
var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcAssets: 'src/assets/**/*',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',

  build: 'build',
  buildIndex: 'build/index.html',
  buildCSS: 'build/**/*.css',
  buildJS: 'build/**/*.js'
};
/*
*
* DEVELOPMENT
*
*/
gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});
gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});
gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(babel()).pipe(gulp.dest(paths.tmp));
});
gulp.task('assets', function () {
  return gulp.src(paths.srcAssets).pipe(gulp.dest(paths.tmp + '/assets'));
})
// injects relative path locations for built css and javascript into my built html file
// depends on the copy task
gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);

  return gulp.src(paths.tmpIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.tmp));
});
gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(server({
      port: 3000,
      livereload: true
    }));
});
// watches for changes and reloads the dev server
gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});
gulp.task('copy', ['html', 'css', 'js', 'assets']);
gulp.task('default', ['watch']);
/*
*
* PRODUCTION
*
*/
gulp.task('prod:html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.build));
});
gulp.task('prod:css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build));
});
gulp.task('prod:js', function () {
  return gulp.src(paths.srcJS)
    .pipe(babel())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build))
});
gulp.task('prod:server', function () {
  return gulp.src('./app.js')
    .pipe(gulp.dest(paths.build))
})
gulp.task('prod:copy', ['prod:html', 'prod:css', 'prod:js'])
gulp.task('prod:inject', ['prod:copy'], function () {
  var css = gulp.src(paths.buildCSS);
  var js = gulp.src(paths.buildJS);
  return gulp.src(paths.buildIndex)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.build));
});
gulp.task('build', ['prod:inject']);



gulp.task('clean', function () {
  del([paths.tmp, paths.build]);
});