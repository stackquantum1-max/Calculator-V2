//  Element Selectors

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const topDisplayTextElement = document.querySelector("[data-top-display]");
const bottomDisplayTextElement = document.querySelector("[data-bottom-display]");

//  Calculator Class
class Calculator {
  constructor(topDisplayTextElement, bottomDisplayTextElement) {
    this.topDisplayTextElement = topDisplayTextElement;
    this.bottomDisplayTextElement = bottomDisplayTextElement;
    this.clear();
  }
}

//  Instantiate Calculator
const calculator = new Calculator(topDisplayTextElement, bottomDisplayTextElement);

//  Event Listeners
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