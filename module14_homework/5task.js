/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, 
а GET-параметр limit — это введённое число второго input.*/

const pageInput = document.getElementById("page");
const limitInput = document.getElementById("limit");
const btn = document.getElementById("send");
const messageFrame = document.getElementById("message");
const galleryFrame = document.getElementById("gallery");

function validateValue(value, valuesRange) {
  return typeof value === "number" && !isNaN(value) && value >= valuesRange[0] && value <= valuesRange[1];
}

function sendRequest(page, limit) {
  let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    let response = JSON.parse(xhr.response);
    let images = ``;
    localStorage.clear();
    for (let img of response) {
      images += `<img src="${img.download_url}" width="300px" style="margin: 10px;">`;
    }
    localStorage.setItem("images", images);
    galleryFrame.innerHTML = images;
  }
  xhr.send();
}

btn.addEventListener("click", () => {
  let page = +pageInput.value;
  let limit = +limitInput.value;
  let valuesRange = [1, 10];
  if (validateValue(page, valuesRange) && validateValue(limit, valuesRange)) {
    sendRequest(page, limit);
  } 
  else if (validateValue(page, valuesRange)) {
    messageFrame.innerText = "Номер страницы вне диапазона от 1 до 10";
  } 
  else if (validateValue(limit, valuesRange)) {
    messageFrame.innerText = "Лимит вне диапазона от 1 до 10";
  } 
  else {
    messageFrame.innerText = "Номер страницы и лимит вне диапазона от 1 до 10";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let imagesHtml = localStorage.getItem("images");
  if (imagesHtml) {
    galleryFrame.innerHTML = imagesHtml;
  }
});