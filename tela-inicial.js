document.addEventListener("DOMContentLoaded", function () {

  // Verificar se usuário está logado
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const botaoCadastro = document.getElementById("botao-tela-principal");

  if (usuarioLogado) {
    // Usuário logado: mostrar nome e botão sair, ocultar botão cadastro
    const usuario = JSON.parse(usuarioLogado);
    const usuarioDiv = document.getElementById("usuario-logado");
    usuarioDiv.innerHTML = `
      <span class="user-avatar">👤</span>
      <span class="user-name">Bem-vindo, ${usuario.nome}</span>
    `;
    usuarioDiv.classList.add("user-status");

    // Botão de logout
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem('usuarioLogado');
      window.location.href = "login.html";
    });

    // Ocultar botão cadastro
    if (botaoCadastro) {
      botaoCadastro.style.display = "none";
    }
  } else {
    // Usuário não logado: mostrar botão cadastro, ocultar nome e botão sair
    const usuarioDiv = document.getElementById("usuario-logado");
    usuarioDiv.style.display = "none";
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.style.display = "none";

    // Mostrar botão cadastro
    if (botaoCadastro) {
      botaoCadastro.style.display = "block";
      botaoCadastro.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "cadastro.html";
      });
    }
  }

  // Função de pesquisa (funciona com ou sem login)
function pesquisar() {

  // Pega o texto digitado e transforma em minúsculo
  const input = document
    .getElementById("pedido")
    .value
    .toLowerCase();

  // Lista de pesquisas
  const pesquisas = [

    // =========================
    // ENGASGO
    // =========================
    {
      verificar: texto =>
        texto.includes("tratamento") &&
        texto.includes("engasgo"),

      pagina: "telainicial-engasgo.html"
    },

    {
      verificar: texto =>
        texto.includes("engasgo"),

      pagina: "telainicial-engasgo.html"
    },

    // =========================
    // QUEIMADURA
    // =========================
    {
      verificar: texto =>
        texto.includes("tratamento") &&
        texto.includes("queimadura"),

      pagina: "tratamentoqueimadura.html"
    },

    {
      verificar: texto =>
        texto.includes("queimadura"),

      pagina: "telaqueimadura.html"
    },

    // =========================
    // AUTISMO
    // =========================
    {
      verificar: texto =>
        texto.includes("tratamento") &&
        texto.includes("autismo"),

      pagina: "autismo.html"
    },

    {
      verificar: texto =>
        texto.includes("autismo"),

      pagina: "autismo.html"
    }

  ];

  // Procura a primeira condição verdadeira
  const resultado = pesquisas.find(item =>
    item.verificar(input)
  );

  // Se encontrou, redireciona
  resultado
    ? window.location.href = resultado.pagina

    // Senão, mostra o modal
    : document
        .getElementById("modalErroPesquisa")
        .showModal();
}
    
  

    // Fechar modal de erro
    const btnFecharErro = document.getElementById("btnFecharErroPesquisa");
    btnFecharErro.addEventListener("click", function () {
      document.getElementById("modalErroPesquisa").close();
    });

    // Botão de Pesquisa
    let botaoPesquisa = document.getElementById("enviar");

    if (botaoPesquisa) {
      botaoPesquisa.addEventListener("click", function (event) {
        event.preventDefault();
        pesquisar();
      });
    }

    // Tecla ENTER
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
