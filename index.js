class BaseClass {
  constructor (...args) {
    const keys = Object.keys(this.args)

    if (args.length < keys.length) {
      throw new Error(`The ${this.constructor.name} constructor must receive at least ${keys.length} argument${keys.length > 1 && 's'}!!!`)
    }

    const validateType = (arg, key, idx, instance) => {
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
          if (typeof arg !== type) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${instance && instance.name}' type!!!`)
          }
          break

        default:
      }
    }

    Object.assign(this, args.reduce((acc, arg, idx) => {
      const key = keys[idx]

      if (typeof key !== 'undefined') {
        const instance = this.args[key]

        if (typeof instance === 'function') {
          validateType(arg, key, idx, instance)
        }

        if (Array.isArray(instance)) {
          let pass = false
          let err = null

          instance.forEach((inst) => {
            try {
              validateType(arg, key, idx, inst)
              pass = true
            }
            catch (error) {
              err = error
            }
          })

          if (!pass) {
            throw err
          }
        }

        acc[key] = arg
      }
      else {
        acc[idx] = arg
      }

      return acc
    }, {}))
  }

  get args () {
    return {}
  }
}

export default BaseClass

module.exports = BaseClass
