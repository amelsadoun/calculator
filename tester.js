const prompt = require("prompt-sync")();

const operationString = prompt("enter operation : ");

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
   var  i = 0;
  while (booleen && i < string.length) {
    if (isNaN(string[i]) && !isOperator(string[i])) {
      booleen = false;
    }
    i++;
  }
    var j=0;
    while (booleen && j < tab.length-1) {
    if ((!isNaN(tab[j]) && !isOperator(tab[j+1])) || (isOperator(tab[j]) && isNaN(tab[j+1]))) {
      booleen = false;
    }
    j++;
  }
  return booleen;
}

  convertedString = convertIntoNumbers(operationString);
console.log('os : ',operationString);
if (isValid(operationString, convertedString)) {
  console.log(doTheMath(convertedString)[0]);
} else {
  console.log("wrong");
}
