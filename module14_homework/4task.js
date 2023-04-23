/*Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
При клике на кнопку происходит следующее:
Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — 
ширина картинки, второе — высота.*/

const btn = document.getElementById("send");
const img = document.getElementById("image");
const inputFirst = document.getElementById("inputFirst");
const inputSecond = document.getElementById("inputSecond");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  let firstNum = +inputFirst.value;
  let secondNum = +inputSecond.value;
  if (typeof firstNum === "number" && typeof secondNum === "number" && !isNaN(firstNum) && !isNaN(secondNum)) {
    if (firstNum >= 100 && firstNum <= 300 && secondNum >= 100 && secondNum <= 300) {
      result.innerText = "";
      let fetchUrl = `https://picsum.photos/${firstNum}/${secondNum}`;
      fetch(fetchUrl)
        .then((response) => {
          return response;})
        .then((data) => {
          img.setAttribute("src", data.url);
        })
    } 
    else {
      result.innerText = "Одно из чисел вне диапазона от 100 до 300";
    }
  } 
  else {
    result.innerText = "Ошибка при вводе данных"
  }
})