const { defineConfig } = require('@playwright/test')
module.exports = defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:43194',
    channel: 'chrome',
    viewport: { width: 1280, height: 900 }
  },
  webServer: {
    command: 'node tests/serve.cjs',
    url: 'http://127.0.0.1:43194',
    reuseExistingServer: false
  }
})
