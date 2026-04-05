document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  const celular = document.getElementById("celular");
  const erro = document.getElementById("erro");

  // Máscara celular
  celular.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.substring(0, 11);

    if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (v.length > 0) {
      v = v.replace(/^(\d{0,2})$/, "($1");
    }

    e.target.value = v;
  });

  // VALIDAÇÃO PRINCIPAL
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const date = document.getElementById("date").value.trim();
    const email = document.getElementById("email").value.trim();
    const celularValor = celular.value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document
      .getElementById("confirmarSenha")
      .value.trim();

    // Campos vazios
    if (!nome || !email || !date || !celularValor || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    // Email válido
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("Email inválido!");
      return;
    }

    // Celular válido
    const numeros = celularValor.replace(/\D/g, "");
    if (numeros.length !== 11) {
      erro.style.display = "block";
      celular.focus();
      return;
    } else {
      erro.style.display = "none";
    }

    // Senhas iguais
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    
    if (senha.length < 6) {
  alert("Senha precisa ter no mínimo 6 caracteres");
  return;
}

    // ✅ SUCESSO
    alert("Cadastro realizado com sucesso! 🚀");
    window.location.href = "login.html";
  });
});