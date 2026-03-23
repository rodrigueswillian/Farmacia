document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("botao-tela-principal")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "cadastro.html";
    });
});
