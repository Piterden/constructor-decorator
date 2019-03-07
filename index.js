class BaseClass {
  constructor (...args) {
    const keys = Object.keys(this.args)

    if (args.length < keys.length) {
      throw new Error(`The ${this.constructor.name} constructor must receive at least ${keys.length} argument${keys.length > 1 && 's'}!!!`)
    }

    const validateType = (arg, key, idx, value) => {
      const type = value && value.name ? value.name.toLowerCase() : 'object'

      switch (typeof arg) {
        case 'array':
          if (!Array.isArray(arg)) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be 'Array' type!!!`)
          }
          break

        case 'object':
          if (!(arg instanceof value || arg.constructor.name === value.name)) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${value.name}' type!!!`)
          }
          break

        case 'string':
        case 'number':
        case 'boolean':
          if (typeof arg !== type) {
            throw new TypeError(`The argument ${idx + 1} ('${key}') must be '${value && value.name}' type!!!`)
          }
          break

        default:
      }
    }

    Object.assign(this, args.reduce((acc, arg, idx) => {
      const key = keys[idx]

      if (typeof key !== 'undefined') {
        const value = this.args[key]

        if (typeof value === 'function') {
          validateType(arg, key, idx, value)
        }

        if (Array.isArray(value)) {
          let pass = false
          let err = null

          value.forEach((inst) => {
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
