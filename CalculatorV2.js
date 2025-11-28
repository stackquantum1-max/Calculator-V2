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