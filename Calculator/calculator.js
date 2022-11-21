/**
 * A simple calculator. Only has 4 basic operators and uses PEMDAS to calculate after inputting the whole expression
 * TODO: add parentheses
 * @author Jack Raney
 */

var inputStack = [];
var inputText = "";
var outputText;

var nextIsNegative = false;

window.onload = function()
{
    var digitList = document.querySelectorAll(".digit");
    digitList.forEach(function(digitButton)
    {
        digitButton.addEventListener("click", function(e)
        {
            inputNumber(e.target.value);
        });
    });

    var operatorList = document.querySelectorAll(".operator");
    operatorList.forEach(function(operatorButton)
    {
        operatorButton.addEventListener("click", function(e)
        {
            inputOperator(e.target.value);
        });
    });

    document.getElementById("delete").addEventListener("click", deleteLastInput);
    document.getElementById("clear").addEventListener("click", clear);
}

function addToInputDisplay(value)
{
    if (!inputText.length || !isNaN(inputText[inputText.length - 1]) && !isNaN(value))
    {
        inputText = inputText.concat(value);
    }
    else
    {
        inputText = inputText.concat(" ", value)
    }

    document.getElementById("input").innerHTML = inputText;
}

function inputNumber(digit)
{
    if (inputStack.length && !isNaN(inputStack[inputStack.length - 1]))
    {
        inputStack[inputStack.length - 1] = inputStack[inputStack.length - 1] * 10 + (inputStack[inputStack.length - 1] < 0 ? digit * -1 : digit * 1);
    }
    else
    {
        inputStack.push(nextIsNegative ? -digit : digit);
    }

    addToInputDisplay(digit);
}

function inputOperator(operator)
{
    if (inputStack.length && typeof inputStack[inputStack.length - 1] === "string")
    {
        inputStack[inputStack.length - 1] = operator;
    }
    else
    {
        inputStack.push(operator);
    }

    addToInputDisplay(operator);
}

function deleteLastInput()
{
    if (isNaN(inputStack[inputStack.length - 1]))
    {
        inputStack.pop();
    }
    else
    {
        inputStack[inputStack.length - 1] /= 10;
    }

    inputText = inputText.slice(0, -1);
    document.getElementById("input").innerHTML = inputText;
}

function clear()
{
    inputStack = [];
    inputText = "";
    document.getElementById("input").innerHTML = inputText;
}