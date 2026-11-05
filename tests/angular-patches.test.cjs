const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { patchAngularJS } = require('../build/patch-angularjs.cjs')
const manifest = require('../build/angularjs-patches/manifest.json')

test('AngularJS backports preserve repeated builds and reject modified distribution files', async (context) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'angularjs-backports-'))
  context.after(() => fs.rm(root, { recursive: true, force: true }))
  const files = []
  for (const library of manifest.libraries) {
    await fs.mkdir(path.join(root, library.package))
    for (const name of [
      'package.json',
      library.source,
      library.minified,
      library.minified + '.map'
    ]) {
      const relative = path.join(library.package, name)
      await fs.copyFile(path.join('bower_components', relative), path.join(root, relative))
      files.push(relative)
    }
  }
  const before = await Promise.all(files.map((file) => fs.readFile(path.join(root, file))))
  await patchAngularJS(root)
  for (const [index, file] of files.entries()) {
    assert.deepEqual(await fs.readFile(path.join(root, file)), before[index])
  }
  const source = 'angular/angular.js'
  await fs.appendFile(path.join(root, source), '\n// unexpected source edit\n')
  await assert.rejects(patchAngularJS(root), /input mismatch|cannot be applied exactly/)
  await fs.copyFile(path.join('bower_components', source), path.join(root, source))
  await fs.appendFile(
    path.join(root, 'angular-sanitize/angular-sanitize.min.js'),
    '\n// unexpected minified edit\n'
  )
  await assert.rejects(patchAngularJS(root), /input mismatch/)
  assert.deepEqual(await fs.readFile(path.join(root, source)), before[files.indexOf(source)])
})
