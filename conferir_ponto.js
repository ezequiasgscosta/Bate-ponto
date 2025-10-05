window.addEventListener("load", () => {
  const registroHojeHeader = document.getElementById("registroHojeHeader");
  const registroHojeBody = document.getElementById("registroHojeBody");
  const listaPontosHoje = document.getElementById("listaPontosHoje");
  const setaRegistro = document.getElementById("setaRegistro");
  const painel = document.getElementById("painel_registros");
  const nomeUsuario = document.getElementById("nomeUsuario");

  // Pegar usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Nenhum usuário logado!");
    window.location.href = "index.html";
  } else {
    nomeUsuario.textContent = `👋 Olá, ${usuarioLogado.nome}`;
  }

  // Carregar pontos do localStorage apenas do usuário logado
  const listaPontos = JSON.parse(localStorage.getItem(`listaPontos_${usuarioLogado.re}`)) || [];
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataHoje = `Dia ${dia}/${mes}/${ano}`;

  // Filtrar pontos de hoje
  let pontosHoje = listaPontos.filter(ponto => ponto.startsWith(dataHoje));

  // Inverter para mostrar os mais recentes primeiro
  pontosHoje = pontosHoje.reverse();

  // Preencher lista de hoje
  listaPontosHoje.innerHTML = "";
  if (pontosHoje.length === 0) {
    listaPontosHoje.innerHTML = "<li>Nenhum ponto registrado hoje.</li>";
    painel.textContent = "Nenhum Registro hoje";
  } else {
    pontosHoje.forEach(ponto => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="icon">🕒</span> ${ponto}`;
      listaPontosHoje.appendChild(li);
    });
    // Último ponto (mais recente) no topo do painel
    painel.textContent = pontosHoje[0];
  }

  // Toggle abrir/fechar registros de hoje
  registroHojeHeader.addEventListener("click", () => {
    if (registroHojeBody.style.display === "none") {
      document.getElementById("card-body").style.display = "none";
      registroHojeBody.style.display = "block";
      setaRegistro.textContent = "▴";
    } else {
      registroHojeBody.style.display = "none";
      setaRegistro.textContent = "▾";
            document.getElementById("card-body").style.display = "block";

    }
  });
});
