'use strict'

var gulp = require('gulp')

var paths = gulp.paths

var util = require('util')

var browserSync = require('browser-sync')

var middleware = require('./proxy')

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser

  var routes = null
  if (baseDir === paths.src || (Array.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    }
  }

  browserSync.instance = browserSync.init({
    files: files,
    open: false,
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  })
}

gulp.task(
  'serve',
  gulp.series('watch', function (done) {
    browserSyncInit(
      [paths.tmp + '/serve', paths.src],
      [
        paths.tmp + '/serve/{app,components}/**/*.css',
        paths.src + '/{app,components}/**/*.js',
        paths.src + 'src/assets/images/**/*',
        paths.tmp + '/serve/*.html',
        paths.tmp + '/serve/{app,components}/**/*.html',
        paths.src + '/{app,components}/**/*.html'
      ]
    )
    done()
  })
)

gulp.task(
  'serve:dist',
  gulp.series('build', function (done) {
    browserSyncInit(paths.dist)
    done()
  })
)

gulp.task(
  'serve:e2e',
  gulp.series('inject', function (done) {
    browserSyncInit([paths.tmp + '/serve', paths.src], null, [])
    done()
  })
)

gulp.task(
  'serve:e2e-dist',
  gulp.series('build', function (done) {
    browserSyncInit(paths.dist, null, [])
    done()
  })
)
