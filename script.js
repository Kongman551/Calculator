const screen = document.getElementById('screen');
const operandBtns = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const divideBtn = document.getElementById('divide');
const timesBtn = document.getElementById('times');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const clearBtn = document.getElementById('ac');
const equalBtn = document.getElementById('equals');
//const calculatorBtns = document.querySelectorAll('buttons');
const decimalBtn = document.getElementById('decimal');
//const percentBtn = document.getElementById('percent');
//const signBtn = document.getElementById('sign');

screen.textContent = 0;

let input1 = 0;
let input2 = 0;
let operator, solution;
let count = 0;
let opOnOff = false;
let decimal = false;


function operate(operator) {

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
        return a / b;
    }

    if (operator == "plus") {
        solution = add(parseFloat(input1), parseFloat(input2));
    }
    else if (operator == "minus") {
        solution = subtract(parseFloat(input1), parseFloat(input2));
    }
    else if (operator == "times") {
        solution = multiply(parseFloat(input1), parseFloat(input2));
    }
    else if (operator == "divide") {
        solution = divide(parseFloat(input1), parseFloat(input2));
    }

    screen.textContent = solution;
    count++;

}


function numbersClicked() {
    if (screen.textContent.length < 9) {
        if (screen.textContent == 0 || opOnOff) {
            opOnOff = false;
            screen.textContent = "";
            screen.textContent += this.value;
        } else {
            screen.textContent += this.value;
        }
    }
}

document.addEventListener('keydown', (e) => {
    for (let i = 0; i <= 9; i++) {
        if (e.key == i) {
            if (screen.textContent.length < 9) {
                if (screen.textContent == 0 || opOnOff) {
                    opOnOff = false;
                    screen.textContent = "";
                    screen.textContent += i;
                } else {
                    screen.textContent += i;
                }
            }
        }
    }
});


function addDecimal() {
    if (decimal == false){
        screen.textContent += ".";
        decimal = true;
    }  
}



function resetScreen() {
    screen.textContent = 0;
    solution = 0;
    operator = "";
    opOnOff = false;
    decimal = false;
    input1 = 0;
    input2 = 0;
    count = 0;
    operatorBtns.forEach(btn => {
        btn.classList.remove("active");
    });
}



function operatorClicked(rem1, rem2, rem3, add1) {
    rem1.classList.remove('active');
    rem2.classList.remove('active');
    rem3.classList.remove('active');
    add1.classList.add("active");
    opOnOff = true;
    if (count == 0) {
        input1 = screen.textContent;
        count++;
    }
    else {
        equalClicked();
        input1 = solution;
    }
    operator = add1.id;

}

function equalClicked() {
    input2 = screen.textContent;
    operate(operator);
}


plusBtn.addEventListener('click', () => operatorClicked(minusBtn, timesBtn, divideBtn, plusBtn));
minusBtn.addEventListener('click', () => operatorClicked(plusBtn, timesBtn, divideBtn, minusBtn));
timesBtn.addEventListener('click', () => operatorClicked(minusBtn, plusBtn, divideBtn, timesBtn));
divideBtn.addEventListener('click', () => operatorClicked(minusBtn, timesBtn, plusBtn, divideBtn));

operandBtns.forEach(operand => {
    operand.addEventListener('click', numbersClicked);
});

clearBtn.addEventListener('click', resetScreen);

equalBtn.addEventListener('click', equalClicked);

decimalBtn.addEventListener('click', addDecimal);

