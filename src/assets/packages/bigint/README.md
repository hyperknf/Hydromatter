# exponent-big-integer

exponent-big-integer is a npm package that allows users to bypass the 2^1024 (or Number.MAX_VALUE) limit in native JavaScript code, while keeping high precision and being safe to store in a JSON file

## How to install

Type this in your console:
```
npm install exponent-big-integer
```
Then add this to your code:
```
const ExponentBigInt = require("exponent-big-integer")
```
Now you should be able to access the module through the "ExponentBigInt" constant

## Creating a exponent-big-integer value

You are able to create a value through 3 ways, calling the object, calling "new" keyword on the object, or calling the "new" static function in the object:
```
const ExponentBigInt = require("exponent-big-integer")

const bigint_one = ExponentBigInt(1234) // returns a value representing 1234
const bigint_two = new ExponentBigInt(5678) // returns a value representing 5678
const bigint_three = ExponentBigInt.new(2468) // returns a value representing 2468
```
You can also pass in strings, other exponent-big-integer values, as well as other value types:
```
const ExponentBigInt = require("exponent-big-integer")

const bigint_one = new ExponentBigInt(1234) // returns a value representing 1234
const bigint_two = ExponentBigInt.new(4567) // returns a value representing 4567

const bigint_three = ExponentBigInt.new(bigint_one) // returns a value representing 1234
console.log(bigint_three == bigint_one) // true
const bigint_four = ExponentBigInt.new(true) // returns a value representing 1
```
But exponent-big-integer values are NOT equal to native number values, and passing it in typeof keyword will return "object"
```
const ExponentBigInt = require("exponent-big-integer")

const bigint_test = new ExponentBigInt(1234) // returns a value representing 1234
console.log(bigint_test == 1234) // false
console.log(typeof bigint_test) // object
```

## Properties

```ExponentBigInt.basic.statics```

Contains the basic static variables used in the package, do not call if unnessessary

---

```ExponentBigInt.basic.functions```

Contains the basic functions used in the package, do not call if unnessessary

---

```ExponentBigInt.zero```

Returns a value representing 0

---

```ExponentBigInt.one```

Returns a value representing 1

---

```ExponentBigInt.new(value)```

value - The value you wanted to pass in

Returns an exponent-big-integer value representing that value

---

```ExponentBigInt.toNumber(value)```

value - The value you wanted to pass in

Changes an exponent-big-integer value into a JavaScript number value, returns Infinity if bigger than Number.MAX_VALUE

---

```ExponentBigInt.toNumberString(value)```

value - The value you wanted to pass in

Similar to the toNumber method, but converts to a string instead of a JavaScript number, is not limited by Number.MAX_VALUE, but limited to 9.999x10^Number.MAX_SAFE_INTEGER

---

```ExponentBigInt.toBigInt(value)```

value - The value you wanted to pass in

Converts an exponent-big-integer value into JavaScript native BigInt value, returns an error if native BigInt is not supported or the exponent is larger than 32768

---

```ExponentBigInt.getSuffix(index)```

index - The index you wanted to pass in

Get the suffix for "suffix" option in toNumberString method by index

---

```ExponentBigInt.add(x, y)```

x - The first value

y - The second value

Adds a number to another, supports exponent-big-integer values

---

```ExponentBigInt.minus(x, y)```

x - The first value

y - The second value

Substracts a number from another, supports exponent-big-integer values

---

```ExponentBigInt.multiply(x, y)```

x - The first value

y - The second value

Multiplies two numbers, supports exponent-big-integer values

---

```ExponentBigInt.divide(x, y)```

x - The first value

y - The second value

Divides one number by another, supports exponent-big-integer values

---

```ExponentBigInt.power(x, y)```

x - The first value

y - The second value

Evaluates the first number to the power of the second number, supports exponent-big-integer values, returns 9.99999999x10^Number.MAX_SAFE_INTEGER if exceeds that

---

```ExponentBigInt.logarithm(base, value)```

base - The base

value - The value

Evaluates the logaithm of the second number with the first number as base, supports exponent-big-integer values, the base only supports up to Number.MAX_SAFE_INTEGER

---

```ExponentBigInt.modulo(x, y)```

x - The first value

y - The second value

Evaluates the modulo of two numbers, supports exponent-big-integer values

---

```ExponentBigInt.absolute(value)```

value - The exponent-big-integer value you wanted to pass in

Returns the absolute value of a number

---

```ExponentBigInt.compare(x, y)```

x - The first value

y - The second value

Compares one number with another, supports exponent-big-integer values. Returns 1 if first number is bigger, 2 if second number is bigger, 0 if equal

---

```ExponentBigInt.isInteger(value)```

value - The value to be checked

Checks if a number is an integer, supports exponent-big-integer values

---

```ExponentBigInt.isPositive(value)```

value - The value to be checked

Checks if a number is a positive, supports exponent-big-integer values

---

```ExponentBigInt.isLarger(x, y)```

x - The first value

y - The second value

Checks if one number is larger than another, supports exponent-big-integer values

---

```ExponentBigInt.isSmaller(x, y)```

x - The first value

y - The second value

Checks if one number is smaller than another, supports exponent-big-integer values

---

```ExponentBigInt.isEqual(x, y)```

x - The first value

y - The second value

Checks if one number is equal to another, supports exponent-big-integer values

## Updates

### 1.1.3a

` - ` Started using **decimal.js** package as a way to store the base, it is recommended to install all dependencies before using this package

` - ` Added `ExponentBigInt.basic` and `ExponentBigInt.logarithm`

` - ` Bug fixes