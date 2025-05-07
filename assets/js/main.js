const carousel = document.getElementById("carousel");

window.onload = () => {
  window.scrollTo(0, 0);
  carousel.scrollBy({ left: 2700, behavior: 'instant' });

  // Evento de clique no personagem
  const personagemImg = document.getElementById("personagemImg");
  if (personagemImg) {
    personagemImg.addEventListener("click", () => {
      const chatBox = document.getElementById("chatBox");
      if (chatBox) chatBox.style.display = "block";
    });
  }
  carregarNoticias();
  carregarPartidas();
  carregarJogadores();
};


function scrollCarouselLeft() {
  carousel.scrollBy({ left: -700, behavior: 'smooth' });
}

function scrollCarouselRight() {
  carousel.scrollBy({ left: 700, behavior: 'smooth' });
}


function redirectTo(url) {
  window.open(url, '_blank');
}

async function carregarNoticias() {
  try {
    const resposta = await fetch('/api/news');
    const noticias = await resposta.json();

    const container = document.getElementById('noticias');
    noticias.forEach(noticia => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${noticia.title_pt || noticia.title}</h3>
        <p>${noticia.description_pt || ''}</p>
        <a href="${noticia.link}" target="_blank">Leia mais</a>
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (erro) {
    console.error('Erro ao carregar notícias:', erro);
  }
}

async function carregarPartidas() {
  try {
    const resposta = await fetch('/api/matches');
    const partidas = await resposta.json();

    const container = document.getElementById('partidas');
    partidas.forEach(partida => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${partida.teams[0].name} vs ${partida.teams[1].name}</h3>
        <p><strong>Evento:</strong> ${partida.event.name}</p>
        <p><strong>Data/Hora:</strong> ${new Date(partida.time).toLocaleString()}</p>
        <img src="${partida.event.logo}" alt="Logo do evento" width="100">
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (erro) {
    console.error('Erro ao carregar partidas:', erro);
  }
}

async function carregarJogadores() {
  try {
    const resposta = await fetch('/api/player');
    const time = await resposta.json();

    const container = document.getElementById('jogadores');
    container.innerHTML = `<h2>${time.teamName}</h2>`;

    time.players.forEach(jogador => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${jogador.name}</strong> - ${jogador.age} anos</p>
        <img src="${jogador.image}" alt="${jogador.name}" width="80">
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (erro) {
    console.error('Erro ao carregar jogadores:', erro);
  }
}








