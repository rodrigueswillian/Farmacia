document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("botaotelalogin")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      const date = document.getElementById("date").value.trim();
      const email = document.getElementById("email").value.trim();
      const celular = document.getElementById("celular").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const confirmarsenha = document.getElementById("confirmar-senha").value.trim();
      if (!nome || !email || !date || !celular || !senha || !confirmarsenha) {
        // bloqueia envio do formulário
        alert("Preencha todos os campos antes de continuar!");
        return false;
      } else {
        window.location.href = "login.html";
      
      }

      //event.preventDefault();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const celular = document.getElementById("celular");
  const botaotelalogin = document.getElementById("botaotelalogin")
  const erro = document.getElementById("erro");

  // Máscara segura
  celular.addEventListener("input", function (e) {
    let v = e.target.value.replace(/\D/g, ""); // só números
    if (v.length > 11) v = v.substring(0, 11); // limita a 11 dígitos

    // Formata (99) 99999-9999
    if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (v.length > 0) {
      v = v.replace(/^(\d{0,2})$/, "($1");
    }

    e.target.value = v;
  });

  // Validação ao enviar
  botaotelalogin.addEventListener("click", function (e) {
    const numeros = celular.value.replace(/\D/g, "");
    if (numeros.length !== 11) {
      e.preventDefault();
      erro.style.display = "block";
      celular.focus();
    } else {
      erro.style.display = "none";
       window.location.href = "login.html";
    }
  });
});
