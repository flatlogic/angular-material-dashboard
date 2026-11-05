'use strict'
var gulp = require('gulp')
var Server = require('karma').Server
var wiredep = require('wiredep')
function run(singleRun, done) {
  var files = wiredep({
    directory: 'bower_components',
    dependencies: true,
    devDependencies: true,
    overrides: { angular: { dependencies: { jquery: '*' } } }
  }).js.concat(['src/{app,components}/**/*.js'])
  new Server(
    { configFile: require('path').resolve('karma.conf.js'), files: files, singleRun: singleRun },
    function (code) {
      done(code ? new Error('Karma failed: ' + code) : undefined)
    }
  ).start()
}
gulp.task('test', function (done) {
  run(true, done)
})
gulp.task('test:auto', function (done) {
  run(false, done)
})
