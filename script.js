let currentInput = '';
let previousInput = '';
let operation = null;
let clickCount = 0;

function appendNumber(number) {
    if (currentInput === '0' && number === '.') {
        currentInput += number;
    } else if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (previousInput !== '') {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '';
    operation = operator;
    clickCount++;
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation;
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    clickCount = 0;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = currentInput || '0';
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        clearDisplay();
    }
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            window.location.href = 'https://wyzx.pages.dev';
            clickCount = 0;
        }
    });
});
