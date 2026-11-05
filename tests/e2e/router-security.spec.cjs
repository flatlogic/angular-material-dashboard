const path = require('node:path');
const { test, expect } = require('@playwright/test');

test('legacy router parses malformed patterns without blocking and preserves custom regex parameters', async ({ page }) => {
  test.setTimeout(5000);
  await page.setContent('<div>Router regression</div>');
  await page.addScriptTag({ path: path.resolve('bower_components/angular/angular.min.js') });
  await page.addScriptTag({ path: path.resolve(process.env.ROUTER_SECURITY_JS || 'bower_components/angular-ui-router/release/angular-ui-router.min.js') });
  const result = await page.evaluate(() => {
    angular.module('routerSyntax', ['ui.router']).config(['$urlRouterProvider', provider => provider.deferIntercept()]);
    const injector = angular.bootstrap(document.body, ['routerSyntax']);
    const matcher = injector.get('$urlMatcherFactory');
    const started = performance.now();
    matcher.compile('/path/{id:' + 'a'.repeat(40));
    const valid = matcher.compile('/{id:   [0-9]{1,8}}');
    return { elapsed: performance.now() - started, value: valid.exec('/42', {}).id };
  });
  expect(result.elapsed).toBeLessThan(1000);
  expect(result.value).toBe('42');
});
