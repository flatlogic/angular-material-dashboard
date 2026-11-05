'use strict'

var gulp = require('gulp')

var paths = gulp.paths

gulp.task(
  'watch',
  gulp.series('inject', function (done) {
    gulp.watch(
      [
        paths.src + '/*.html',
        paths.src + '/{app,components}/**/*.scss',
        paths.src + '/{app,components}/**/*.js',
        'bower.json'
      ],
      gulp.series('inject')
    )
    done()
  })
)
