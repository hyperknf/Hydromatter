// CODED BY HYPERKNF, DO NOT CLONE //

"USE STRICT"

const decimal = require("decimal.js")

const suffixes = [
  ["U", "D", "T", "Qt", "Qn", "Sx", "Sp", "O", "N"],
  [
    ["", "B", "Tr", "Qd", "Qi", "Si", "Se", "Oi", "Ni"],
    ["Dk", "Vk", "Tk", "Qdk", "Qtk", "Sxk", "Stk", "Ok", "Nk"],
    ["Ca", "BiCa", "TiCa", "QaCa", "QuCa", "SiCa", "SeCa", "OcCa", "NoCa"]
  ],
  [
    [0, ["K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "O", "N"]],
    [0, ["De", "Vg", "Tg", "Qdg", "Qqg", "Sxg", "Stg", "Og", "Ng"]],
    [1, "Ct"],
    [2, "Mi"],
    [3, "My"],
    [3, "Mc"],
    [3, "Na"],
    [3, "Pc"],
    [3, "Fm"]
  ]
]

for (let i = 0; i <= suffixes[2].length - 1; i++) {
  if (suffixes[2][i][0] == 0) continue
  
  const array = []
  for (let prefix = 0; prefix <= 8; prefix++) array.push(suffixes[1][0][prefix] + suffixes[2][i][1])
  if (suffixes[2][i][0] >= 2) {
    for (let fix = 0; fix <= 8; fix++) {
      for (let pre = 0; pre <= 8; pre++)  array.push(suffixes[1][0][pre] + suffixes[1][1][fix] + suffixes[2][i][1])
    }
    if (suffixes[2][i][0] == 3) {
      for (let yoyo = 0; yoyo <= 8; yoyo++) {
        for (let fix = 0; fix <= 8; fix++) {
          for (let pre = 0; pre <= 8; pre++) array.push(suffixes[1][0][pre] + suffixes[1][1][fix] + suffixes[1][2][yoyo] + suffixes[2][i][1])
        }
      }
    }
  }

  suffixes[2][i][1] = array
}

const functions = {
  convertMaxValue: function (value) {
    return value >= Number.MAX_VALUE ? Infinity : value
  },
  processSuffix: function (value) {
    if (typeof value == "object" && typeof value[0] == "string" && typeof value[1] == "number") {
      let base = Number(value[0])
      let exp = value[1]
      let positive = true
      
      if (exp < 0) {
        exp = Math.abs(exp)
        positive = false
      }

      if (exp >= Number.MAX_SAFE_INTEGER) exp = Number.MAX_SAFE_INTEGER

      const remainder = exp % 3
      exp -= remainder

      function process_s(index) {
        if (index < 11) return (suffixes[2][0][1][index - 1] + "").replaceAll("undefined", "")
        if (index < 101) {
          const first = Math.floor((index - 1) / 10) - 1
          index -= 10 * first + 10
          return ("" + suffixes[0][index - 2] + suffixes[2][1][1][first]).replaceAll("undefined", "")
        }
        if (index < 1001) {
          const first = Math.floor((index - 1) / 100) - 1
          index -= 100 * first + 100
          const second = Math.floor((index - 1) / 10) - 1
          index -= 10 * second + 10
          return ("" + suffixes[0][index - 2] + suffixes[2][1][1][second] + suffixes[2][2][1][first]).replaceAll("undefined", "")
        }
        if (index < 10001) {
          const first = Math.floor((index - 1) / 1000) - 1
          index -= 1000 * first + 1000
          const second = Math.floor((index - 1) / 100) - 1
          index -= 100 * second + 100
          const third = Math.floor((index - 1) / 10) - 1
          index -= 10 * third + 10
          return ("" + suffixes[0][index - 1] + suffixes[2][1][1][third] + suffixes[2][2][1][second] + suffixes[2][3][1][first]).replaceAll("undefined", "")
        }
        if (index < 1000001) {
          const first = Math.floor((index - 1) / 10000) - 11
          index -= 10000 * first + 10000
          const second = Math.floor((index - 1) / 1000) - 1
          index -= 1000 * second + 1000
          const third = Math.floor((index - 1) / 100) - 1
          index -= 100 * third + 100
          const fourth = Math.floor(index / 10) - 1
          index -= 10 * fourth + 10
          return ("" + suffixes[0][index - 1] + suffixes[2][1][1][fourth] + suffixes[2][2][1][third] + suffixes[2][3][1][second] + suffixes[2][4][1][first]).replaceAll("undefined", "")
        }
        if (index < 1000000001) {
          const first = Math.floor((index - 1) / 1000000) - 101
          index -= 1000000 * first + 1000000
          const second = Math.floor((index - 1) / 10000) - 11
          index -= 10000 * second + 10000
          const third = Math.floor((index - 1) / 1000) - 1
          index -= 1000 * third + 1000
          const fourth = Math.floor((index - 1) / 100) - 1
          index -= 100 * fourth + 100
          const fifth = Math.floor((index - 1) / 10) - 1
          index -= 10 * fifth + 10
          return ("" + suffixes[0][index - 1] + suffixes[2][1][1][fifth] + suffixes[2][2][1][fourth] + suffixes[2][3][1][third] + suffixes[2][4][1][second] + suffixes[2][5][1][first]).replaceAll("undefined", "")
        }
        if (index < 1000000000001) {
          const first = Math.floor((index - 1) / 1000000000) - 101
          index -= 1000000000 * first + 1000000000
          const second = Math.floor((index - 1) / 1000000) - 101
          index -= 1000000 * second + 1000000
          const third = Math.floor((index - 1) / 10000) - 11
          index -= 10000 * third + 10000
          const fourth = Math.floor((index - 1) / 1000) - 1
          index -= 1000 * fourth + 1000
          const fifth = Math.floor((index - 1) / 100) - 1
          index -= 100 * fifth + 100
          const sixth = Math.floor((index - 1) / 10) - 1
          index -= 10 * sixth + 10
          return ("" + suffixes[0][index - 1] + suffixes[2][1][1][sixth] + suffixes[2][2][1][fifth] + suffixes[2][3][1][fourth] + suffixes[2][4][1][third] + suffixes[2][5][1][second] + suffixes[2][6][1][first]).replaceAll("undefined", "")
        }
        if (index < 1000000000000001) {
          const first = Math.floor((index - 1) / 1000000000000) - 1
          index -= 1000000000000 * first + 1000000000000
          const second = Math.floor((index - 1) / 1000000000) - 1
          index -= 1000000000 * second + 1000000000
          const third = Math.floor((index - 1) / 1000000) - 1
          index -= 1000000 * third + 1000000
          const fourth = Math.floor((index - 1) / 10000) - 1
          index -= 10000 * fourth + 10000
          const fifth = Math.floor((index - 1) / 1000) - 1
          index -= 1000 * fifth + 1000
          const sixth = Math.floor((index - 1) / 100) - 1
          index -= 100 * sixth + 100
          const seventh = Math.floor((index - 1) / 100) - 1
          index -= 10 * sixth + 10
          return ("" + suffixes[0][index - 1] + suffixes[2][1][1][seventh] + suffixes[2][2][1][sixth] + suffixes[2][3][1][fifth] + suffixes[2][4][1][fourth] + suffixes[2][5][1][third] + suffixes[2][6][1][second] + suffixes[2][7][1][first]).replaceAll("undefined", "")
        }
      }

      return (!positive ? "-" : "") + (Math.round(base * Math.pow(10, remainder) * 1000) / 1000) + " " + process_s(exp / 3)
    } else throw new Error("The value you've entered was not an exponent-big-integer value")
  }
}

const class_statics = {
  supportsNativeNumber: typeof Number == "function",
  supportsNativeBigInt: typeof BigInt == "function"
}

if (!class_statics.supportsNativeNumber) throw new Error("Your JavaScript client does not support numbers")

const class_functions = {
  new: function (arg) {
    try {
      const value_type = typeof arg

      if (value_type == "object" && typeof arg[0] == "string" && typeof arg[1] == "number") {
        let base = new decimal(arg[0])
        let exp = arg[1]

        if (String(base) == "0") return ["0", 0]

        if (Math.abs(base) == Infinity || Math.abs(exp) == Infinity) return [9.999999999, Number.MAX_SAFE_INTEGER]

        while (base.comparedTo(1) == -1) {
          base = decimal.mul(base, 10)
          exp -= 1
        }
        while (base.comparedTo(10) >= 0) {
          base = decimal.div(base, 10)
          exp += 1
        }

        if (exp >= Number.MAX_SAFE_INTEGER) return [base, Number.MAX_SAFE_INTEGER]

        return [String(base), Math.floor(exp)]
      } else if (value_type == "number") {
        if (Math.abs(arg) >= Infinity) return ["9.999999999", Number.MAX_SAFE_INTEGER]
        
        let exp = 0

        arg = new decimal(arg)
        
        while (arg.comparedTo(10) >= 0) {
          arg = decimal.div(arg, 10)
          exp += 1
        }

        return [String(arg), Math.floor(exp)]
      } else {
        const arg2 = Number(arg)
        
        if (Math.abs(arg2) >= Infinity || isNaN(arg2)) return ["9.999999999", Number.MAX_SAFE_INTEGER]

        arg = new decimal(arg)
        
        let exp = 0
        
        while (arg.comparedTo(10) >= 0) {
          arg = decimal.div(arg, 10)
          exp += 1
        }

        if (exp >= Number.MAX_SAFE_INTEGER) return [String(arg), Number.MAX_SAFE_INTEGER]

        return [String(arg), Math.floor(exp)]
      }
    } catch (exception) {
      throw new Error(`The argument you've entered had caused an error. ${exception}`)
    }
  },
  toNumber: function (value_dummy) {
    if (typeof value_dummy == "object" && typeof value_dummy[0] == "string" && typeof value_dummy[1] == "number") {
      const value = []
      for (let item in value_dummy) value.push(value_dummy[item])
      value[0] = new decimal(value[0])
      const result = decimal.mul(value[0], Math.pow(10, Math.floor(value[1])))
      return Number(result) >= Number.MAX_VALUE ? Infinity : Number(result)
    } else throw new Error("The value you've entered was not an exponent-big-integer value")
  },
  toNumberString: function (type, value_dummy) {
    if (typeof value_dummy == "object" && typeof value_dummy[0] == "string" && typeof value_dummy[1] == "number") {
      const value = []
      for (let item in value_dummy) value.push(value_dummy[item])
      if (type == "whole") {
        if (value[1] >= 15) {
          if (value[1] > 32768) {
            value[0] = new decimal(value[0])
            while (value[0].comparedTo(10) >= 0) {
              value[0] = decimal.div(value[0], 10)
              value[1] += 1
            }
            let symbol = "+"
            if (value[1] < 0) symbol = "-"
            return `${Number(value[0]).toFixed(10)}e${symbol}${value[1]}`
          }
          let int = String(decimal.mul(value[0], Math.pow(10, 15)))
          value[1] -= 15
          while (value[1] >= 1) {
            int += "0"
          }
          return int
        } else return String(decimal.mul(value[0], Math.round(Math.pow(10, value[1]))))
      } else if (type == "scientific") {
        value[0] = new decimal(value[0])
        while (value[0].comparedTo(10) >= 0) {
          value[0] = new decimal(10)
          value[1] += 1
        }
        if (value[1] < 6) return String(decimal.mul(new decimal(value[0]), Math.round(Math.pow(10, value[1]))))
        let symbol = "+"
        if (value[1] < 0) symbol = "-"
        return `${String(value[0])}e${symbol}${value[1]}`
      } else if (type == "suffix") {
        if (value[1] > 6) return functions.processSuffix(value)
        return String(decimal.mul(value[0], Math.round(Math.pow(10, value[1]))))
      }
    } else throw new Error(`The value you've entered was not an exponent-big-integer value`)
  },
  getSuffix: function (index) {
    return (functions.processSuffix(["1", index * 3]).split(" "))[1]
  },
  add: function (x, y) {
    const xBase = new decimal(x[0])
    const yBase = new decimal(y[0])
    const xExponent = x[1]
    const yExponent = y[1]
  
    if (Math.abs(xExponent - yExponent) > 20) return x
  
    const exp = xExponent - yExponent
    const xNum = xBase.mul(Math.pow(10, exp))
    let xExp = yExponent
    let resultNum = xNum.add(yBase)
    while (resultNum.comparedTo(10) >= 0) {
      resultNum = decimal.div(resultNum, 10)
      xExp += 1
    }
  
    return [String(resultNum), Math.round(xExp)]
  },
  minus: function (x, y) {
    const xBase = new decimal(x[0])
    const yBase = new decimal(y[0])
    const xExponent = x[1]
    const yExponent = y[1]
  
    if (Math.abs(xExponent - yExponent) > 20) return x
  
    const exp = xExponent - yExponent
    const xNum = xBase.mul(Math.pow(10, exp))
    let xExp = yExponent
    let resultNum = xNum.minus(yBase)
    while (resultNum.comparedTo(10) >= 0) {
      resultNum = decimal.div(resultNum, 10)
      xExp += 1
    }
  
    return [String(resultNum), Math.round(xExp)]
  },
  multiply: function (x, y) {
    const xBase = new decimal(x[0])
    const yBase = new decimal(y[0])
    const xExponent = x[1]
    const yExponent = y[1]

    let exp = xExponent + yExponent
    let resultNum = xBase.mul(yBase)
    while (resultNum.comparedTo(10) >= 0) {
      resultNum = decimal.div(resultNum, 10)
      exp += 1
    }

    return [String(resultNum), Math.round(exp)]
  },
  divide: function (x, y) {
    const xBase = new decimal(x[0])
    const yBase = new decimal(y[0])
    const xExponent = x[1]
    const yExponent = y[1]

    let exp = xExponent + yExponent
    let resultNum = xBase.div(yBase)
    while (resultNum.comparedTo(10) >= 0) {
      resultNum = decimal.div(resultNum, 10)
      exp += 1
    }
    while (resultNum.comparedTo(1) == -1) {
      resultNum = decimal.mul(resultNum, 10)
      exp -= 1
    }

    return [String(resultNum), Math.round(exp)]
  },
  log: function (base, value) {
    const log10 = Math.log10(value[0]) + value[1]
    const log10base = Math.log10(base)
    return log10 / log10base
  },
  absolute: function (value) {
    value[0] = decimal.abs(new decimal(value[0]))
    return value
  },
  compare: function (x, y) {
    const xb = new decimal(x[0])
    const yb = new decimal(y[0])
    if (x[1] > y[1]) return 1
    if (x[1] < y[1]) return 2
    if (xb.comparedTo(yb) == 1) return 1
    if (xb.comparedTo(yb) == -1) return 2
    return 0
  },
  isInteger: function (value) {
    while (value[0] != value[0].floor()) {
      value[0] = decimal.mul(value[0], 10)
      value[1] -= 1
    }
    return value[1] >= 0
  },
  isLarger: function (x, y) {
    const xb = new decimal(x[0])
    const yb = new decimal(y[0])
    if (x[1] > y[1]) return true
    if (x[1] == y[1] && xb.comparedTo(yb) == 1) return true
    return false
  },
  isSmaller: function (x, y) {
    const xb = new decimal(x[0])
    const yb = new decimal(y[0])
    if (x[1] < y[1]) return true
    if (x[1] == y[1] && xb.comparedTo(yb) == -1) return true
    return false
  },
  isEqual: function (x, y) {
    return x == y
  }
}

class_functions.toBigInt = function (value) {
  if (typeof value == "object" && typeof value[0] == "string" && typeof value[1] == "number") {
    if (!class_statics.supportsNativeBigInt) throw new Error("Native BigInt is not supported")
    if (value[1] > 32768) throw new Error("Number length is longer than 32768 characters")
    return BigInt(class_functions.toNumberString("whole", value))
  }
}

class_functions.power = function (x, y) {
  const power = class_functions.toNumber(y)
  const result = [decimal.pow(x[0], power), x[1] ** power]
  while (result[0].comparedTo(10) >= 0) {
    result[0] = decimal.div(result[0], 10)
    result[1] += 1
    if (result[1] >= Number.MAX_SAFE_INTEGER) return ["9.99999999", Number.MAX_SAFE_INTEGER]
  }
  return result
}

class_functions.modulo = function (x, y) {
  while (x[0] != decimal.floor(x[0])) {
    x[0] = decimal.mul(x[0], 10)
    x[1] -= 1
  }
  while (y[0] != decimal.floor(y[0])) {
    y[0] = decimal.mul(y[0], 10)
    y[1] -= 1
  }
  
  const main_modulo = (first, second) => {
    a = first[0]
    b = first[1]
    c = second[0]
    d = second[1]
    const min = Math.min(b, d)
    return class_functions.new(decimal.mod(decimal.mul(a, 10 ** (b - min)), decimal.mul(c, 10 ** (d - min)) * 10 ** min))
  }

  if (x[1] / y[1] >= Number.MAX_SAFE_INTEGER || x[1] / y[1] <= Number.EPSILON) throw new Error("The difference of the exponent of two values exceeded Number.MAX_SAFE_INTEGER times, therefore unable to evaluate.")

  return main_modulo(x, y)
}

/**
* Changes a JavaScript number, string or another exponent-big-integer value into a exponent-big-integer value
*
* @param {any} arg - The value you wanted to pass in, preferably a number (integer or float), a string, or another exponent-big-integer value
* @return {object} - The exponent-big-integer value returned
*/

function ExponentBigInt(arg) {
  return class_functions.new(arg)
}

ExponentBigInt.basic = {
    statics: class_statics,
    functions: class_functions
}
  
ExponentBigInt.supportsNativeNumber = class_statics.supportsNativeNumber
ExponentBigInt.supportsNativeBigInt = class_statics.supportsNativeBigInt

ExponentBigInt.zero = ["0", 0]
ExponentBigInt.one = ["1", 0]

/**
* Changes a JavaScript number, string or another exponent-big-integer value into a exponent-big-integer value
*
* @param {any} arg - The value you wanted to pass in, preferably a number (integer or float), a string, or another exponent-big-integer value
* @return {object} - The exponent-big-integer value returned
*/
  
ExponentBigInt.new = function (arg) {
    return class_functions.new(arg)
}
ExponentBigInt.create = ExponentBigInt.new

/**
* Changes an exponent-big-integer value into a JavaScript number value, returns Infinity if bigger than Number.MAX_VALUE
*
* @param {object} value - The exponent-big-integer value you wanted to pass in
* @return {number} - The JavaScript number value returned
*/

ExponentBigInt.toNumber = function (value) {
    return class_functions.toNumber(value)
}
ExponentBigInt.toNum = ExponentBigInt.toNumber
ExponentBigInt.toFloat = ExponentBigInt.toNumber
ExponentBigInt.getValue = ExponentBigInt.toNumber
ExponentBigInt.getVal = ExponentBigInt.toNumber
ExponentBigInt.value = ExponentBigInt.toNumber
ExponentBigInt.val = ExponentBigInt.toNumber

/**
* Similar to the toNumber method, but converts to a string instead of a JavaScript number, is not limited by Number.MAX_VALUE, but limited to 9.999x10^Number.MAX_SAFE_INTEGER
*
* @param {string} type - The return type, "scientific" for scientific notation, "suffix" for number with suffix, or "whole" for the whole number (forces to scientific notation if exponent is larger than 32768)
* @param {object} value - The exponent-big-integer value you wanted to pass in
* @return {string} - The JavaScript string value returned
*/

ExponentBigInt.toNumberString = function (type, value) {
    return class_functions.toNumberString(type, value)
}
ExponentBigInt.toString = ExponentBigInt.toNumberString
ExponentBigInt.string = ExponentBigInt.toNumberString
ExponentBigInt.str = ExponentBigInt.toNumberString

/**
* Equivalent to ExponentBigInt.toNumberString("suffix", value)
*
* @param {object} value - The exponent-big-integer value you wanted to pass in
* @return {string} - The JavaScript string value returned
*/

ExponentBigInt.toSuffix = function (value) {
    return class_functions.toNumberString("suffix", value)
}
ExponentBigInt.toSuf = ExponentBigInt.toSuffix
ExponentBigInt.suffix = ExponentBigInt.toSuffix
ExponentBigInt.suf = ExponentBigInt.toSuffix

/**
* Equivalent to ExponentBigInt.toNumberString("scientific", value)
*
* @param {object} value - The exponent-big-integer value you wanted to pass in
* @return {string} - The JavaScript string value returned
*/

ExponentBigInt.toScientific = function (value) {
    return class_functions.toNumberString("scientific", value)
}
ExponentBigInt.toSci = ExponentBigInt.toScientific
ExponentBigInt.scientific = ExponentBigInt.toScientific
ExponentBigInt.sci = ExponentBigInt.toScientific

/**
* Converts an exponent-big-integer value into JavaScript native BigInt value, returns an error if native BigInt is not supported or the exponent is larger than 32768
* @param {object} value - The exponent-big-integer value you wanted to pass in
* @return {string} - The JavaScript BigInt value
*/

ExponentBigInt.toBigInt = function (value) {
    return class_functions.toBigInt(value)
}
ExponentBigInt.BigInt = ExponentBigInt.toBigInt
ExponentBigInt.bigint = ExponentBigInt.toBigInt
ExponentBigInt.bi = ExponentBigInt.toBigInt

/**
* Get the suffix for "suffix" option in toNumberString method by index
* @param {number} value - The index you wanted to pass in
* @return {string} - The suffix
*/

ExponentBigInt.getSuffix = function (index) {
    return class_functions.getSuffix(Math.abs(index))
}
ExponentBigInt.getSuf = ExponentBigInt.getSuffix

/**
* Adds a number to another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.add = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.add(x, y)
}
ExponentBigInt.plus = ExponentBigInt.add

/**
* Substracts a number from another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.minus = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.minus(x, y)
}
ExponentBigInt.substract = ExponentBigInt.minus
ExponentBigInt.sub = ExponentBigInt.minus

/**
* Multiplies two numbers, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.multiply = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.multiply(x, y)
}
ExponentBigInt.times = ExponentBigInt.multiply
ExponentBigInt.mul = ExponentBigInt.multiply

/**
* Divides one number by another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.divide = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.multiply(x, y)
}
ExponentBigInt.div = ExponentBigInt.divide

/**
* Evaluates the first number to the power of the second number, supports exponent-big-integer values, returns 9.99999999x10^Number.MAX_SAFE_INTEGER if exceeds that
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.power = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.power(x, y)
}
ExponentBigInt.pow = ExponentBigInt.power

/**
* Evaluates the logaithm of the second number with the first number as base, supports exponent-big-integer values, the base only supports up to Number.MAX_SAFE_INTEGER
* @param {*} base - The base
* @param {*} value - The value
* @return {number} - The JavaScript native number value returned
*/

ExponentBigInt.logarithm = function (base, value) {
    base = ExponentBigInt.toNumber(class_functions.new(base))
    if (base >= Number.MAX_SAFE_INTEGER) throw new Error("The base you've entered was larger than Number.MAX_SAFE_INTEGER")
    value = class_functions.new(value)
    return class_functions.log(base, value)
}
ExponentBigInt.log = ExponentBigInt.logarithm

/**
* Evaluates the modulo of two numbers, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.modulo = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.modulo(x, y)
}
ExponentBigInt.mod = ExponentBigInt.modulo

/**
* Returns the absolute value of a number, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {object} - The exponent-big-integer value returned
*/

ExponentBigInt.absolute = function (value) {
    value = class_functions.new(value)
    return class_functions.absolute(value)
}
ExponentBigInt.abs = ExponentBigInt.absolute
ExponentBigInt.toPositive = ExponentBigInt.absolute

/**
* Compares one number with another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {number} - Returns 1 if first number is bigger, 2 if second number is bigger, 0 if equal
*/

ExponentBigInt.compare = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.compare(x, y)
}

/**
* Checks if a number is an integer, supports exponent-big-integer values
* @param {*} value - The value to be checked
* @return {boolean} - Returns true if larger, false otherwise
*/

ExponentBigInt.isInteger = function (value) {
    value = class_functions.new(value)
    return class_functions.isInteger(value)
}
ExponentBigInt.isInt = ExponentBigInt.isInteger
ExponentBigInt.integer = ExponentBigInt.isInteger
ExponentBigInt.int = ExponentBigInt.isInteger

/**
* Checks if a number is positive, supports exponent-big-integer values
* @param {*} value - The value to be checked
* @return {boolean} - Returns true if larger, false otherwise
*/

ExponentBigInt.isPositive = function (value) {
    value = class_functions.new(value)
    return class_functions.isLarger(value, [0, 0])
}
ExponentBigInt.isPos = ExponentBigInt.isPositive
ExponentBigInt.positive = ExponentBigInt.isPositive
ExponentBigInt.pos = ExponentBigInt.isPositive
  
/**
* Checks if one number is larger than another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {boolean} - Returns true if larger, false otherwise
*/

ExponentBigInt.isLarger = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.isLarger(x, y)
}
ExponentBigInt.isBigger = ExponentBigInt.isLarger
ExponentBigInt.larger = ExponentBigInt.isLarger
ExponentBigInt.bigger = ExponentBigInt.isLarger

/**
* Checks if one number is smaller than another, supports exponent-big-integer values (is the same as "x == y")
* @param {*} x - The first value
* @param {*} y - The second value
* @return {boolean} - Returns true if smaller, false otherwise
*/

ExponentBigInt.isSmaller = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.isSmaller(x, y)
}
ExponentBigInt.smaller = ExponentBigInt.isSmaller

/**
* Checks if one number is equal to another, supports exponent-big-integer values
* @param {*} x - The first value
* @param {*} y - The second value
* @return {boolean} - Returns true if equal, false otherwise
*/

ExponentBigInt.isEqual = function (x, y) {
    x = class_functions.new(x)
    y = class_functions.new(y)
    return class_functions.isEqual(x, y)
}
ExponentBigInt.equal = ExponentBigInt.isEqual
ExponentBigInt.eq = ExponentBigInt.isEqual

module.exports = ExponentBigInt