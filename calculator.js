function Calculator() {
  this.stack = [];
}

Calculator.prototype.operations = {
  // Arithmetic operations.
  "+": {
    arity: 2,
    callback: function (a, b) {
      return a + b;
    }
  },
  "-": {
    arity: 2,
    callback: function (a, b) {
      return a - b;
    }
  },
  "*": {
    arity: 2,
    callback: function (a, b) {
      return a * b;
    }
  },
  "/": {
    arity: 2,
    callback: function (a, b) {
      if (!b) {
        throw "division by zero";
      }

      return a / b;
    }
  },

  // Bitwise operations.
  "&": {
    arity: 2,
    callback: function (a, b) {
      return a & b;
    }
  },
  "|": {
    arity: 2,
    callback: function (a, b) {
      return a | b;
    }
  },
  "^": {
    arity: 2,
    callback: function (a, b) {
      return a ^ b;
    }
  },

  // Boolean operations.
  "=": {
    arity: 2,
    callback: function (a, b) {
      return a === b ? 1 : 0;
    }
  },
  "<>": {
    arity: 2,
    callback: function (a, b) {
      return a !== b ? 1 : 0;
    }
  },
  "<": {
    arity: 2,
    callback: function (a, b) {
      return a < b ? 1 : 0;
    }
  },
  ">": {
    arity: 2,
    callback: function (a, b) {
      return a > b ? 1 : 0;
    }
  },
  "<=": {
    arity: 2,
    callback: function (a, b) {
      return a <= b ? 1 : 0;
    }
  },
  ">=": {
    arity: 2,
    callback: function (a, b) {
      return a >= b ? 1 : 0;
    }
  },
  "!": {
    arity: 1,
    callback: function (a) {
      return !a ? 1 : 0;
    }
  },

  "sin": {
    arity: 1,
    callback: Math.sin
  },
  "tan": {
    arity: 1,
    callback: Math.tan
  },
  "cos": {
    arity: 1,
    callback: Math.cos
  },
  "pow": {
    arity: 1,
    callback: Math.pow
  },
  "log": {
    arity: 1,
    callback: Math.log
  },
  "exp": {
    arity: 1,
    callback: Math.exp
  },
  "round": {
    arity: 1,
    callback: Math.round
  },

  // Stack manipulation operations.
  "dup": {
    arity: 1,
    callback: function (a) {
      this.push(a);
      this.push(a);
    }
  },
  "drop": {
    arity: 1,
    callback: function () {}
  },
  "swap": {
    arity: 2,
    callback: function (a, b) {
      this.push(b, a);
    }
  },
  "over": {
    arity: 2,
    callback: function (a, b) {
      this.push(a, b, a);
    }
  },
  "rot": {
    arity: 3,
    callback: function (a, b, c) {
      this.push(b, c, a);
    }
  },
  "nip": {
    arity: 2,
    callback: function (a, b) {
      this.push(b);
    }
  },
  "tuck": {
    arity: 2,
    callback: function (a, b) {
      this.push(b, a, b);
    }
  },
  "clear": {
    arity: 0,
    callback: function () {
      this.length = 0;
    }
  },
  "depth": {
    arity: 0,
    callback: function () {
      this.push(this.length);
    }
  }
};

Calculator.prototype.eval = function (line) {
  var words = line.split(/\s+/);

  if (!words.length) {
    return;
  }
  for (var i = 0; i < words.length; ++i) {
    var word = words[i];
    var operation;
    var result;

    if (/^(\+|-)?[0-9]+(\.[0-9]+)?$/.test(word)) {
      var value = parseFloat(word);

      if (isNaN(value)) {
        throw "Unable to parse '" + word + "' into number";
      }
      this.stack.push(value);
      continue;
    }

    operation = this.operations[word];
    if (!operation) {
      throw "Unrecognized operation: '" + word + "'";
    }
    else if (this.stack.length < operation.arity) {
      throw "Stack underflow";
    }

    result = operation.callback.apply(
      this.stack,
      this.stack.splice(this.stack.length - operation.arity, operation.arity)
    );
    if (typeof result === "number") {
      this.stack.push(result);
    }
  }
};

module.exports = Calculator;
