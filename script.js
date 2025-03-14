let runTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperator(parseFloat(buffer));
      previousOperator = null;
      buffer = formatResult(runTotal);
      runTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
  screen.innerText = buffer;
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const floatBuffer = parseFloat(buffer);
  if (runTotal === 0) {
    runTotal = floatBuffer;
  } else {
    flushOperator(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperator(floatBuffer) {
  if (previousOperator === "+") {
    runTotal += floatBuffer;
  } else if (previousOperator === "−") {
    runTotal -= floatBuffer;
  } else if (previousOperator === "×") {
    runTotal *= floatBuffer;
  } else if (previousOperator === "÷") {
    if (floatBuffer === 0) {
      runTotal = "Error";
    } else {
      runTotal /= floatBuffer;
    }
  }
  if (typeof runTotal !== "string") {
    runTotal = parseFloat(runTotal.toFixed(12));
  }
}

function handleNumber(numberString) {
  if (numberString === "." && buffer.includes(".")) {
    return;
  }

  let newBuffer = buffer === "0" && numberString !== "." ? numberString : buffer + numberString;
  if (newBuffer.includes(".")) {
    const decimalPart = newBuffer.split(".")[1];
    if (decimalPart && decimalPart.length > 12) {
      return;
    }
  }
  buffer = newBuffer;
}

function formatResult(value) {
  if (typeof value === "string") return value;
  return parseFloat(value.toFixed(12)).toString();
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}
init();
