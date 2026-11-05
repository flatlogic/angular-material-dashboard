const path = require('node:path')
const { test, expect } = require('@playwright/test')

async function loadFramework(page, sanitize = false) {
  await page.route('https://**', (route) => route.abort())
  await page.addScriptTag({
    path: path.resolve(
      process.env.ANGULAR_SECURITY_ROOT || 'bower_components',
      'angular/angular.min.js'
    )
  })
  if (sanitize) {
    await page.addScriptTag({
      path: path.resolve(
        process.env.ANGULAR_SECURITY_ROOT || 'bower_components',
        'angular-sanitize/angular-sanitize.min.js'
      )
    })
  }
}

test('resource URL policies match whole regex alternatives', async ({ page }) => {
  await loadFramework(page)
  const accepted = await page.evaluate(() => {
    angular.module('securityPolicy', []).config([
      '$sceDelegateProvider',
      (provider) => {
        provider.trustedResourceUrlList([
          /https:\/\/trusted\.example\/allowed|https:\/\/other\.example\/allowed/
        ])
      }
    ])
    const sce = angular.injector(['ng', 'securityPolicy']).get('$sce')
    return [
      'https://trusted.example/allowed',
      'https://other.example/allowed',
      'https://trusted.example/allowed-attacker',
      'https://attacker.test/https://other.example/allowed'
    ].map((url) => {
      try {
        sce.getTrustedResourceUrl(url)
        return true
      } catch (error) {
        if (!error.message.includes('insecurl')) throw error
        return false
      }
    })
  })
  expect(accepted).toEqual([true, true, false, false])
})

