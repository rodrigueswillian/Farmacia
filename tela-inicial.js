document.addEventListener("DOMContentLoaded", function () {

  // Verificar se usuário está logado
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const botaoCadastro = document.getElementById("botao-tela-principal");

  if (usuarioLogado) {
    // Usuário logado: mostrar nome e botão sair, ocultar botão cadastro
    const usuario = JSON.parse(usuarioLogado);
    const usuarioDiv = document.getElementById("usuario-logado");
    usuarioDiv.innerHTML = `<p>Bem-vindo, ${usuario.nome}!</p>`;

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
    let input = document.getElementById("pedido").value.toLowerCase();
    //Tratamento para queimadura (variações)
    if (
        input.includes("tratamento para queimadura") &&  input.includes("tratamento de queimadura") &&
        input.includes("tratamento queimadura")
      ) {
         //Tratamento( Genérico e específico)
      } else if(
        input.includes("tratamento")
      ){
           window.location.href = "tratamentoqueimadura.html";

           // QUEIMADURA (genérico e específico)
      } else if (
        input.includes("queimadura")
      ) {
        window.location.href = "telaqueimadura.html";

      // Autismo 
      } else if (
       input.includes("autismo") || input.includes("tratamento de autismo") || 
       input.includes("tratamento para autismo") && input.includes("tratamento autismo") 
      
      ) {
        window.location.href = "autismo.html";

      } else {
        // Mostrar modal de erro em vez de alert
        const modalErro = document.getElementById("modalErroPesquisa");
        modalErro.showModal();
      }
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
