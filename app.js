const calculatorContainer = document.querySelector(".calculatorContainor");
const displayScreen = document.querySelector(".displayScreen");
const recentOperation = document.querySelector(".recentOperation");
const currentOperation = document.querySelector(".currentOperation");
const backButton = document.querySelector(".btn.back");
const divideButton = document.querySelector(".btn.divide");
const multiplyButton = document.querySelector(".btn.multiply");
const addButton = document.querySelector(".btn.add");
const minusButton = document.querySelector(".btn.minus");
const zeroButton = document.querySelector(".btn.zero");
const oneButton = document.querySelector(".btn.number.one");
const twoButton = document.querySelector(".btn.number.two");
const threeButton = document.querySelector(".btn.number.three");
const fourButton = document.querySelector(".btn.number.four");
const fiveButton = document.querySelector(".btn.number.five");
const sixButton = document.querySelector(".btn.number.six");
const sevenButton = document.querySelector(".btn.number.seven");
const eightButton = document.querySelector(".btn.number.eight");
const nineButton = document.querySelector(".btn.number.nine");
const pointButton = document.querySelector(".btn.point");
const enterButton = document.querySelector(".btn.enter");
var operationString = "";

const priority = {
  //biggest prio comes first
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

var temporary;
var convertedString;
/* i hope this makes sense:
-go through the string
-make a new array with the operands converted into numbers
-go through the new array and just do the operations respecting the priorities
*/

function operate(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
  }
}

function convertIntoNumbers(string) {
  //not very smartly done but hey it does the job :)
  var convertedString = [],
    index = 0;
  while (string.length != 0) {
    i = 0;
    while (!isNaN(parseInt(string[i])) || string[i] == ".") {
      i++;
    }
    convertedString[index] = parseFloat(string.slice(0, i));
    index++;
    convertedString[index] = string[i];
    string = string.slice(i + 1);
    index++; //yes I incremented it twice sue me
  }
  convertedString.pop(); //there's an undefined last item i removed it w this
  return convertedString;
}

function isOperator(char) {
  return (
    char == "+" || char == "-" || char == "/" || char == "*" || char == "."
  );
}

//okay, now the priorities thing is i basically made an object with the priorities as values as you can see up in the code, each time we gotta go through the array,
//(i think this makes the complexity absolute shit but meh), pick the one with the highest prio and operate

function doTheMath(tab) {
  var index;
  while (tab.length != 1) {
    firstPrio = -1;
    for (var i = 0; i < tab.length; i++) {
      if (isNaN(tab[i]) && priority[tab[i]] > firstPrio) {
        firstPrio = priority[tab[i]];
        index = i;
      }
    }
    tab.splice(
      index - 1,
      3,
      operate(tab[index - 1], tab[index], tab[index + 1])
    );
  }
  return tab;
}

function isValid(string, tab) {
  //gotta check if they gave us a valid string and not some random shit lmfao
  var booleen = true;
  var i = 0;
  while (booleen && i < string.length) {
    if (isNaN(string[i]) && !isOperator(string[i])) {
      booleen = false;
    }
    i++;
  }
  var j = 0;
  while (booleen && j < tab.length - 1) {
    if (
      (!isNaN(tab[j]) && !isOperator(tab[j + 1])) ||
      (isOperator(tab[j]) && isNaN(tab[j + 1]))
    ) {
      booleen = false;
    }
    j++;
  }
  return booleen;
}

function performOperation() {
  convertedString = convertIntoNumbers(operationString);
  if (isValid(operationString, convertedString)) {
    currentOperation.textContent = doTheMath(convertedString)[0];
  } else {
    currentOperation.textContent = "wrong";
  }
  operationString = "";
  document.activeElement.blur();

}

zeroButton.addEventListener("click", function () {
  operationString = operationString + "0";
  currentOperation.textContent = operationString;
});

oneButton.addEventListener("click", function () {
  operationString = operationString + "1";
  currentOperation.textContent = operationString;
});

twoButton.addEventListener("click", function () {
  operationString = operationString + "2";
  currentOperation.textContent = operationString;
});

threeButton.addEventListener("click", function () {
  operationString = operationString + "3";
  currentOperation.textContent = operationString;
});

fourButton.addEventListener("click", function () {
  operationString = operationString + "4";
  currentOperation.textContent = operationString;
});

fiveButton.addEventListener("click", function () {
  operationString = operationString + "5";
  currentOperation.textContent = operationString;
});

sixButton.addEventListener("click", function () {
  operationString = operationString + "6";
  currentOperation.textContent = operationString;
});

sevenButton.addEventListener("click", function () {
  operationString = operationString + "7";
  currentOperation.textContent = operationString;
});

eightButton.addEventListener("click", function () {
  operationString = operationString + "8";
  currentOperation.textContent = operationString;
});

nineButton.addEventListener("click", function () {
  operationString = operationString + "9";
  currentOperation.textContent = operationString;
});

addButton.addEventListener("click", function () {
  operationString = operationString + "+";
  currentOperation.textContent = operationString;
});

minusButton.addEventListener("click", function () {
  operationString = operationString + "-";
  currentOperation.textContent = operationString;
});

multiplyButton.addEventListener("click", function () {
  operationString = operationString + "*";
  currentOperation.textContent = operationString;
});

divideButton.addEventListener("click", function () {
  operationString = operationString + "/";
  currentOperation.textContent = operationString;
});

pointButton.addEventListener("click", function () {
  operationString = operationString + ".";
  currentOperation.textContent = operationString;
});

backButton.addEventListener("click", function () {
  operationString = operationString.slice(0, operationString.length - 1);
  currentOperation.textContent = operationString;
});

enterButton.addEventListener("click", function () {
  performOperation();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key) || isOperator(key)) {
    operationString = operationString + key;
    currentOperation.textContent = operationString;
  }
  if (key === "Enter") {
    performOperation();
  }
});
