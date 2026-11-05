'use strict'

var gulp = require('gulp')

var paths = gulp.paths

var $ = require('gulp-load-plugins')()
var sass = require('gulp-sass')(require('sass'))

gulp.task('styles', function () {
  var sassOptions = {
    style: 'expanded'
  }

  var injectFiles = gulp.src(
    [
      paths.src + '/{app,components}/**/*.scss',
      '!' + paths.src + '/app/index.scss',
      '!' + paths.src + '/app/vendor.scss'
    ],
    { read: false }
  )

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(paths.src + '/app/', '')
      filePath = filePath.replace(paths.src + '/components/', '../components/')
      return "@import '" + filePath + "';"
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  }

  return gulp
    .src([paths.src + '/app/index.scss'])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(sass(sassOptions))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(paths.tmp + '/serve/app/'))
})
