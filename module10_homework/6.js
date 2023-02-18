let arr1 = [5, 4, 5, 5, 5, 3]
let first = arr1[0];
let i = 1;
while (first === arr1[i] && i <= arr1.length) {
    i++;
}

console.log((i) == arr1.length);