function add (num1, num2) {
	return num1 + num2;
}

function subtract (num1, num2) {
	return num1 - num2;
}

function multiply (num1, num2) {
	return num1 * num2;
}

const DIVIDEBY0MESSAGE = 'black hole!';

function divide (dividend, divisor) {
	if (divisor === 0) {
		return DIVIDEBY0MESSAGE;
	}
	return dividend / divisor;
}

function operate(num1, operator, num2) {
	// Convert numeric strings to numbers
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);

	if (operator === 'add') {
		return add(num1, num2);
	} else if (operator === 'subtract') {
		return subtract(num1, num2);
	} else if (operator === 'multiply') {
		return multiply(num1, num2);
	} else if (operator === 'divide') {
		return divide(num1, num2);
	}
}

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('button.number');
let displayValue = getDisplayValue();

function getDisplayValue() {
	return display.innerText;
}

function setDisplayValue(value) {
	displayValue = getDisplayValue();	//refresh value
	if (displayValue !== '0') {
		displayValue += value;
	} else {
		displayValue = value;
	}
	// add a leading zero if starts with decimal point
	if ((/^\./).test(displayValue)) {
		displayValue = '0' + displayValue;
	}
	display.innerText = displayValue;
}

function clearDisplayValue() {
	display.innerText = '0';
}

function clearStoredValues() {
	currentNum1 = '';
	currentOperator = '';
	currentNum2 = '';
}

function clearAll() {
	clearDisplayValue();
	clearStoredValues();
}

function logCurrentValues() {
	console.log('currentNum1 is ' + currentNum1);
	console.log('currentOperator is ' + currentOperator);
	console.log('currentNum2 is ' + currentNum2);
}

function checkForDecimalPoint(str) {
	decimalRegEx = /\./;
	return decimalRegEx.test(str);
}

clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearAll);

numberButtons.forEach(numberButton => {
	numberButton.addEventListener('click', function() {
		if (this.id === 'decimal-point') {
			console.log('Decimal point clicked');
			if (checkForDecimalPoint(display.innerText)) {
				return;	// disable decimal point button click if decimal point already exists
			}
		}

		if (currentNum1 === '' && currentOperator === '' && currentNum2 === '' && display.innerText !== '0') {
			console.log('An answer is already displaying');
			if (this.id !== 'decimal-point') {
				clearDisplayValue();
			}
			setDisplayValue(this.innerText);
			currentNum1 = getDisplayValue();
		} else if (currentOperator === '' && currentNum2 === '') {
			setDisplayValue(this.innerText);
			currentNum1 = getDisplayValue();
		} else if (currentOperator !== '' && currentNum2 === '') {
			clearDisplayValue();
			setDisplayValue(this.innerText);
			currentNum2 = getDisplayValue();
		} else {
			setDisplayValue(this.innerText);
		}

		logCurrentValues();
	});
});

const operatorButtons = document.querySelectorAll('.operator');
let currentOperator = '';

let currentNum1 = '';
let currentNum2 = '';

operatorButtons.forEach(operatorButton => {
	operatorButton.addEventListener('click', function() {
		if (display.innerText === DIVIDEBY0MESSAGE) {
			clearAll();
		} else if (currentNum1 !== '' && currentOperator !== '' && currentNum2 !== '') {
			currentNum1 = operate(currentNum1, currentOperator, currentNum2);
			display.innerText = currentNum1;
			currentNum2 = '';
			currentOperator = this.id;
		} else if (currentOperator === '') {
			currentNum1 = getDisplayValue();
			currentOperator = this.id;
		} else if (currentOperator !== '' && currentNum2 === '') {
			currentNum2 = getDisplayValue();
		}

		logCurrentValues();

	});
});

const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', function() {
	if (currentNum2 !== '') {
		currentNum2 = getDisplayValue();
		let answer = operate(currentNum1, currentOperator, currentNum2);
		if (typeof(answer) === 'number') {
			answer = Math.round(answer * 100000) / 100000;
		}
		display.innerText = answer;
		clearStoredValues();
	}

});

// You should round answers with long decimals so that they don’t overflow the screen.
