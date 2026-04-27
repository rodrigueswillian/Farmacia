document.addEventListener("DOMContentLoaded", function () {
  const botaoAcessar = document.getElementById("botao-acessar");
  const loginInput = document.getElementById("login");
  const senhaInput = document.getElementById("senha");
  const modalSucesso = document.getElementById("modalSucesso");
  const modalErro = document.getElementById("modalErro");
  const btnFecharSucesso = document.getElementById("btnFecharSucesso");
  const btnFecharErro = document.getElementById("btnFecharErro");

  botaoAcessar.addEventListener("click", function (event) {
    event.preventDefault();

    const email = loginInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      modalErro.querySelector("p").textContent = "Por favor, preencha email e senha.";
      modalErro.showModal();
      return;
    }

    // Verificar se há usuário cadastrado
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) {
      modalErro.querySelector("p").textContent = "Nenhum usuário cadastrado. Faça o cadastro primeiro.";
      modalErro.showModal();
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.email === email && usuario.senha === senha) {
      // Login bem-sucedido, salvar sessão
      sessionStorage.setItem('usuarioLogado', JSON.stringify({ nome: usuario.nome, email: usuario.email }));
      // Mostrar modal de sucesso
      modalSucesso.showModal();
    } else {
      // Erro no login
      modalErro.showModal();
    }
  });

  // Fechar modal de sucesso e redirecionar
  btnFecharSucesso.addEventListener("click", function () {
    modalSucesso.close();
    window.location.href = "tela-inicial.html";
  });

  // Fechar modal de erro
  btnFecharErro.addEventListener("click", function () {
    modalErro.close();
  });
});
