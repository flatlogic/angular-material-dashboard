const fs = require('node:fs/promises')
const path = require('node:path')
const crypto = require('node:crypto')
const { applyPatch, parsePatch, reversePatch } = require('diff')
const { minify } = require('terser')
const manifest = require('./angularjs-patches/manifest.json')
const banner =
  '/*! AngularJS with reviewed local security backports; see build/angularjs-patches. */\n'

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function verify(value, expected, label) {
  if (sha256(value) !== expected) {
    throw new Error('AngularJS patch input mismatch: ' + label)
  }
}

function applyExactly(source, patch, label) {
  const result = applyPatch(source, patch, { fuzzFactor: 0 })
  if (result === false) {
    throw new Error('AngularJS security patch cannot be applied exactly: ' + label)
  }
  return result
}

async function patchAngularJS(root = 'bower_components') {
  const writes = []
  for (const library of manifest.libraries) {
    const directory = path.join(root, library.package)
    const metadata = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8'))
    if (metadata.name !== library.package || metadata.version !== library.version) {
      throw new Error(
        'AngularJS backports require reviewed ' + library.package + ' ' + library.version
      )
    }
    const patches = []
    for (const entry of library.patches) {
      const text = await fs.readFile(path.join(__dirname, 'angularjs-patches', entry.file), 'utf8')
      verify(text, entry.sha256, entry.file)
      const [patch] = parsePatch(text)
      patches.push({ name: entry.file, patch })
    }
    const sourceFile = path.join(directory, library.source)
    const current = await fs.readFile(sourceFile, 'utf8')
    let original = current
    if (original.startsWith(banner)) {
      original = original.slice(banner.length)
      for (const entry of [...patches].reverse()) {
        original = applyExactly(original, reversePatch(entry.patch), entry.name)
      }
    }
    verify(original, library.sourceSha256, library.source)
    let patched = original
    for (const entry of patches) {
      patched = applyExactly(patched, entry.patch, entry.name)
    }
    patched = banner + patched
    const result = await minify(
      { [library.source]: patched },
      {
        format: { comments: /^!|@license|@preserve/ },
        sourceMap: {
          filename: library.minified,
          url: library.minified + '.map',
          includeSources: true
        }
      }
    )
    const minifiedFile = path.join(directory, library.minified)
    const currentMinified = await fs.readFile(minifiedFile, 'utf8')
    if (currentMinified !== result.code) {
      verify(currentMinified, library.minifiedSha256, library.minified)
    }
    const mapFile = minifiedFile + '.map'
    const currentMap = await fs.readFile(mapFile, 'utf8')
    if (currentMap !== result.map) {
      verify(currentMap, library.mapSha256, library.minified + '.map')
    }
    writes.push(
      { file: sourceFile, before: current, after: patched },
      { file: minifiedFile, before: currentMinified, after: result.code },
      { file: mapFile, before: currentMap, after: result.map }
    )
  }
  for (const entry of writes) {
    if (entry.before !== entry.after) {
      await fs.writeFile(entry.file, entry.after)
    }
  }
}

module.exports = { patchAngularJS }

if (require.main === module) {
  patchAngularJS().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
