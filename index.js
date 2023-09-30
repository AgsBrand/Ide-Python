console.log("CODE WRITTE BY ABDUL GHAFFAR SOOMRO (AGS)")

let div = document.getElementById("ouput")

let text = document.getElementById("input")

let keywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
    'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
    'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray', 'bytes', 'callable', 'chr',
    'classmethod', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec',
    'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id',
    'input', 'int', 'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max', 'memoryview',
    'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'range', 'repr', 'reversed',
    'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type',
    'vars', 'zip', '__import__'
];


let gotSpace = false
let gotKeyWord = false
let gotFunction = false
let gotFuncKeyword = false

text.addEventListener("keyup", checkAll)

let html = ""

function checkAll() {
    html = ""
    let textVal = document.getElementById("input").innerText
    
    let arr = textVal.split("\n")
    for (let line of arr) {
        checkLine(line)
        html += "<br>"
    }


}
checkAll()
function checkLine(input) {
    codeArr = input.split(" ")
    console.log(codeArr)

    for (let i of codeArr) {
        console.log(i)
        gotSpace = false
        gotKeyWord = false
        gotFunction = false
        gotFuncKeyword = false
        if (i[0] == "#") {

            html += `<span class="comment">${codeArr.join(" ")}</span>`
            break
        }

        // Handling spaces 
        checkSpace(i)
        if (gotSpace) {
            continue
        }


        // checking if the word is function and keywrod also
        checkFuncAndKeyword(i)
        if (gotFuncKeyword) {
            continue
        }


        // Handling all the keywords of python
        checkKeyword(i)
        if (gotKeyWord) {
            continue
        }


        // Handling function names 
        checkFunction(i)
        if (gotFunction) {
            continue
        }

        // Simple text 
        html += `<span>${i} </span>`
    }
    div.innerHTML = html
}

function checkSpace(i) {
    if (i === " ") {

        html += `<span> </span>`
        gotSpace = true
    }
}
function checkFuncAndKeyword(i) {
    for (let k = 0; k < i.length; k++) {
        if (i[k] == "(") {
            let functionName = i.slice(0, k)
            let otherContent = i.slice(k)
            console.log(k, functionName, otherContent)
            for (let checkKeyword of keywords) {
                if (functionName == checkKeyword) {
                    if (otherContent[1] == '"') {
                        if (otherContent.length == 1 && otherContent[0] == "(") {
                            html += `<span class="funcAndKeyword">${functionName}</span><span>${otherContent[0]}</span>`
                        } else if (otherContent.length == 0) {
                            html += `<span class="funcAndKeyword">${functionName}</span>`
                        } else {
                            console.log(otherContent)
                            html += `<span class="funcAndKeyword">${functionName}</span><span>${otherContent[0]}</span><span class="otherContent">${otherContent.slice(1, otherContent.length - 1)}</span><span>${otherContent[otherContent.length - 1]}</span>`
                        }
                    } else {
                        html += `<span class="funcAndKeyword">${functionName}</span><span class="brackets">${otherContent}</span>`
                    }
                    gotFuncKeyword = true
                }
            }

        }
    }
}
function checkKeyword(i) {
    for (let j of keywords) {
        if (i == j) {
            html += `<span class="keyword">${i} </span>`
            gotKeyWord = true
        }
    }
}

function checkFunction(i) {
    for (let k = 0; k < i.length; k++) {
        if (i[k] == "(") {
            let functionName = i.slice(0, k)
            otherContent = i.slice(k, i.length)
            html += `<span class="funcNames">${functionName}</span><span class="brackets">${otherContent}</span>`
            gotFunction = true
        }
    }
}
