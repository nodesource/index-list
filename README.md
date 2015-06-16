# index-list
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/index-list.svg?style=flat)
![](http://img.shields.io/npm/dm/index-list.svg?style=flat)
![](http://img.shields.io/npm/l/index-list.svg?style=flat)

Build up an indexed list of strings. Useful for minimising the size of categorical data when transferring it over the wire.

## Usage

[![NPM](https://nodei.co/npm/index-list.png)](https://nodei.co/npm/index-list/)

### `list = IndexList([initial], [options])`

Creates a new indexed list.

### `list.push(elements...)`

Adds one or more new elements to the end of the list.

### `list.toJSON()`

Creates a serialized version of the input data, ready to be stringified into
JSON, which can later be loaded with `IndexList.load()`.

Note that while this is generally more compact, you can
reduce the size further by storing the `items` as binary
data using a `Uint32Array` or similar. Alternatively you
can convert that data into base64 and expand before loading
it again.

### `IndexList.load(json)`

Loads a previously serialized `IndexList`, returning a new
instance.

``` javascript
var list = IndexList(data)
var copy = IndexList.load(list.toJSON())

// copy.expand() ~= list.expand()
```

### `list.expand()`

Creates an expanded copy of the stored values, representing the original
input data.

``` javascript
var list = IndexList(['hello', 'world', 'again', 'hello', 'hello', 'world', 'again', 'again'])

// list.toJSON() ~= { items: [0, 1, 2, 0, 0, 1, 2, 2], index: ['hello', 'world', 'again'] }
// list.expand() ~= ['hello', 'world', 'again', 'hello', 'hello', 'world', 'again', 'again']
```

## License

MIT. See [LICENSE.md](http://github.com/nodesource/index-list/blob/master/LICENSE.md) for details.
