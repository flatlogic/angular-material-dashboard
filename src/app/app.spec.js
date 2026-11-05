describe('dashboard services after the dependency update', function () {
  beforeEach(module('app'))
  it('retains asynchronous todo data', inject(function (todoListService, $rootScope) {
    var items
    todoListService.loadAllItems().then(function (data) {
      items = data
    })
    $rootScope.$digest()
    expect(items.length).toBe(3)
    expect(items[0].text).toBe('Continuous integration')
    expect(items[1].done).toBe(true)
  }))
  it('retains table contents', inject(function (tableService, $rootScope) {
    var items
    tableService.loadAllItems().then(function (data) {
      items = data
    })
    $rootScope.$digest()
    expect(items.length).toBe(8)
    expect(items[0].issue).toBe('Nested views')
  }))
})
