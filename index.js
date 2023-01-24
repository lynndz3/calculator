import { add, subtract, multiply, divide } from './equations.js';

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
};


window.addEventListener("keydown", function(e) {
    let numberSelected = '';
    for (let i = 0; i < numbers.length; i++) {
        if (e.key == numbers[i].textContent) {
            numberSelected = e.key;
        }
    }
    if (numberSelected == '.' && (answer == activeNum || (typeof activeNum == 'number' && activeNum % 1 != 0) || 
    (typeof activeNum == 'string' && activeNum.includes('.')))) 
        return;
//if the previous answer is displaying on the screen, and user clicks a number again (with no math sign first), start new number
if (answer == activeNum && checkIfActive() == false) {
    screen.textContent = '';
    answer = undefined
    firstNumber = numberSelected;
    activeNum = firstNumber;
}
else if (answer == undefined && checkIfActive() == false) {
    answer = undefined;
    firstNumber += numberSelected;
    activeNum += numberSelected;
}
//if there was no previous answer, but there is an active calc, user creates second number
else if (answer == undefined && checkIfActive() != false) {
    secondNumber += numberSelected;
    activeNum += numberSelected;
}
//if there was a previous answer, and no calculation, start afresh with firstNumber 
//if number button is clicked and a calc was set before that, assume it's the second number
else if (answer != undefined && checkIfActive() != false) {
    firstNumber = answer;
    secondNumber += numberSelected;
    activeNum = numberSelected;
}
screen.textContent = activeNum;
});

numbers.forEach(elem => {
    elem.addEventListener('click', displayNum);
    });


function displayNum(e) {
        let numberSelected = e.target.textContent;
        //if this is the first number in the equation
        //add numbers into strings to create "firstNum"
        //if there was no previous answer and no active calc, user creates FirstNumber
        //if there is already a decimal, don't let user add another one to the same number
        if (numberSelected == '.' && (answer == activeNum || (typeof activeNum == 'number' && activeNum % 1 != 0) || 
            (typeof activeNum == 'string' && activeNum.includes('.')))) 
                return;
        //if the previous answer is displaying on the screen, and user clicks a number again (with no math sign first), start new number
        if (answer == activeNum && checkIfActive() == false) {
            screen.textContent = '';
            answer = undefined
            firstNumber = numberSelected;
            activeNum = firstNumber;
        }
        else if (answer == undefined && checkIfActive() == false) {
            answer = undefined;
            firstNumber += numberSelected;
            activeNum += numberSelected;
        }
        //if there was no previous answer, but there is an active calc, user creates second number
        else if (answer == undefined && checkIfActive() != false) {
            secondNumber += numberSelected;
            activeNum += numberSelected;
        }
        //if there was a previous answer, and no calculation, start afresh with firstNumber 
        //if number button is clicked and a calc was set before that, assume it's the second number
        else if (answer != undefined && checkIfActive() != false) {
            firstNumber = answer;
            secondNumber += numberSelected;
            activeNum = numberSelected;
        }
        screen.textContent = activeNum;
    };

function replaceText(textToRemove, textToReplace) {
    let originalText = screen.textContent;
    let newText = originalText.replace(textToRemove, textToReplace);
    screen.textContent = newText;
};

plusMinus.addEventListener("click", function(e) {
    if (secondNumber == activeNum) {
        secondNumber = Number(secondNumber);
        secondNumber = secondNumber - (secondNumber * 2);
        activeNum = secondNumber;
        screen.textContent = activeNum;
    }
    if (firstNumber == activeNum) {
        firstNumber = Number(firstNumber);
        firstNumber = firstNumber - (firstNumber * 2);
        activeNum = firstNumber;
        screen.textContent = activeNum;
    }
    if (answer == activeNum) {
        answer = Number(answer);
        answer = answer - (answer * 2);
        activeNum = answer;
        screen.textContent = activeNum;
    }
    else return;
});

percent.addEventListener("click", function(e) {
    if (secondNumber == activeNum) {
        secondNumber = Number(secondNumber/100);
        activeNum = secondNumber;  
        screen.textContent = activeNum;
    }
    if (firstNumber == activeNum) {
        firstNumber = Number(firstNumber/100);
        activeNum = firstNumber;  
        screen.textContent = activeNum;
    }
    if (answer == activeNum) {
        answer = Number(answer/100);
        activeNum = answer;  
        screen.textContent = activeNum;
    }
    else return;
});


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
        console.log(typeof firstNumber);
        console.log("first number is =" + firstNumber)
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


equals.addEventListener("click", function() {
    answer = 0;
    screen.textContent = '';
    console.log("second number is= " + secondNumber);
    secondNumber = Number(secondNumber);
    if(checkIfActive() == 'add') {
        answer = add(firstNumber, secondNumber);
    }
    if(checkIfActive() == 'subtract') {
        answer = subtract(firstNumber, secondNumber);
    }
    if(checkIfActive() == 'divide') {
        answer = divide(firstNumber, secondNumber);
    }
    if(checkIfActive() == 'multiply') {
        answer = multiply(firstNumber, secondNumber);
    }
    activeNum = answer;
    screen.textContent = activeNum;
    if (screen.textContent == "Infinity") {
        screen.textContent = "HAHAH :)";
    }
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