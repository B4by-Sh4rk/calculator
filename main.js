const calc = document.querySelector('.calc');
const calc__output = document.querySelector('.calc__output');
const calc__history = document.querySelector('.calc__history');
const history__text = document.querySelector('.history__text');
const history__menu = document.querySelector('.history__menu');
const calc__all__off = document.querySelector('.calc__all__off');
let allTotalHistory = [];
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
        let history__now = allTotalHistory.join(' ');
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
        firstNumber = calc__output.value.substring(0, calc__output.value.length - 1);
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
    }else if(data == 'history'){
        calc__all__off.classList.toggle('calc__all__on');
        history__menu.classList.toggle('display__none');
        //alert(allTotalHistory.join(' '));; 
        //console.log(allTotalHistory);
        history__text.innerText = history__now.split(' ').join('');
    }else if(data == '**2' && firstNumber){
        operation = data;
        allHistory.push(Math.pow(firstNumber, 2));
        const totalCalc = calculate(allHistory);
        total(totalCalc);
        totalHistory(allHistory);
        allTotalHistory.push(firstNumber,'^2 =',allHistory.join(''), ''+'\r\n'+'');
        history__now = allTotalHistory.join(' ');
        history__text.innerText = history__now.split(' ').join('');
        allHistory = [];
        operation = 'number';
        firstNumber = totalCalc;
    }else if(data == '**' && firstNumber){
        operation = data;
        allHistory.push(firstNumber, '^');
        firstNumber = '';
    }else if(data == '√' && firstNumber){
        operation = data;
        allHistory.push(Math.sqrt(firstNumber));
        const totalCalc = calculate(allHistory);
        total(totalCalc);
        totalHistory(allHistory);
        allTotalHistory.push('√',firstNumber,'=',allHistory.join(''), ''+'\r\n'+'');
        history__now = allTotalHistory.join(' ');
        history__text.innerText = history__now.split(' ').join('');
        allHistory = [];
        operation = 'number';
        firstNumber = totalCalc;
    }else if(data == 'n!' && firstNumber){
        operation = data;
        allHistory.push(firstNumber,'!');
        const totalCalc = calculate(allHistory);
        total(totalCalc);
        totalHistory(allHistory);
        allTotalHistory.push('!',firstNumber,'=',totalCalc, ''+'\r\n'+'');
        history__now = allTotalHistory.join(' ');
        history__text.innerText = history__now.split(' ').join('');
        allHistory = [];
        operation = 'number';
        firstNumber = totalCalc;
    }
    
    else if(data == '='){
        const n = calc__output.value;
        if(isString(n) == false){
            firstNumber  = n;
        }else {
            alert('не число');
        }
        if(firstNumber == eval(firstNumber)){
            allHistory.push(eval(firstNumber));
            const totalCalc = calculate(allHistory);
            totalHistory(allHistory);
            total(totalCalc);
            allTotalHistory.push(allHistory.join(''), '=', calc__output.value, ''+'\r\n'+'');
            history__now = allTotalHistory.join(' ');
            history__text.innerText = history__now.split(' ').join('');
            allHistory = [];
            operation = 'number';
            if(calc__output.value == 0){
                firstNumber = '0';
    
            }else{
                firstNumber = totalCalc;
                }

        }else{
                allHistory.push(firstNumber, '=', eval(firstNumber));
            const totalCalc = eval(firstNumber);
            totalHistory(allHistory);
            total(totalCalc);
            allTotalHistory.push(allHistory.join(''), ''+'\r\n'+'');
            history__now = allTotalHistory.join(' ');
            history__text.innerText = history__now.split(' ').join('');
            allHistory = [];
            operation = 'number';
            firstNumber = eval(firstNumber);
        }

    }
}



function total(totalValue){
    calc__output.value = totalValue;
}

function totalHistory(historyArr){
    let htmlEl = '';
    historyArr.forEach((i) => {
        if(i){
            htmlEl = htmlEl + `${i}`;
        }else if(['+','-','/','*','^','**2'].includes(i)){
            if(['^'].includes(i)){
                htmlEl = htmlEl + `^`;
            }else if(['**2'].includes(i)){
                htmlEl = htmlEl + `^2`;
            }else{
                htmlEl = htmlEl + `${i}`;
            }
        }
    });
    calc__history.value = htmlEl;
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
                }else if(calcHistoryArr[idx-1] == '**'){
                    totalRes = totalRes ** parseFloat(i);
                }else if(calcHistoryArr[idx-1] == Math.pow(firstNumber, 2)){
                    totalRes = Math.pow(firstNumber, 2);
                }else if(calcHistoryArr[idx-1] == Math.sqrt(firstNumber)){
                    totalRes = Math.sqrt(firstNumber);
                }else if(calcHistoryArr[idx] == '!'){
                    totalRes = factorial(firstNumber);
                }
            }
        }
        });
    return totalRes;
}

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }

  
  function isString(str){
    const regexp = /[aA-zZ]/;
    if(regexp.test(str)){
        return true;
    }else return false;
  }