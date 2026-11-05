'use strict'
var gulp = require('gulp')
var ghPages = require('gh-pages')
gulp.task('deploy', function (done) {
  ghPages.publish('dist', done)
})
