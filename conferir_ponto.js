window.addEventListener("load", () => {
  const registroHojeHeader = document.getElementById("registroHojeHeader");
  const registroHojeBody = document.getElementById("registroHojeBody");
  const listaPontosHoje = document.getElementById("listaPontosHoje");
  const setaRegistro = document.getElementById("setaRegistro");
  const painel = document.getElementById("painel_registros");

  // Carregar pontos do localStorage
  const listaPontos = JSON.parse(localStorage.getItem("listaPontos")) || [];
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataHoje = `Dia ${dia}/${mes}/${ano}`;

  // Filtrar pontos de hoje
  const pontosHoje = listaPontos.filter(ponto => ponto.startsWith(dataHoje));

  // Preencher lista
  listaPontosHoje.innerHTML = "";
  if (pontosHoje.length === 0) {
    listaPontosHoje.innerHTML = "<li>Nenhum ponto registrado hoje.</li>";
  } else {
    pontosHoje.forEach(ponto => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="icon">🕒</span> ${ponto}`;
      listaPontosHoje.appendChild(li);
    });
    // Mostra o último ponto no painel principal
    painel.textContent = pontosHoje[pontosHoje.length - 1];
  }

  // Função para registrar novo ponto
  function atualizarNenhumRegistro() {
    const agora = new Date();

    // Formatar data/hora
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");

    const texto = `Ultimo ponto Batido: ${dia}/${mes}/${ano} ${hora}:${minuto}`;

    // Salvar no localStorage
    listaPontos.push(texto);
    localStorage.setItem("listaPontos", JSON.stringify(listaPontos));

    // Atualizar painel
    painel.textContent = texto;
  }

  // Se estiver na página do painel-usuario, capturar clique no botão entrar
  const entrar = document.getElementById("entrar");
  if (entrar) {
    entrar.addEventListener("click", atualizarNenhumRegistro);
  }

  // Toggle abrir/fechar registros de hoje
  const relogio = document.getElementById("card-body");
  registroHojeHeader.addEventListener("click", () => {
    if (registroHojeBody.style.display === "none") {
      relogio.style.display = "none";
      registroHojeBody.style.display = "block";
      setaRegistro.textContent = "▴";
    } else {
      registroHojeBody.style.display = "none";
      setaRegistro.textContent = "▾";
    }
  });
});
