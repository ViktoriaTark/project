const wsUrl = "wss://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.j-btn-send');
const btnSendGeo = document.querySelector('.j-btn-geo');
const chat = document.querySelector('.chat');
const inp = document.querySelector('.input')


let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  chat.appendChild(pre);
}

function writeOutToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  pre.classList.add("outMessage");
  chat.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  websocket = new WebSocket(wsUrl);
  if (inp.value != "") {
  websocket.onopen = function(evt) {
    writeOutToScreen(`<span style="color: green;">${inp.value}</span>`); 
    websocket.send(inp.value);
    inp.value = "";
    } 
  };
  
  websocket.onclose = function(evt) {
    writeToScreen(`<span style="color: red;">DISCONNECTED</span>`);
  };
  websocket.onmessage = function(evt) {
      writeToScreen(`<span style="color: green;">${evt.data}</span>`)
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
  
});


btnSendGeo.addEventListener('click', () => {
  websocket = new WebSocket(wsUrl);
  websocket.onopen = function(evt) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const latitude  = coords.latitude;
        const longitude = coords.longitude;
        writeOutToScreen(`<a href = "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a>`); 
        websocket.send(coords);
      });
    }
  } 
});