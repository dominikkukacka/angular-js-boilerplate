var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');
var sourcemaps = require('gulp-sourcemaps');
var gls = require('gulp-live-server');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var eventStream = require('event-stream');
var KarmaServer = require('karma').Server;
var angularProtractor = require('gulp-angular-protractor');

var jsFiles = [
  'app/modules/*/models/*.js',
  'app/modules/*/dao/*.js',

  'app/modules/*/directives/*/*.js',
  'app/modules/*/directives/*/src/**/*.js',

  'app/modules/*/*.js',

  // 'app/services/**/*.js',
  'app/*.js',
];

var componentFiles = [
  'components/angular/angular.js',
  'components/angular-resource/angular-resource.js',
  'components/angular-route/angular-route.js'
];

var htmlFiles = [
  '!app/modules/*/directives/*/demo/*.html',
  'app/modules/*/directives/*/src/*.html',

  '!app/index.html',
  'app/**/*.html',
]

gulp.task('clean', function() {
  return del([
   'build/**/*'
 ]);
});

gulp.task('copy', function () {
  return gulp
    .src('app/index.html', {base: 'app'})
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean', 'copy', 'buildComponents'], function () {
  var jsStream = gulp
    .src(jsFiles)
    .pipe(order(jsFiles, {
      base: '.'
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(sourcemaps.write());

  var htmlStream = gulp
    .src(htmlFiles)
    .pipe(templateCache({
      standalone: true,
      module: 'my-app.templates', // own module for the templates
      transformUrl: function(url) {
        return url.replace(/^(\w+)\/directives\/(\w+)\/src\/(\w+)\.html$/, '$1.$2'); // we only want short names
      }
    }));

  return eventStream.merge(jsStream, htmlStream)
  .pipe(concat('build.js'))
  .pipe(gulp.dest('build'));

});

gulp.task('buildComponents', function () {
  return gulp
    .src(componentFiles)
    .pipe(concat('components.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('tdd', ['build'], function () {

  var server = gls.new('server/', {env: {NODE_ENV: 'development'}});

  gulp.watch(['server/**/*.js'], function (event) {
    server.start.apply(server, event);
  });

  gulp.watch(['app/**/*'], ['unit', 'build']);

  gulp.watch(['build/**/*', 'build/*'], function(file) {
    server.notify.apply(server, [file]);
  });

  server.start();

});

gulp.task('watch', ['build'], function () {

  var server = gls.new('server/', {env: {NODE_ENV: 'development'}});

  gulp.watch(['server/**/*.js'], function (event) {
    server.start.apply(server, event);
  });

  gulp.watch(['app/**/*'], ['build']);

  gulp.watch(['build/**/*', 'build/*'], function(file) {
    server.notify.apply(server, [file]);
  });

  server.start();

});


gulp.task('server', ['build'], function () {

  var server = gls.new('server/', {env: {NODE_ENV: 'development'}});
  server.start();

});

gulp.task('test', ['build', 'unit', 'e2e']);

gulp.task('unit', ['build'], function (done) {
  new KarmaServer({
    configFile: __dirname + '/test/unit.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('e2e', ['build'], function (done) {

  var server = gls.new('server/', {env: {NODE_ENV: 'development'}});
  server.start();

  gulp
    .src(['test/e2eSpecs/*.spec.js'])
    .pipe(angularProtractor({
        'configFile': 'test/e2e.conf.js',
        'args': ['--baseUrl', 'http://127.0.0.1:3000'],
        'autoStartStopServer': true,
        'debug': true
    }))
    .on('error', function(e) {
      server.stop();
      throw e;
    })
    .on('end', function(e) {
      server.stop();
      done();
    });
});