test('SVG sanitizer applies image policy to href and xlink:href', async ({ page }) => {
  await loadFramework(page, true)
  const html = await page.evaluate(() => {
    angular.module('securitySvg', ['ngSanitize']).config([
      '$compileProvider',
      '$sanitizeProvider',
      (compile, sanitize) => {
        compile.imgSrcSanitizationTrustedUrlList(/^https:\/\/safe\.example\//)
        sanitize.enableSvg(true)
      }
    ])
    const sanitize = angular.injector(['ng', 'securitySvg']).get('$sanitize')
    return sanitize(
      '<b>Safe formatting</b><svg>' +
        '<image href="https://unsafe.example/image.svg"></image>' +
        '<image xlink:href="https://unsafe.example/other.svg"></image>' +
        '<image href="https://safe.example/image.svg"></image></svg>'
    )
  })
  expect(html).not.toContain('unsafe.example')
  expect(html).toContain('https://safe.example/image.svg')
  expect(html).toContain('<b>Safe formatting</b>')
})

test('SVG bindings and source srcset enforce image policy', async ({ page }) => {
  await loadFramework(page)
  const values = await page.evaluate(() => {
    angular.module('securityBindings', []).config([
      '$compileProvider',
      (compile) => {
        compile.imgSrcSanitizationTrustedUrlList(/^https:\/\/safe\.example\//)
      }
    ])
    const injector = angular.injector(['ng', 'securityBindings'])
    const scope = injector.get('$rootScope').$new()
    scope.source = 'https://unsafe.example/image.svg'
    scope.candidates = 'javascript:alert(1) 1x, https://safe.example/image.png 2x'
    const compile = injector.get('$compile')
    const svg = compile('<svg><image href="{{source}}"></image></svg>')(scope)
    const source = compile('<source srcset="{{candidates}}">')(scope)
    scope.$digest()
    const unsafe = svg[0].querySelector('image').getAttribute('href')
    scope.source = 'https://safe.example/image.svg'
    scope.$digest()
    return {
      unsafe,
      safe: svg[0].querySelector('image').getAttribute('href'),
      srcset: source.attr('srcset')
    }
  })
  expect(values.unsafe).toMatch(/^unsafe:/)
  expect(values.safe).toBe('https://safe.example/image.svg')
  expect(values.srcset).toContain('unsafe:javascript:alert(1)')
  expect(values.srcset).toContain('https://safe.example/image.png 2x')
})

test('copying a large RegExp completes and preserves flags', async ({ page }) => {
  test.setTimeout(5000)
  await loadFramework(page)
  const result = await page.evaluate(() => {
    const original = new RegExp('a'.repeat(100000), 'gim')
    const copied = angular.copy(original)
    return {
      separate: original !== copied,
      source: copied.source === original.source,
      flags: copied.flags
    }
  })
  expect(result).toEqual({ separate: true, source: true, flags: 'gim' })
})

test('URL input rejects a long slash payload without blocking', async ({ page }) => {
  test.setTimeout(5000)
  await loadFramework(page)
  const result = await page.evaluate(() => {
    const injector = angular.injector(['ng'])
    const scope = injector.get('$rootScope').$new()
    const input = injector.get('$compile')('<input type="url" ng-model="value">')(scope)
    const model = input.controller('ngModel')
    model.$setViewValue('http:' + '/'.repeat(100000))
    const rejected = !model.$valid
    model.$setViewValue('https://safe.example/path?query=1')
    return { rejected, accepted: model.$valid }
  })
  expect(result).toEqual({ rejected: true, accepted: true })
})

test('srcset sanitization handles large descriptor whitespace without blocking', async ({
  page
}) => {
  test.setTimeout(5000)
  await loadFramework(page)
  const value = await page.evaluate(() => {
    const injector = angular.injector(['ng'])
    const scope = injector.get('$rootScope').$new()
    scope.candidates = 'https://safe.example/image.png' + ' '.repeat(100000) + '1x'
    const input = injector.get('$compile')('<img srcset="{{candidates}}">')(scope)
    scope.$digest()
    return input.attr('srcset')
  })
  expect(value).toBe('https://safe.example/image.png 1x')
})

test('currency formatting handles long locale whitespace without blocking', async ({ page }) => {
  test.setTimeout(5000)
  await loadFramework(page)
  const result = await page.evaluate(() => {
    const injector = angular.injector(['ng'])
    const pattern = injector.get('$locale').NUMBER_FORMATS.PATTERNS[1]
    pattern.posPre = ' '.repeat(100000)
    pattern.posSuf = ''
    return injector.get('$filter')('currency')(1234, '').trim()
  })
  expect(result).toBe('1,234.00')
})

test('linky handles long non-link text and preserves supported link formats', async ({ page }) => {
  test.setTimeout(5000)
  await loadFramework(page, true)
  const result = await page.evaluate(() => {
    const linky = angular.injector(['ng', 'ngSanitize']).get('$filter')('linky')
    const text = 'a'.repeat(150000)
    return {
      unchanged: linky(text) === text,
      links: linky(
        '(https://safe.example/path), www.safe.example a+b.c%tag@mail.example mailto:user@mail.example ftp://safe.example/file'
      )
    }
  })
  expect(result.unchanged).toBe(true)
  expect(result.links).toContain('href="https://safe.example/path"')
  expect(result.links).toContain('href="http://www.safe.example"')
  expect(result.links).toContain('href="mailto:a+b.c%tag@mail.example"')
  expect(result.links).toContain('href="mailto:user@mail.example"')
  expect(result.links).toContain('href="ftp://safe.example/file"')
})

test('srcset retains a data URL with a density descriptor', async ({ page }) => {
  await loadFramework(page)
  const value = await page.evaluate(() => {
    const injector = angular.injector(['ng'])
    const scope = injector.get('$rootScope').$new()
    scope.candidates = 'data:image/png;base64,iVBORw0KGgo= 1x, https://safe.example/image.png 2x'
    const image = injector.get('$compile')('<img srcset="{{candidates}}">')(scope)
    scope.$digest()
    return image.attr('srcset')
  })
  expect(value).toBe('data:image/png;base64,iVBORw0KGgo= 1x,https://safe.example/image.png 2x')
})
