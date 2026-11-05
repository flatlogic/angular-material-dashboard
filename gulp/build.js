'use strict'
var gulp = require('gulp')
var fs = require('node:fs/promises')
var path = require('node:path')
var through = require('through2')
var concat = require('gulp-concat')
var annotate = require('ng-annotate-patched')
var htmlmin = require('gulp-html-minifier-terser')
var paths = gulp.paths
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
})

function templates() {
  return through.obj(function (file, encoding, done) {
    var url = path.relative(path.resolve(paths.src), file.path).split(path.sep).join('/')
    file.contents = Buffer.from(
      '$templateCache.put(' +
        JSON.stringify(url) +
        ',' +
        JSON.stringify(file.contents.toString()) +
        ');\n'
    )
    file.extname = '.js'
    done(null, file)
  })
}
function templateModule() {
  return through.obj(function (file, encoding, done) {
    file.contents = Buffer.from(
      "angular.module('angularMaterialAdmin').run(['$templateCache',function($templateCache){\n" +
        file.contents.toString() +
        '}]);\n'
    )
    done(null, file)
  })
}
function annotateScripts() {
  return through.obj(function (file, encoding, done) {
    var result = annotate(file.contents.toString(), { add: true })
    if (result.errors) {
      done(new Error(result.errors.join('\n')))
      return
    }
    file.contents = Buffer.from(result.src)
    done(null, file)
  })
}
gulp.task('partials', function () {
  return gulp
    .src(paths.src + '/{app,components}/**/*.html', { base: paths.src })
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(templates())
    .pipe(concat('templateCacheHtml.js'))
    .pipe(templateModule())
    .pipe(gulp.dest(paths.tmp + '/partials/'))
})
gulp.task(
  'html',
  gulp.series(gulp.parallel('inject', 'partials'), function () {
    var js = $.filter('**/*.js', { restore: true, dot: true })
    var css = $.filter('**/*.css', { restore: true, dot: true })
    var html = $.filter('**/*.html', { restore: true, dot: true })
    var assets = $.filter(['**/*.js', '**/*.css'], { restore: true, dot: true })
    return gulp
      .src(paths.tmp + '/serve/*.html')
      .pipe(
        $.inject(gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false }), {
          starttag: '<!-- inject:partials -->',
          ignorePath: paths.tmp + '/partials',
          addRootSlash: false
        })
      )
      .pipe($.useref())
      .pipe(assets)
      .pipe($.rev())
      .pipe(js)
      .pipe(annotateScripts())
      .pipe($.uglify({ output: { comments: $.uglifySaveLicense } }))
      .pipe(js.restore)
      .pipe(css)
      .pipe($.csso())
      .pipe(css.restore)
      .pipe(assets.restore)
      .pipe($.revReplace())
      .pipe(html)
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      .pipe(html.restore)
      .pipe(gulp.dest(paths.dist))
  })
)
gulp.task('images', function () {
  return gulp
    .src(paths.src + '/assets/images/**/*', { encoding: false })
    .pipe(gulp.dest(paths.dist + '/assets/images/'))
})
gulp.task('fonts', function () {
  return gulp
    .src($.mainBowerFiles(), { encoding: false })
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}', { dot: true }))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'))
})
gulp.task('misc', function () {
  return gulp.src(paths.src + '/**/*.ico', { encoding: false }).pipe(gulp.dest(paths.dist))
})
gulp.task('clean', async function () {
  await Promise.all([
    fs.rm(paths.dist, { recursive: true, force: true }),
    fs.rm(paths.tmp, { recursive: true, force: true })
  ])
})
gulp.task('build', gulp.parallel('html', 'images', 'fonts', 'misc'))
