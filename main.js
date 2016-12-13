require("./style.less");

(function () {
  var p = require("pakertaja");
  var calculator = new (require("./calculator.js"))();
  var buffer = p.ul({id: "ui-buffer"});
  var input = p.input({id: "ui-input"});
  var stack = p.ul({id: "ui-stack"});

  document.body.appendChild(p.div({id: "container-left"}, input, buffer));
  document.body.appendChild(p.div({id: "container-right"}, stack));

  input.focus();

  function println(line, className) {
    buffer.insertBefore(
      p.li({
        text: line,
        "class": (className || "")
      }),
      buffer.firstChild
    );
  }

  function updateStack() {
    stack.innerHTML = "";
    calculator.stack.forEach(function (value, index) {
      stack.insertBefore(
        p.li({
          text: value,
          onclick: function (ev) {
            var newValue = window.prompt("Input new stack value:", value);

            ev.preventDefault();
            if (newValue) {
              var newNumericValue = parseFloat(newValue);

              if (!isNaN(newNumericValue)) {
                calculator.stack[index] = newNumericValue;
                updateStack();
                input.focus();
              }
            }
          }
        }),
        stack.firstChild
      );
    });
  }

  input.addEventListener("keydown", function (ev) {
    var line = input.value.trim();
    var exception;

    if (ev.keyCode !== 13 || !line.length) {
      return;
    }
    ev.preventDefault();
    println(line);
    try {
      calculator.eval(line);
      input.value = "";
    }
    catch (ex) {
      if (typeof ex === "string") {
        println(ex, "error");
      } else {
        exception = ex;
      }
    }
    updateStack();
    input.focus();
    if (exception) {
      throw exception;
    }
  });
})();
