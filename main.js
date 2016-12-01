require("./style.less");

(function () {
  var calculator = new (require("./calculator.js"))();
  var buffer = document.getElementById("ui-buffer");
  var input = document.getElementById("ui-input");
  var stack = document.getElementById("ui-stack");

  input.focus();

  function println(line, className) {
    var li = document.createElement("li");

    li.textContent = line;
    if (className) {
      li.setAttribute("class", className);
    }
    buffer.insertBefore(li, buffer.firstChild);
  }

  function updateStack() {
    stack.innerHTML = "";
    for (var i = 0; i < calculator.stack.length; ++i) {
      var li = document.createElement("li");

      li.textContent = String(calculator.stack[i]);
      stack.insertBefore(li, stack.firstChild);
    }
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
