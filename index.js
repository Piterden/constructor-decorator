class BaseClass {
  // eslint-disable-next-line space-before-function-paren
  constructor (...args) {
    const keys = Object.keys(this.args)

    if (args.length < keys.length) {
      throw new Error(`The ${this.constructor.name} constructor must receive at least ${keys.length} argument${keys.length > 1 && 's'}!!!`)
    }

    Object.assign(this, args.reduce((acc, arg, idx) => {
      const key = keys[idx]

      if (typeof key !== 'undefined') {
        const instance = this.args[key]
        const type = instance && instance.name ? instance.name.toLowerCase() : 'object'

        switch (typeof arg) {
          case 'array':
            if (!Array.isArray(arg)) {
              throw new TypeError(`The argument ${idx + 1} ('${key}') must be 'Array' type!!!`)
            }
            break

          case 'object':
            if (!(arg instanceof instance || arg.constructor.name === instance.name)) {
              throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${instance.name}' type!!!`)
            }
            break

          case 'string':
          case 'number':
          case 'boolean':
            if (typeof arg !== type) { // eslint-disable-line valid-typeof
              throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${instance && instance.name}' type!!!`)
            }
            break

          default:
        }

        acc[key] = arg
      }
      else {
        acc[idx] = arg
      }

      return acc
    }, {}))
  }

  // eslint-disable-next-line space-before-function-paren
  get args () { // eslint-disable-line class-methods-use-this
    return {}
  }
}

export default BaseClass // eslint-disable-line import/no-default-export
