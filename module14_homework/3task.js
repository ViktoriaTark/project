/*Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
где get-параметр limit — это введённое число.*/

const btn = document.getElementById("send");
const result = document.getElementById("result");
const img = document.getElementById("image");
const input = document.getElementById("input");

const xhr = new XMLHttpRequest();

btn.onclick = () => {
  const val = +input.value;
  if (typeof val === "number" && !isNaN(val)) {
    if (val < 1 || val > 10) {
      result.innerText = "Введите число от 1 до 10";
    } 
    else {
      let responseUrl = "https://picsum.photos/v2/list?limit=" + val;
      xhr.open("GET", responseUrl);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let imgSrc = JSON.parse(xhr.response)[val - 1]["download_url"];
          let imgAlt = JSON.parse(xhr.response)[val - 1]["author"];
          img.setAttribute("src", imgSrc);
          img.setAttribute("alt", imgAlt);
          img.setAttribute("width", 500);
        }
      }
      xhr.onerror = function () {
        result.innerText = "При отправке запроса произошла ошибка.";
      }
      xhr.send();
    }
}
}