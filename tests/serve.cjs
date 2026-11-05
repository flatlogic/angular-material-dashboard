require('browser-sync')
  .create()
  .init({ server: { baseDir: 'dist' }, port: 43194, open: false, ui: false, logLevel: 'silent' })
