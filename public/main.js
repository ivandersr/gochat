const input = document.querySelector('#textarea')
const messages = document.querySelector('#messages')
const username = document.querySelector('#username')
const send = document.querySelector('#send')

const url = "ws://" + window.location.host + "/ws";
const ws = new WebSocket(url);

ws.onmessage = (msg) => {
  insertMessage(JSON.parse(msg.data))
};

const sendMessage = () => {
  if (username.value.trim().length === 0) {
    alert("Fill your name!");
    username.value = "";
    return;
  }

  if (input.value.trim().length === 0) {
    return;
  }

  const message = {
    username: username.value,
    content: input.value,
  }

  ws.send(JSON.stringify(message));
  input.value = "";
}

send.onclick = () => {
  sendMessage();
};

textarea.addEventListener("keydown", (event) => {
  if (event.which === 13 && !event.shiftKey) {
    if (!event.repeat) {
      sendMessage();
    }

    event.preventDefault();
  }
})

const insertMessage = (messageObj) => {
  const message = document.createElement('div')

  message.setAttribute('class', 'chat-message')
  console.log("name: " + messageObj.username + " content: " + messageObj.content)
  message.textContent = `${messageObj.username}: ${messageObj.content}`

  messages.appendChild(message)

  messages.appendChild(message, messages.firstChild)
}