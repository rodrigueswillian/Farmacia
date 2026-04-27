document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formCadastro");

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");
  const celular = document.getElementById("celular");
  const inputData = document.getElementById("date");
  const erro = document.getElementById("erro");

  const dialogSucesso = document.querySelector("#dialogSucesso");
  const btnFechar = document.querySelector("#btnFechar");

  const anoMax = new Date().getFullYear() - 10;
  inputData.max = `${anoMax}-12-31`;

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

  function setValid(input, ok) {
    input.style.border = ok ? "2px solid green" : "2px solid red";
  }

  // 🧠 NOME
  nomeInput.addEventListener("input", function () {
    let nome = nomeInput.value.trim();

    let ok =
      /^[a-zà-ú\s]+$/i.test(nome) &&
      nome.split(" ").filter(Boolean).length >= 2 &&
      nome.length < 40;

    setValid(nomeInput, ok);
  });

  // 📧 EMAIL
  emailInput.addEventListener("input", function () {
    let ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    setValid(emailInput, ok);
  });

  // 🔑 SENHA
  senhaInput.addEventListener("input", function () {
    setValid(senhaInput, senhaInput.value.length >= 6);
  });

  confirmarSenhaInput.addEventListener("input", function () {
    setValid(confirmarSenhaInput, confirmarSenhaInput.value === senhaInput.value);
  });

  // 📅 DATA
  inputData.addEventListener("input", function () {
    let valor = inputData.value;

    if (!valor) {
      setValid(inputData, false);
      return;
    }

    let ano = parseInt(valor.split("-")[0]);
    setValid(inputData, !isNaN(ano) && ano <= anoMax);
  });

  // 📱 CELULAR (NÃO MEXIDO)
  celular.addEventListener("input", function (e) {
    let numeros = e.target.value.replace(/\D/g, "");

    if (!numeros.startsWith("55")) {
      numeros = "55" + numeros;
    }

    let ddd = numeros.slice(2, 4);
    let numero = numeros.slice(4);

    let formatado = "+55";
    if (ddd) formatado += ` (${ddd})`;

    if (numero) {
      if (numero.length > 5) {
        numero = numero.slice(0, 5) + "-" + numero.slice(5);
      }
      formatado += ` ${numero}`;
    }

    e.target.value = formatado;

    let ok =
      numeros.length === 13 &&
      dddsValidos.includes(ddd);

    setValid(celular, ok);

    if (!ok && numeros.length > 4) {
      erro.style.display = "block";
      erro.innerText = "Número inválido!";
    } else {
      erro.style.display = "none";
    }
  });

  // 🧾 SUBMIT FINAL (SÓ MODAL AQUI)
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const date = inputData.value.trim();
    const celularValor = celular.value.trim();
    const senha = senhaInput.value.trim();
    const confirmarSenha = confirmarSenhaInput.value.trim();

    let numeros = celularValor.replace(/\D/g, "");
    let ddd = numeros.slice(2, 4);

    let nomeOk =
      /^[a-zà-ú\s]+$/i.test(nome) &&
      nome.split(" ").length >= 2 &&
      nome.length < 40;

    let emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let senhaOk = senha.length >= 6;
    let senhaIgual = senha === confirmarSenha;

    let anoOk =
      !isNaN(parseInt(date.split("-")[0])) &&
      parseInt(date.split("-")[0]) <= anoMax;

    let celularOk =
      numeros.length === 13 &&
      dddsValidos.includes(ddd);

    if (!nomeOk || !emailOk || !senhaOk || !senhaIgual || !anoOk || !celularOk) {
      alert("Corrija os campos antes de continuar!");
      return;
    }

    // 🚀 TROCA AQUI: alert removido
    // Salvar dados no localStorage
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      celular: celularValor,
      dataNascimento: date
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    dialogSucesso.showModal();
  });

  // 🔘 FECHAR MODAL → LOGIN
  btnFechar.addEventListener("click", function () {
    dialogSucesso.close();
  });

  dialogSucesso.addEventListener("close", function () {
    window.location.href = "login.html";
  });

});
