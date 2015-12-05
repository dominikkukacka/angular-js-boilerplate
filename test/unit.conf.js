module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../build/components.js',
      '../components/angular-mocks/angular-mocks.js',
      '../components/jquery/dist/jquery.js',
      '../build/build.js',

      '../app/directives/**/test/*.js'
    ],

    reporters: ['progress'],
    browsers: ['PhantomJS']
  });
}
