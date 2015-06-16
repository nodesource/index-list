const test = require('tape')
const List = require('./')
const data = [
    'hello'
  , 'world'
  , 'hello'
  , 'hello'
  , 'hello'
  , 'world'
  , 'again'
]

test('IndexList#expand()', function(t) {
  const list = List()

  t.deepEqual(list.expand(), [], 'starts empty')

  list.push.apply(list, data)

  t.deepEqual(list.expand(), data, 'repopulates correctly')
  t.notEqual(list.expand(), data, 'with a copied array')
  t.end()
})

test('IndexList#items', function(t) {
  const list = List()

  t.deepEqual(list.items, [], 'starts empty')

  list.push.apply(list, data)

  t.deepEqual(list.items, [0, 1, 0, 0, 0, 1, 2], 'items are as expected')
  t.end()
})

test('IndexList#lookup', function(t) {
  const list = List()

  t.deepEqual(list.lookup, {}, 'starts empty')

  list.push.apply(list, data)
  t.deepEqual(list.lookup, {
    0: 'hello',
    1: 'world',
    2: 'again'
  })

  t.end()
})

test('IndexList#index', function(t) {
  const list = List()

  t.deepEqual(list.index, {}, 'starts empty')

  list.push.apply(list, data)
  t.deepEqual(list.index, {
    'hello': 0,
    'world': 1,
    'again': 2
  })

  t.end()
})

test('IndexList(initial)', function(t) {
  const list = List(data)

  t.deepEqual(list.expand(), data, 'starts populated')
  t.notEqual(list.expand(), data, 'with a copied array')
  t.end()
})

test('IndexList#toJSON', function(t) {
  const list = List(data)

  t.deepEqual(list.toJSON(), {
    items: [0, 1, 0, 0, 0, 1, 2],
    index: {
      hello: 0,
      world: 1,
      again: 2
    }
  })

  t.end()
})

test('IndexList.load', function(t) {
  const list = List(data)
  const copy = List.load(list.toJSON())

  t.deepEqual(copy.expand(), list.expand())
  t.end()
})
