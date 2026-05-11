function diagnostico(){
  mostrarPergunta("A pele tem bolhas?", function(resposta1){
    
    if(resposta1){
      mostrarResultado("🟡 Provável 2º grau",
      "Resfrie com água corrente e NÃO estoure as bolhas.");
    } else {
      
      mostrarPergunta("A pele está esbranquiçada, escura ou sem sensibilidade?", function(resposta2){
        
        if(resposta2){
          mostrarResultado("🔴 Possível 3º grau",
          "Procure ajuda médica URGENTE!");
        } else {
          mostrarResultado("🟢 Provável 1º grau",
          "Lave com água fria e hidrate a pele.");
        }

      });

    }

  });
}

function mostrarPergunta(texto, callback){
  const box = document.getElementById("modalBox");
  box.innerHTML = `
    <h3>${texto}</h3>
    <button onclick="responder(true)">Sim</button>
    <button onclick="responder(false)">Não</button>
  `;
  document.getElementById("modal").style.display = "flex";

  window.responder = function(resposta){
    document.getElementById("modal").style.display = "none";
    callback(resposta);
  }
}

function mostrarResultado(titulo, texto){
  const box = document.getElementById("modalBox");
  box.innerHTML = `
    <h3>${titulo}</h3>
    <p>${texto}</p>
    <button onclick="fecharModal()">Fechar</button>
  `;
  document.getElementById("modal").style.display = "flex";
}

function fecharModal(){
  document.getElementById("modal").style.display = "none";
}
