// ===============================
//  Element Selectors
// ===============================
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const topDisplayTextElement = document.querySelector("[data-top-display]");
const bottomDisplayTextElement = document.querySelector("[data-bottom-display]");


// ===============================
//  Calculator Class
// ===============================
class Calculator {
  constructor(topDisplayTextElement, bottomDisplayTextElement) {
    this.topDisplayTextElement = topDisplayTextElement;
    this.bottomDisplayTextElement = bottomDisplayTextElement;
    this.clear();
  }

  // Reset all values
  clear() {
    this.topDisplay = "";
    this.bottomDisplay = "";
    this.operation = undefined;
  }

  // Delete last entered number
  delete() {
    this.bottomDisplay = this.bottomDisplay.toString().slice(0, -1);
  }

  // Append number to current display
  appendNumber(number) {
    if (number === "." && this.bottomDisplay.includes(".")) return;
    this.bottomDisplay = this.bottomDisplay.toString() + number.toString();
  }

  // Choose operation (+, -, *, ÷)
  chooseOperation(operation) {
    if (this.bottomDisplay === "" && this.topDisplay === "") return;

    if (this.bottomDisplay === "" && this.topDisplay !== "") {
      this.operation = operation;
      return;
    }

    if (this.topDisplay !== "") {
      this.compute();
    }

    this.operation = operation;
    this.topDisplay = this.bottomDisplay;
    this.bottomDisplay = "";
  }

  // Perform calculation
  compute() {
    const prev = parseFloat(this.topDisplay);
    const current = parseFloat(this.bottomDisplay);
    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = current === 0 ? "Error" : prev / current;
        break;
      default:
        return;
    }

    this.bottomDisplay = computation;
    this.operation = undefined;
    this.topDisplay = "";
  }

  // Format number for display
  getDisplayNumber(number) {
    if (number === "Error") return "Error";
    if (number === "" || number == null) return "";

    const stringNumber = number.toString();
    const [integerPart, decimalPart] = stringNumber.split(".");
    const integerDigits = parseFloat(integerPart);

    let integerDisplay = isNaN(integerDigits)
      ? ""
      : integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });

    return decimalPart != null
      ? `${integerDisplay}.${decimalPart}`
      : integerDisplay;
  }

  // Update Display UI
  updateDisplay() {
    this.bottomDisplayTextElement.innerText =
      this.getDisplayNumber(this.bottomDisplay);

    this.topDisplayTextElement.innerText =
      this.operation != null
        ? `${this.getDisplayNumber(this.topDisplay)} ${this.operation}`
        : "";
  }
}


// ===============================
//  Instantiate Calculator
// ===============================
const calculator = new Calculator(
  topDisplayTextElement,
  bottomDisplayTextElement
);


// ===============================
//  Event Listeners
// ===============================
numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

operationButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
);

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
