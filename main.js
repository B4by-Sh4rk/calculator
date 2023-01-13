const calc = document.querySelector('.calc');
const calc__output = document.querySelector('.calc__output');

calc.addEventListener('click', function(e){
    if(!e.target.classList.contains('calc__btn')) return;
    const value = e.target.innerText;
    let result = [];
    switch(value){
        case 'C':
            calc__output.innerText = '';
        break;

        case '<':
            calc__output.innerText = calc__output.innerText.substring(0, calc__output.innerText.length - 1);
        break;

        case '=':
                calc__output.innerText = eval(calc__output.innerText).toFixed(3);
                if(calc__output.innerText == 'Infinity'){
                    calc__output.innerText = '0';
                }
        break;


        default:
            calc__output.innerText += value;
    }

});