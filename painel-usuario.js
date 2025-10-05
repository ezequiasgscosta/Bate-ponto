// ----------------- Dias e Meses -----------------
const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

// ----------------- Atualizar Data e Hora -----------------
function atualizarDataHora() {
  const hoje = new Date();
  const diaSemana = dias[hoje.getDay()];
  const dia = hoje.getDate();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");

  document.getElementById("data").textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  document.getElementById("hora").textContent = `${horas}:${minutos}`;
}

setInterval(atualizarDataHora, 1000);
atualizarDataHora();

// ----------------- Usuário Logado -----------------
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuarioLogado) {
  alert("Nenhum usuário logado!");
  window.location.href = "index.html";
} else {
  document.getElementById("nome").textContent = usuarioLogado.nome;
  document.getElementById("foto").querySelector("img").src = usuarioLogado.foto;
}

// ----------------- Contador -----------------
let botao = document.getElementById("entrar");
let contadorDisplay = document.getElementById("contador-display");

// Carregar contador salvo ou inicializar
let contador = parseInt(localStorage.getItem(`contador_${usuarioLogado.re}`)) || 4;

// Atualiza display do contador e bloqueio se necessário
function atualizarBotao() {
  const bloqueio = localStorage.getItem(`bloqueioEntrar_${usuarioLogado.re}`);
  if (bloqueio) {
    const bloqueioTime = new Date(bloqueio).getTime();
    const agora = new Date().getTime();
    const diffHoras = (agora - bloqueioTime) / (1000 * 60 * 60);

    if (diffHoras < 11) {
      botao.disabled = true;
      botao.style.opacity = "0.6";
      botao.style.cursor = "not-allowed";
      contadorDisplay.textContent = `Fim do expediente! Volte em ${Math.ceil(11 - diffHoras)} horas `;
      return;
    } else {
      // Remove bloqueio após 11h
      localStorage.removeItem(`bloqueioEntrar_${usuarioLogado.re}`);
      contador = 4; // Reset contador
      localStorage.setItem(`contador_${usuarioLogado.re}`, contador);
    }
  }

  // Se contador chegou a 0, bloqueia
  if (contador === 0) {
    botao.disabled = true;
    botao.style.opacity = "0.6";
    botao.style.cursor = "not-allowed";
    contadorDisplay.textContent = "Contagem finalizada!";
  } else {
    botao.disabled = false;
    botao.style.opacity = "1";
    botao.style.cursor = "pointer";
    contadorDisplay.textContent = `Restam ${contador} cliques`;
  }
}

atualizarBotao();

// ----------------- Função Entrar -----------------
function entrar() {
  if (contador === 0) return; // Proteção extra

  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");
  const hora = `${horas}:${minutos}`;

  const texto = `Último ponto batido: dia ${dia}/${mes}/${ano} ${hora}`;
  document.getElementById("ultimo").textContent = texto;

  // ----------------- Contador -----------------
  contador--;
  localStorage.setItem(`contador_${usuarioLogado.re}`, contador);
  atualizarBotao();

  // Se zerou, salva bloqueio de 11h
  if (contador === 0) {
    localStorage.setItem(`bloqueioEntrar_${usuarioLogado.re}`, new Date().toISOString());
  }

  // ----------------- Salvar pontos -----------------
  const ponto = `Dia ${dia}/${mes}/${ano} - ${hora}`;
  let listaPontos = JSON.parse(localStorage.getItem(`listaPontos_${usuarioLogado.re}`)) || [];
  listaPontos.push(ponto);
  localStorage.setItem(`listaPontos_${usuarioLogado.re}`, JSON.stringify(listaPontos));

  // Salva último ponto para conferência
  localStorage.setItem(`ultimoPonto_${usuarioLogado.re}`, texto);
}

// ----------------- Evento do botão -----------------
botao.addEventListener("click", entrar);

// ----------------- Carregar Último Ponto -----------------
window.addEventListener("load", () => {
  const ultimo_ponto = document.getElementById("ultimo");
  const salvo = localStorage.getItem(`ultimoPonto_${usuarioLogado.re}`);
  if (salvo) ultimo_ponto.textContent = salvo;
});
