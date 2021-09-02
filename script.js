const screen = document.getElementById('screen');
const operandBtns = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const divideBtn = document.getElementById('divide');
const timesBtn = document.getElementById('times');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const clearBtn = document.getElementById('ac');
const equalBtn = document.getElementById('equals');
const decimalBtn = document.getElementById('decimal');
const deleteBtn = document.getElementById('delete');
let errorMsg = document.getElementById('error');

screen.textContent = 0;

let input1 = 0;
let input2 = 0;
let operator, solution;
let count = 0;
let opOnOff = false;
let decimal = false;
let newEq = true;


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
    if (input1.toString().includes(".") || input2.toString().includes(".")) {
        function findIndex() {
            let index1 = input1.indexOf(".");
            let index2 = input2.indexOf(".");
            if (input1.length - index1 > input2.length - index2) {
                return (input1.length - index1) - 2;
            }
            else {
                return (input2.length - index2) - 2;
            }
        }

        if (operator == "plus") {
            solution = add(parseFloat(input1), parseFloat(input2)).toFixed(findIndex());
        }
        else if (operator == "minus") {
            solution = subtract(parseFloat(input1), parseFloat(input2)).toFixed(findIndex());
        }
        else if (operator == "times") {
            solution = multiply(parseFloat(input1), parseFloat(input2)).toFixed(findIndex());
        }
        else if (operator == "divide") {
            solution = divide(parseFloat(input1), parseFloat(input2)).toFixed(findIndex());
        }
    }
    else {
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
    }

    if (solution > 99999999) {
        solution = parseFloat(solution).toExponential(2);
    }
    if (solution.toString().length >= 9) {
        solution = solution.toFixed(6);
    }

    screen.textContent = solution;
    count++;
}



function numberAction(val) {
    if (screen.textContent.length < 9) {
        if (screen.textContent == 0 || opOnOff || newEq) {
            turnOpOff();
            newEq = false;
            screen.textContent = "";
            screen.textContent += val;
        }
        else {
            screen.textContent += val;
        }
        errorMsg.textContent = "";
    }
    else {
        if (opOnOff || newEq) {
            turnOpOff();
            screen.textContent = "";
            errorMsg.textContent = "";
            screen.textContent += val;
            newEq = false;

        }
        if (screen.textContent.length >= 9) {
            let delFirst = screen.textContent.substring(1);
            screen.textContent = delFirst;
            screen.textContent += val;
            errorMsg.textContent = "Too many digits";
        }
    }
}


function numbersClicked() {
    numberAction(this.value);
}

function numbersPressed(e) {
    for (let i = 0; i <= 9; i++) {
        if (e.key == i) {
            numberAction(i);
        }
    }
    if (e.key == "+") {
        operatorClicked(minusBtn, timesBtn, divideBtn, plusBtn);
    }
    if (e.key == "-") {
        operatorClicked(plusBtn, timesBtn, divideBtn, minusBtn);
    }
    if (e.key == "*"){
        operatorClicked(minusBtn, plusBtn, divideBtn, timesBtn);
    }
    if (e.key == "/") {
        operatorClicked(minusBtn, timesBtn, plusBtn, divideBtn);
    }
    if (e.key == "Enter"){
        equalClicked();
    }
    if (e.key == "."){
        addDecimal();
    }
    if (e.key == "Backspace"){
        deleteNum();
    }
}


function addDecimal() {
    if (!screen.textContent.includes(".")) {
        screen.textContent += ".";
    }
}


function resetScreen() {
    screen.textContent = 0;
    solution = 0;
    operator = "";
    errorMsg.textContent = "";
    turnOpOff();
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
        getSolution();
        input1 = solution;
    }
    operator = add1.id;
}


function getSolution() {
    input2 = screen.textContent;
    operate(operator);
}


function turnOpOff() {
    opOnOff = false;
}


function equalClicked() {
    if (!newEq || operator != undefined) {
        getSolution();
        turnOpOff();
        count = 0;
        newEq = true;
    }

}


function deleteNum() {
    let del = screen.textContent.slice(0, -1);
    screen.textContent = del;
}



plusBtn.addEventListener('click', () => operatorClicked(minusBtn, timesBtn, divideBtn, plusBtn));

minusBtn.addEventListener('click', () => operatorClicked(plusBtn, timesBtn, divideBtn, minusBtn));

timesBtn.addEventListener('click', () => operatorClicked(minusBtn, plusBtn, divideBtn, timesBtn));

divideBtn.addEventListener('click', () => operatorClicked(minusBtn, timesBtn, plusBtn, divideBtn));

document.addEventListener('keydown', numbersPressed);

operandBtns.forEach(operand => {
    operand.addEventListener('click', numbersClicked);
});

clearBtn.addEventListener('click', resetScreen);

equalBtn.addEventListener('click', equalClicked);

decimalBtn.addEventListener('click', addDecimal);

deleteBtn.addEventListener('click', deleteNum);



