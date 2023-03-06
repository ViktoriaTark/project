function Task4(){

start = Number(prompt("Введите первое число"));
end = Number(prompt("До какого числа посчитать?"));

function getNextNumber(start, end) {
    index = start;
    function getNextNumberInner() {
        if (index <= end) {
            console.log(index);    
        }
        index++;
    }
    return getNextNumberInner;
}

const func = getNextNumber(start,end);
const intervalId = setInterval(func,1000);

}