const calcs = document.querySelectorAll('.calc');
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const percent = document.querySelector('.percent');
const plusMinus = document.querySelector('.plus-minus');

let firstNumber = '';
let secondNumber = '';
let activeNum = '';
let answer;


function checkIfActive() {
    for (let elem of calcs) {
        if (elem.classList.contains("activeCalc")) {
            return elem.id;
        }
    }
    return false
}

numbers.forEach(elem => {
    elem.addEventListener('click', function() {
        //if this is the first number in the equation
        //add numbers into strings to create "firstNum"
        //if there was no previous answer and no active calc, user creates FirstNumber
        if (checkIfActive() == false) {
            screen.textContent = '';
            answer = undefined;
            console.log(elem.textContent);
            firstNumber += elem.textContent;
            activeNum += elem.textContent;
            screen.textContent = activeNum;
        }
        //if there was no previous answer, but there is an active calc, user creates second number
        else if (answer == undefined && checkIfActive() != false) {
            secondNumber += elem.textContent;
            activeNum += elem.textContent;
            screen.textContent = activeNum;
        }
        //if there was a previous answer, and no calculation, start afresh with firstNumber 
        //if number button is clicked and a calc was set before that, assume it's the second number
        else if (answer != undefined && checkIfActive() != false) {
            firstNumber = answer;
            secondNumber += elem.textContent;
            activeNum = elem.textContent;
            screen.textContent = activeNum;
        }
    })
});

function replaceText(textToRemove, textToReplace) {
    let originalText = screen.textContent;
    let newText = originalText.replace(textToRemove, textToReplace);
    screen.textContent = newText;
};

plusMinus.addEventListener("click", function(e) {
    if (activeNum != '') {
        secondNumber = Number(secondNumber);
        secondNumber = secondNumber - (secondNumber * 2);
        console.log(secondNumber);
        screen.textContent = secondNumber;
    }
    if (firstNumber != '') {
        firstNumber = Number(firstNumber);
        firstNumber = firstNumber - (firstNumber * 2);
        screen.textContent = firstNumber;
        console.log(firstNumber);
    }
});
/*
percent.addEventListener("click", function(e) {

})*/


function removeActive() {
    for (let elem of calcs) {
        if (elem.classList.contains("activeCalc")) {
            replaceText(elem.textContent, '');
            elem.classList.remove("activeCalc");
        }
    }
};

calcs.forEach(elem => {
    elem.addEventListener("click", function(e) {
        firstNumber = Number(firstNumber);
        screen.textContent = '';
        activeNum = '';
        if (firstNumber == '' && answer == undefined) {
            return;
        }
        else if (checkIfActive() == false) {
            elem.classList.add("activeCalc");
        }
        else {
            removeActive();
            elem.classList.add("activeCalc");
        }
    });
});



const add = function(a, b) {
    let sum = a + b
    return sum;
};

const subtract = function(a, b) {
    let total = a - b;
    return total;
};

const divide = function(a, b) {
    let total = a / b;
    return total;
};

const multiply = function(a, b) {
    let total = a * b;
    return total;
};

equals.addEventListener("click", function() {
    answer = 0;
    screen.textContent = '';
    if(checkIfActive() == 'add') {
        answer = add(parseInt(firstNumber), parseInt(secondNumber));
    }
    if(checkIfActive() == 'subtract') {
        answer = subtract(parseInt(firstNumber), parseInt(secondNumber));
    }
    if(checkIfActive() == 'divide') {
        answer = divide(parseInt(firstNumber), parseInt(secondNumber));
    }
    if(checkIfActive() == 'multiply') {
        answer = multiply(parseInt(firstNumber), parseInt(secondNumber));
    }
    activeNum = answer;
    screen.textContent = activeNum;
    firstNumber = '';
    secondNumber = '';
    removeActive();
});

function clearAll() {
    replaceText(screen.textContent, '');
    firstNumber = '';
    secondNumber = '';
    activeNum = '';
    removeActive();
    answer = undefined;
};

clear.addEventListener("click", clearAll);