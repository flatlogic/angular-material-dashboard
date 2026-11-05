const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

test('all local bundles are revisioned and the emitted CSS resolves its assets', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  const assets = Array.from(
    html.matchAll(/(?:src|href)="([^"#?]+\.(?:js|css))"/g),
    (match) => match[1]
  ).filter((asset) => !asset.startsWith('http'))
  assert.ok(assets.length >= 3)
  for (const asset of assets) {
    assert.match(asset, /-[a-f0-9]{10}\.(?:js|css)$/)
    const target = path.join('dist', asset)
    assert.ok(fs.statSync(target).size > 0)
    if (asset.endsWith('.css')) {
      const css = fs.readFileSync(target, 'utf8')
      assert.ok(!css.includes('bower_components'))
      for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        const url = match[1].split(/[?#]/)[0]
        if (!url.startsWith('data:') && !url.startsWith('http'))
          assert.ok(fs.statSync(path.resolve(path.dirname(target), url)).size > 0, url)
      }
    }
  }
})
test('cache keys match real router and dashboard partial URLs', () => {
  const cache = new Map()
  vm.runInNewContext(fs.readFileSync('.tmp/partials/templateCacheHtml.js', 'utf8'), {
    angular: {
      module(name) {
        assert.equal(name, 'angularMaterialAdmin')
        return {
          run(inject) {
            inject.at(-1)({ put: (url, html) => cache.set(url, html) })
          }
        }
      }
    }
  })
  for (const url of [
    'app/views/main.html',
    'app/views/dashboard.html',
    'app/views/profile.html',
    'app/views/table.html',
    'app/views/partials/visitors.html'
  ])
    assert.ok(cache.get(url).length > 0, url)
})
test('binary images retain their source bytes', () => {
  for (const name of ['einstein.jpg', 'feynman.jpg', 'promo-amd.png'])
    assert.deepEqual(
      fs.readFileSync('dist/assets/images/' + name),
      fs.readFileSync('src/assets/images/' + name)
    )
})
test('wiredep loads jQuery before Angular so plugins use full jQuery', () => {
  const html = fs.readFileSync('.tmp/serve/index.html', 'utf8')
  const jquery = html.indexOf('bower_components/jquery/dist/jquery.js')
  const angular = html.indexOf('bower_components/angular/angular.js')
  assert.ok(jquery >= 0 && angular > jquery)
})
