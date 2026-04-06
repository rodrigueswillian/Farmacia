document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  const celular = document.getElementById("celular");
  const erro = document.getElementById("erro");
  const inputData = document.getElementById('date');

  // Limite de idade: 10 anos atrás
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const anoMax = anoAtual - 10;
  inputData.max = `${anoMax}-12-31`;

  // Todos os DDDs válidos do Brasil
  const dddsValidos = [
    '11','12','13','14','15','16','17','18','19',
    '21','22','24','27','28',
    '31','32','33','34','35','37','38',
    '41','42','43','44','45','46',
    '47','48','49',
    '51','53','54','55',
    '61','62','64','63','65','66','67',
    '68','69','71','73','74','75','77','79',
    '81','82','83','84','85','86','87','88','89',
    '91','92','93','94','95','96','97','98','99'
  ];

  // Máscara celular Brasil (não trava a digitação)
  celular.addEventListener("input", function (e) {
    let numeros = e.target.value.replace(/\D/g, "");
    
    // Sempre começa com +55
    if (!numeros.startsWith("55")) numeros = "55" + numeros;

    let ddd = numeros.slice(2,4);
    let numero = numeros.slice(4,13);

    let formatado = "+55";
    if (ddd) formatado += ` (${ddd})`;
    if (numero) {
      if (numero.length > 5) numero = numero.slice(0,5) + "-" + numero.slice(5);
      formatado += ` ${numero}`;
    }

    e.target.value = formatado;
  });

  // VALIDAÇÃO DO FORMULÁRIO
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const date = document.getElementById("date").value.trim();
    const email = document.getElementById("email").value.trim();
    const celularValor = celular.value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    if (!nome || !email || !date || !celularValor || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("Email inválido!");
      return;
    }

    const numeros = celularValor.replace(/\D/g, "");

    if (!numeros.startsWith("55")) {
      erro.style.display = "block";
      erro.innerText = "Número deve começar com +55 (Brasil)";
      celular.focus();
      return;
    }

    const ddd = numeros.slice(2,4);
    const numero = numeros.slice(4);

    if (!dddsValidos.includes(ddd)) {
      erro.style.display = "block";
      erro.innerText = "DDD inválido!";
      celular.focus();
      return;
    }

    if (numero.length !== 9) {
      erro.style.display = "block";
      erro.innerText = "Número deve ter 9 dígitos!";
      celular.focus();
      return;
    }

    erro.style.display = "none";

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (senha.length < 6) {
      alert("Senha precisa ter no mínimo 6 caracteres");
      return;
    }

    alert("Cadastro realizado com sucesso! 🚀");
    window.location.href = "login.html";
  });
});
