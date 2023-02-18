let a = prompt();

a++;

if (a % 2 === 0) console.log('четное');
else if (a % 2 > 0) console.log('нечетное');
else if (a === NaN) console.log('Упс, кажется, вы ошиблись');
else console.log('Упс, кажется, вы ошиблись');