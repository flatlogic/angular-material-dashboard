'use strict'

module.exports = function (config) {
  config.set({
    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['ChromeHeadless'],

    plugins: ['karma-chrome-launcher', 'karma-jasmine']
  })
}
