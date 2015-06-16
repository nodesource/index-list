var Symbol = require('es6-symbol')
var INC    = Symbol('inc')

module.exports = IndexList

function IndexList(initial) {
  if (!(this instanceof IndexList))
    return new IndexList(initial)

  this[INC]   = 0
  this.items  = []
  this.index  = {}
  this.lookup = {}

  initial = initial || []
  for (var i = 0; i < initial.length; i++) {
    this.push(initial[i])
  }
}

IndexList.prototype.push = function(element) {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.push(arguments[i])
    }
    return
  }

  var i   = this.items.length
  var key = this.key(element)
  var idx = this.index[key] = (element in this.index)
    ? this.index[key]
    : this.id(element)

  this.lookup[idx] = key

  return this.items[i] = idx
}

IndexList.prototype.expand = function() {
  var arr = []

  for (var i = 0; i < this.items.length; i++) {
    arr[i] = this.lookup[this.items[i]]
  }

  return arr
}

IndexList.prototype.key = function(element) {
  return String(element)
}

IndexList.prototype.id = function() {
  return this[INC]++
}

IndexList.load = function(items, index) {
  var list = IndexList()

  if (items.items && items.index) {
    index = items.index
    items = items.items
  }

  list.items  = items
  list.index  = index
  list.lookup = {}

  Object.keys(list.index).forEach(function(key) {
    list.lookup[list.index[key]] = key
  })

  return list
}

IndexList.prototype.toJSON = function() {
  return {
    items: this.items,
    index: this.index
  }
}
