document.addEventListener("DOMContentLoaded", function () {

  // 🔘 Botão de Navegação
  let botaoNav = document.getElementById("botao-tela-principal");

  if (botaoNav) {
    botaoNav.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "cadastro.html";
    });
  }

function pesquisar() {
  let input = document.getElementById("pedido").value.toLowerCase();
if (
      input.includes("tratamento de queimadura") ||
      input.includes("tratamento queimadura") ||
      (input.includes("tratamento") && input.includes("queimadura"))
    ) {
      window.location.href = "tratamentoqueimadura.html";

    // QUEIMADURA (genérico depois)
    } else if (
      input.includes("queimadura")
    ) {
      window.location.href = "telaqueimadura.html";

    } else {
      alert("Nenhuma página encontrada para essa busca.");
    }
  }

  // Botão de Pesquisa
  let botaoPesquisa = document.getElementById("enviar");

  if (botaoPesquisa) {
    botaoPesquisa.addEventListener("click", function (event) {
      event.preventDefault();
      pesquisar();
    });
  }

  //  Tecla ENTER
  let inputCampo = document.getElementById("pedido");

  if (inputCampo) {
    inputCampo.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        pesquisar();
      }
    });
  }

});
