// dias da semana
const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

function atualizarDataHora() {
  const hoje = new Date();

  const diaSemana = dias[hoje.getDay()];
  const dia = hoje.getDate();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");

  // Exibir data
  document.getElementById("data").textContent =
    `${diaSemana}, ${dia} de ${mes} de ${ano}`;

  // Exibir hora (sem segundos)
  document.getElementById("hora").textContent =
    `${horas}:${minutos}`;
}

// Atualiza a cada minuto
setInterval(atualizarDataHora, 1000);
atualizarDataHora();

//-------------------Funçoes aqui ----------------

//------------ ultimo ponto batido ---------------

function atualiza_ultimo_ponto() {
  const ultimo_ponto = document.getElementById("ultimo")
  
  const hoje = new Date();

    const dia = hoje.getDate().toString().padStart(2, "0");  
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = hoje.getHours().toString().padStart(2, "0");
  const minutos = hoje.getMinutes().toString().padStart(2, "0");
  const hora = `${horas}:${minutos}`;

  ultimo_ponto.textContent = `Ultimo ponto batido: dia ${dia}/${mes}/${ano}  ${hora} `
}