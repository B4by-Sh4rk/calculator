const calc = document.querySelector('.calc');
const calc__output = document.querySelector('.calc__output');
const calc__history = document.querySelector('.calc__history');
let allHistory = [];
let firstNumber = '';
let operation = '';

calc.addEventListener('click', function(e){
    if(!e.target.classList.contains('calc__btn')) return;
    const data = e.target.dataset.type;
    operations(data);
    if(data != '='){
        total(firstNumber);
    }
    /*console.log('ОПЕРАЦИЯ ' + operation);
    console.log('ЧИСЛО ' + firstNumber);*/
    totalHistory(allHistory);

});

function operations(data){
    if(data >= 0){
        operation = 'number';
        firstNumber = firstNumber + data;
    }else if(data == '.'){
        operation = 'number';
        if(!/\./.test(firstNumber)){
            if(firstNumber){
                firstNumber = firstNumber + data;
            }else{
                firstNumber= '0.'
            }
        }
    }else if(data == 'delete' && operation == 'number'){
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
    }else if(data == 'clear'){
        firstNumber = '';
        allHistory = [];
    }else if(data == '+' && firstNumber){
        operation = data;
        allHistory.push(firstNumber, '+');
        firstNumber = '';
    }else if(data == '-' && firstNumber){
        operation = data;
        allHistory.push(firstNumber, '-');
        firstNumber = '';
    }else if(data == '/' && firstNumber){
        operation = data;
        allHistory.push(firstNumber, '/');
        firstNumber = '';
    }else if(data == '*' && firstNumber){
        operation = data;
        allHistory.push(firstNumber, '*');
        firstNumber = '';
    }else if(data == '='){
        allHistory.push(firstNumber);
        const totalCalc = calculate(allHistory);
        total(totalCalc);
        totalHistory(allHistory);
        allHistory = [];
        operation = 'number';
        firstNumber = totalCalc;
    }
}



function total(totalValue){
    calc__output.innerHTML = totalValue;
}

function totalHistory(historyArr){
    let htmlEl = '';
    historyArr.forEach((i) => {
        if(i >= 0){
            htmlEl = htmlEl + `<span>${i}</span>`;
        }else if(['+','-','/','*'].includes(i)){
            htmlEl = htmlEl + ` <strong>${i}</strong> `;
        }
    });
    //console.log(htmlEl);
    calc__history.innerHTML = htmlEl;
}

function calculate(calcHistoryArr){
    let totalRes = 0;
    calcHistoryArr.forEach((i, idx) => {
        if(idx == 0){
            totalRes = parseFloat(i);
        }else if(idx > 0){
            if(i => 0){
                if(calcHistoryArr[idx-1] == '+'){
                    totalRes = totalRes + parseFloat(i);
                }else if(calcHistoryArr[idx-1] == '-'){
                    totalRes = totalRes - parseFloat(i);
                }else if(calcHistoryArr[idx-1] == '/'){
                    totalRes = totalRes / parseFloat(i);
                }else if(calcHistoryArr[idx-1] == '*'){
                    totalRes = totalRes * parseFloat(i);
                }
            }
        }
        });
    //console.log(totalRes)
    return totalRes;
}


/*function totalHistory(historyArr){
    let htmlEl = '';
    for (let i = 0; i < historyArr.length; i += 1) {
        if(historyArr[i] >= 0){
            htmlEl = htmlEl + `<span>${historyArr[i]}</span>`;
        }else if(['+','-','/','*'].includes(historyArr[i])){
            htmlEl = htmlEl + ` <strong>${historyArr[i]}</strong> `;
        }
    };
    console.log(htmlEl);
    calc__history.innerHTML = htmlEl;
}

function calculate(calcHistoryArr){
    let totalRes = 0;
    for (let i = 0; i < calcHistoryArr.length; i += 1) {
        if(i == 0){
            totalRes == parseFloat(calcHistoryArr[i]);
        }else if(i - 2 > 0){
            if(parseFloat(calcHistoryArr[i]) >= 0){
                if(calcHistoryArr[i-1] == '+'){
                    totalRes = totalRes + parseFloat(calcHistoryArr[i]);
                }
            }
        }
        };
    console.log(totalRes)
    return totalRes;
}
*/