# Constructor Decorator

Typized and autoassigned arguments for JS class constructor.

## Overview

Are you not tired of constantly writing like:

```js
class Transaction {
  constructor (
    wallet,
    explorer,
    txid,
    direction,
    recepient,
    amount,
    datetime,
    confirmations
  ) {
    this.txid = txid
    this.amount = amount
    this.wallet = wallet
    this.datetime = datetime
    this.explorer = explorer
    this.direction = direction
    this.recepient = recepient
    this.confirmations = confirmations
  }
}

module.exports = Transaction
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
      wallet: [Foo, Bar],
      explorer: [Baz, String],
      txid: String,
      direction: Boolean,
      recepient: String,
      amount: [String, Number],
      datetime: Date,
      confirmations: Number,
    }
  }

  constructor () {
    super(...arguments)
  }
}

module.exports = TypedEntity
```

The types compare is enabled with an array OR-operator syntax support.
