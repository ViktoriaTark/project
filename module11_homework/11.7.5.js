function Task5() {
    let x = Number(prompt('Какое число Х возвести в степень?'));
    let n = Number(prompt('В какую степень n возвести?')); 
    
    function getDegree(x, n) {
        let result;
        if ((isNaN(x)) || (isNaN(n)))  {
            result = () => "Ошибка ввода"
        } else if ( ( (x < 1) || (n < 1) ) || ( (x !== Math.floor(x) ) || (n !== Math.floor(n)) ) ) {
            result = () => "Число не натуральное!"
        } else {
            result = (x,n) =>{
                var multiple =1;
                for (let index = 1; index <= n; index++) {
                    multiple *= x;
                };
                return multiple
            }
        }
             
        return result(x,n)
    }
    
    const func = getDegree(x,n);
    console.log(func);
}