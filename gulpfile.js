'use strict'

var gulp = require('gulp')

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
}

;['styles', 'inject', 'watch', 'build', 'server', 'unit-tests', 'deploy'].forEach(function (file) {
  require('./gulp/' + file)
})

gulp.task('default', gulp.series('clean', 'build'))
