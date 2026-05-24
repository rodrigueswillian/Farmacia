function trocarTela(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("ativo"));
  document.getElementById(id).classList.add("ativo");
}


function mostrarResultado(tipo) {
  trocarTela("resultado");

  let r = document.getElementById("resultado");

  if (tipo === "leve") {
    r.innerHTML = `
      <h2 class="sucesso">🟢 Engasgo leve</h2>
      <p>O bebê ainda consegue respirar.</p>

      <div class="lista">
        ✔️ Incentive a tossir<br>
        ✔️ Não bata nas costas com força<br>
        ✔️ Observe até melhorar
      </div>

      <button class="btn" onclick="trocarTela('inicio')">Voltar</button>
    `;
  }

  if (tipo === "grave") {
    r.innerHTML = `
      <h2 class="perigo">🔴 Engasgo grave</h2>
      <p><strong>Acione a emergência!</strong></p>

      <button class="btn" onclick="trocarTela('inicio')">Voltar</button>
    `;
  }
}
