let arr2 = [5, 4, null, NaN, 0, 3]
let qw_0 = 0; // нулевые
let qw_1 = 0; // нечетные
let qw_2 = 0; // четные

arr2.forEach((item,index) => {
    // нулевой
    if (item === 0) {
        qw_0++;
    } // нечетный
    else if ((index+1) % 2 == 1) {
        qw_1++;
    }  // четный
    else if ((index+1) % 2 == 0) {
        qw_2++;
    }
})

console.log(`Нулевых ${qw_0} Нечетных ${qw_1} Четных ${qw_2}`)