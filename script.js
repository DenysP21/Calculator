let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
  display.innerText = currentInput;
}

function inputNumber(num) {
  if (currentInput === '0' || currentInput === 'Error') {
    currentInput = String(num);
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function inputOperator(op) {
  if (operator && previousInput !== null) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function inputDot() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  updateDisplay();
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

function calculate() {
  let result;
  const previous = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (operator === 'sqrt' || operator === 'sin' || operator === 'cos' || operator === 'tan' || operator === 'cot') {
    switch (operator) {
      case 'sqrt':
        result = current < 0 ? 'Error' : Math.sqrt(current);
        break;
      case 'sin':
        result = Math.sin((current * Math.PI) / 180).toFixed(10);
        break;
      case 'cos':
        result = Math.cos((current * Math.PI) / 180).toFixed(10);
        break;
      case 'tan':
        result = Math.tan((current * Math.PI) / 180).toFixed(10);
        break;
      case 'cot':
        result = Math.tan((current * Math.PI) / 180) === 0 ? 'Error' : (1 / Math.tan((current * Math.PI) / 180)).toFixed(10);
        break;
      default:
        return;
    }
  } else {
    if (isNaN(previous) || isNaN(current)) {
      currentInput = 'Error';
      updateDisplay();
      return;
    }

    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = current === 0 ? 'Error' : previous / current;
        break;
      default:
        return;
    }
  }

  currentInput = result === undefined ? 'Error' : String(result);
  operator = null;
  previousInput = null;
  updateDisplay();
}

function handleKeyPress(event) {
  const key = event.key;

  if (!isNaN(key)) {
    inputNumber(key);
  } else if (key === '.') {
    inputDot();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    inputOperator(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearDisplay();
  } else if (key.toLowerCase() === 'r') {
    operator = 'sqrt';
    calculate();
  } else if (key.toLowerCase() === 's') {
    operator = 'sin';
    calculate();
  } else if (key.toLowerCase() === 'c') {
    operator = 'cos';
    calculate();
  } else if (key.toLowerCase() === 't') {
    operator = 'tan';
    calculate();
  } else if (key.toLowerCase() === 'g') {
    operator = 'cot';
    calculate();
  }
}

document.addEventListener('keydown', handleKeyPress);
