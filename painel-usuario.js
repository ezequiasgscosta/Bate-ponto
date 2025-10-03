// Dias da semana e meses
const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

// Atualizar data e hora
function atualizarDataHora() {
  const hoje = new Date();

  const diaSemana = dias[hoje.getDay()];
  const dia = hoje.getDate();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");

  // Exibir data
  document.getElementById("data").textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  // Exibir hora (sem segundos)
  document.getElementById("hora").textContent = `${horas}:${minutos}`;
}

// Atualiza a cada minuto
setInterval(atualizarDataHora, 1000);
atualizarDataHora();

// ------------------- Funções ------------------

// Função para registrar ponto
function entrar() {
  const ultimo_ponto = document.getElementById("ultimo");

  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");
  const hora = `${horas}:${minutos}`;

  const texto = `Último ponto batido: dia ${dia}/${mes}/${ano}  ${hora}`;
  ultimo_ponto.textContent = texto;

  // Salvar último ponto
  localStorage.setItem("ultimoPonto", texto);

  // Salvar na lista de pontos
  const ponto = `Dia ${dia}/${mes}/${ano} - ${hora}`;
  let listaPontos = JSON.parse(localStorage.getItem("listaPontos")) || [];
  listaPontos.push(ponto);
  localStorage.setItem("listaPontos", JSON.stringify(listaPontos));

  // ✅ Salvar mensagem para a página de conferência
  localStorage.setItem("mensagemPainel", texto);
}

// Carregar último ponto ao abrir a página
window.addEventListener("load", () => {
  const ultimo_ponto = document.getElementById("ultimo");
  const salvo = localStorage.getItem("ultimoPonto");
  if (salvo) {
    ultimo_ponto.textContent = salvo;
  }

  carregarPontos();
});

// Função para carregar histórico de pontos
function carregarPontos() {
  const listaPontos = JSON.parse(localStorage.getItem("listaPontos")) || [];
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataHoje = `Dia ${dia}/${mes}/${ano}`;

  const registroHoje = document.getElementById("registro-hoje");
  const listaContainer = document.getElementById("lista-pontos");

  // Mostrar ponto de hoje
  const pontoHoje = listaPontos.find(ponto => ponto.startsWith(dataHoje));
  if (pontoHoje) {
    registroHoje.innerHTML = `<span class="icon">🕒</span> <span>${pontoHoje}</span>`;
  } else {
    registroHoje.innerHTML = `<span class="icon">🕒</span> <span>Nenhum registro hoje</span>`;
  }

  // Mostrar todos os pontos (histórico)
  listaContainer.innerHTML = "";
  if (listaPontos.length === 0) {
    listaContainer.innerHTML = "<li>Nenhum ponto registrado ainda.</li>";
  } else {
    listaPontos.forEach(ponto => {
      const li = document.createElement("li");
      li.textContent = ponto;
      listaContainer.appendChild(li);
    });
  }
}
