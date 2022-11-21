/**
 * A simple calculator. Only has 4 basic operators and uses PEMDAS to calculate after inputting the whole expression
 * TODO: add parentheses
 * @author Jack Raney
 */

var inputStack = [];
var inputText = "";
var outputText;

var nextIsNegative = false;

var isDecimal = false;
var decimalNumbers;

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
    document.getElementById("invert").addEventListener("click", invertNumber);
    document.getElementById("decimal").addEventListener("click", convertToDecimal);

    document.getElementById("delete").addEventListener("click", deleteLastInput);
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("equals").addEventListener("click", calculate);
}

function addToInputDisplay(value)
{
    if (!isNaN(value))
    {
        if (value < 0)
        {
            value = "(" + value + ")"
        }

        if (!inputText.length || !isNaN(inputText[inputText.length - 1]))
        {
            inputText = inputText.concat(value);
        }
        else
        {
            inputText = inputText.concat(" ", value)
        }
    }
    else
    {
        inputText = inputText.concat(" ", value)
    }

    document.getElementById("input").innerHTML = inputText;
}

function inputNumber(digit)
{
    if (isDecimal)
    {
        if (decimalNumbers == null)
        {
            decimalNumbers = digit;

            document.getElementById("decimal").disabled = true;
        }

        else
        {
            decimalNumbers.concat(digit)
        }
    }
    else
    {
        if (inputStack.length && !isNaN(inputStack[inputStack.length - 1]))
        {
            inputStack[inputStack.length - 1] = inputStack[inputStack.length - 1] * 10 + (inputStack[inputStack.length - 1] < 0 ? digit * -1 : digit * 1);
        }
        else
        {
            if (nextIsNegative)
            {
                digit = -digit;
                nextIsNegative = false;
            }
    
            inputStack.push(digit);
        }
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
        if (isDecimal)
        {
            isDecimal = false;
            decimalNumbers = "." + decimalNumbers;
            inputStack[inputStack.length -1] += decimalNumbers;
        }
        inputStack.push(operator);
    }

    addToInputDisplay(operator);
}

function deleteLastInput()
{
    if (!isNaN(inputStack[inputStack.length - 1]) && Math.abs(inputStack[inputStack.length - 1]) < 10)
    {
        let deletedNumber = inputStack.pop();

        if (deletedNumber < 0)
        {
            inputText = inputText.slice(0, inputText.lastIndexOf("(")).trim();
        }
        else
        {
            inputText = inputText.slice(0, -1).trim();
        }
    }
    else
    {
        if (isNaN(inputStack[inputStack.length - 1]))
        {
            inputStack.pop();
        }
        else
        {
            if (inputStack[inputStack.length - 1] % 1 !== 0)
            {
                
            }
            inputStack[inputStack.length - 1] /= 10;
        }
        
        inputText = inputText.slice(0, -1).trim();
    }
    document.getElementById("input").innerHTML = inputText;
}

function clear()
{
    inputStack = [];
    inputText = "";
    outputText = "";
    document.getElementById("input").innerHTML = inputText;
    document.getElementById("output").innerHTML = outputText;
}

function invertNumber()
{
    if (!inputStack.length || isNaN(inputStack[inputStack.length - 1]))
    {
        nextIsNegative = !nextIsNegative;
    }
    else
    {
        inputStack[inputStack.length - 1] = -inputStack[inputStack.length - 1];
        invertDisplayedNumber();
    }
}

function convertToDecimal()
{
    if (isDecimal)
    {
        isDecimal = false;

        inputText = inputText.slice(0, inputText.length - 1);
    }

    isDecimal = true;

    addToInputDisplay("0.");
}

// this is gonna need a huge rework when I incorporate actual parentheses
function invertDisplayedNumber()
{
    if (inputText[inputText.length - 1] === ")")
    {
        let numberStartingIndex = inputText.lastIndexOf("(");
        let numberToInvert = inputText.substring(inputText.lastIndexOf("("));
        let invertedNumber = numberToInvert.substring(2, numberToInvert.length - 1);
        inputText = inputText.substring(0, numberStartingIndex) + invertedNumber;
    }
    else
    {
        let lastNumber = inputText.match(/\d+\.?\d*$/);
        let numberStartingIndex = inputText.lastIndexOf(lastNumber[0]);
        let invertedNumber = "(" + inputStack[inputStack.length - 1] + ")";
        inputText = inputText.substring(0, numberStartingIndex) + invertedNumber;
    }

    document.getElementById("input").innerHTML = inputText;
}

function calculate()
{

}