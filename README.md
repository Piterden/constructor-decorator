# Constructor Decorator

Typized and autoassigned arguments for JS class constructor.

## Overview

Are you not tired of constantly writing like:

```js
class TypedEntity {
  constructor (
    foo,
    bar,
    baz,
    bat,
    fie,
    bal,
    fuu,
    faa
  ) {
    this.baz = baz
    this.bal = bal
    this.foo = foo
    this.fuu = fuu
    this.bar = bar
    this.bat = bat
    this.fie = fie
    this.faa = faa
  }
}

module.exports = TypedEntity
```

Now you can avoid of it with the class extend:

```js
const BaseClass = require('constructor-decorator')

const Foo = require('./Foo')
const Bar = require('./Bar')
const Baz = require('./Baz')


class TypedEntity extends BaseClass {
  get args () {
    return {
      foo: [Foo, Baz],
      bar: [Bar, String],
      baz: String,
      bat: Boolean,
      fie: String,
      bal: [String, Number],
      fuu: Date,
      faa: Number,
    }
  }

  constructor () {
    super(...arguments)
  }
}

module.exports = TypedEntity
```

The types compare is enabled with an array OR-operator syntax support.
