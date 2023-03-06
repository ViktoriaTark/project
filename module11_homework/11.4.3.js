function getNum(number1) {
    return function getNum2(number2) {
        console.log(`Сумма равна = ${number1 + number2}`);  
    }
}