function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round(((a / b) + Number.EPSILON) * 100) / 100;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case 1: return add(num1, num2);
        case 2: return subtract(num1, num2);
        case 3: return multiply(num1, num2);
        case 4: return divide(num1, num2);
    }
}

function updateDisplay(numberString) {
    if (lastClickOperation === true) {
        operand = display;
        display = +numberString;
    }
    else {
        if (display === 0) display = +numberString;
        else display = +(display.toString() + numberString);
    }

    document.getElementById('display').textContent = display.toString();
    lastClickOperation =false;
}

function updateOperation(symbol) {
    equal();

    switch (symbol) {
        case "+": currentOperation = 1;
        break;
        case "-": currentOperation = 2;
        break;
        case "*": currentOperation = 3;
        break;
        case "/": currentOperation = 4;
        break;
    }
    lastClickOperation = true;
}

function equal() {
    if (operand !== 0 && display !== 0 && currentOperation !== 0) {
        display = operate(currentOperation, operand, display);
        document.getElementById('display').textContent = display.toString();
        display = 0;
        operand = 0;
    }
}

function clear() {
    operand = 0;
    display = 0;
    currentOperation = 0;
    lastClickOperation = false;

    document.getElementById('display').textContent = display.toString();
}

let display = 0;
let operand = 0;
let currentOperation = 0;
let lastClickOperation = false;

const numberButtons = document.querySelectorAll('button.number');
numberButtons.forEach(button => button.addEventListener('click', 
    () => updateDisplay(button.textContent)));

const operationButtons = document.querySelectorAll('button.operation');
operationButtons.forEach(operation => operation.addEventListener('click', 
    () => updateOperation(operation.textContent)));

document.getElementById('equal').addEventListener('click', equal);
document.getElementById('clear').addEventListener('click', clear);