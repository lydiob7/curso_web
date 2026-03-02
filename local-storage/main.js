// Función copiada de la documentación de MDN (https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#probar_la_disponibilidad)
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

function renderNewMessage(message, messagesContainer) {
  if (!messagesContainer || !message?.trim()?.length) return;
  const newMessageElement = document.createElement("div");
  newMessageElement.classList.add("message");
  newMessageElement.classList.add("message--own");
  const authorElement = document.createElement("span");
  authorElement.classList.add("message-author");
  authorElement.innerText = "Yo";
  const messageBodyElement = document.createElement("span");
  messageBodyElement.classList.add("message-content");
  messageBodyElement.innerText = message;
  newMessageElement.appendChild(authorElement);
  newMessageElement.appendChild(messageBodyElement);
  messagesContainer.appendChild(newMessageElement);
}

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const form = document.getElementById("chat-form");
  const input = document.getElementById("new-message");
  const messagesList = document.querySelector(".messages-list");

  // Nos fijamos primero que el local storage esté disponible en el navegador
  if (!storageAvailable("localStorage")) {
    alert("LocalStorage no está disponible en este navegador");
    return;
  }

  // Manejo del submit del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = input.value;

    // Acá enviaríamos el mensaje, lo guardariamos en la db o algun otro tipo de persistencia
    renderNewMessage(message, messagesList);
    input.value = "";
  });

  // Escuchamos cuando cambia el input
  input.addEventListener("input", (event) => {
    const value = event.target.value;

    console.log("Escribiendo: ", value);
  });
});
