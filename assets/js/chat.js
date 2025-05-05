function abrirChat() {
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    document.getElementById('chatModal').style.display = 'flex';

    if (!nomeSalvo) {

        document.getElementById('nomeUsuarioBox').style.display = 'block';
        document.querySelector('.chat-container').style.display = 'none';
    } else {
        iniciarChat(nomeSalvo);
    }
}

// localStorage.removeItem('nomeUsuario');

function salvarNome() {
    const nome = document.getElementById('nomeUsuarioInput').value.trim();

    if (nome) {
        localStorage.setItem('nomeUsuario', nome);
        document.getElementById('nomeUsuarioBox').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
        iniciarChat(nome);
    } else {
        alert('Por favor, digite seu nome.');
    }
}

function iniciarChat(nome) {
    adicionarMensagem(`Prazer, ${nome}! Vamos nessa!`);

    adicionarMensagem(
        `Aqui é o lugar certo pra quem <strong>respira Counter-Strike</strong> e torce com o coração pela <strong>FURIA Esports!</strong><br>
        Fique por dentro de tudo: escalações, jogos, bastidores, jogadas insanas e aquela resenha que só fã de verdade entende!<br><br>`
    );

    mostrarSugestoes();
}

function mostrarSugestoes() {
    adicionarMensagem(`
        <br><br> Escolha uma das opções abaixo e digite no chat para continuar:
        <br>1. Partidas
        <br>2. Jogos Ao Vivo
        <br>3. Jogadores
        <br>4. Notícias
        <br>5. História do Time
        <br>6. Loja Oficial
    `);
}

function adicionarMensagem(texto) {
    const chatMessages = document.getElementById('chatMessages');
    const p = document.createElement('p');
    p.innerHTML = `<strong>${texto.startsWith('Você') ? '' : 'Furioso:'}${texto}`;
    chatMessages.appendChild(p);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function responderOpcao(texto) {
    texto = texto.trim().toLowerCase();

    switch (texto) {
        case '1':
        case 'partidas':
            adicionarMensagem('Buscando próximas partidas da FURIA...');

            fetch('/api/matches')
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        adicionarMensagem('Nenhuma partida da FURIA encontrada no momento.');
                        mostrarSugestoes();
                        return;
                    }

                    data.forEach(match => {
                        const dataFormatada = match.time.slice(0, 10); 
                        adicionarMensagem(`
                            🕒 <strong>${dataFormatada}</strong><br>
                            🏆 <strong>${match.event.name}</strong><br>
                            🗺️ Mapas: ${match.maps}<br>
                            👥 Adversários: ${match.teams.map(t => t.name).join(' vs ')}<br>
                            <hr>
                        `);
                    });
                    
                
                    mostrarSugestoes();
                })
                .catch(err => {
                    console.error(err);
                    adicionarMensagem('Erro ao buscar partidas. Tente novamente mais tarde.');
                    mostrarSugestoes();  
                });
            break;

        case '2':
        case 'jogos ao vivo':
                    adicionarMensagem(`
                    </strong><br><br><strong>
                    🎥 Assista agora aos jogos ao vivo da FURIA e acompanhe cada jogada em tempo real! Torça, vibre e sinta a emoção de ver o time em ação diretamente dos principais campeonatos do cenário mundial!</strong>
                    👉 <a href="https://www.twitch.tv/furiatv?lang=pt-br" target="_blank">Clique aqui para assistir na Twitch</a><hr>`);
                    setTimeout(() => {
                        mostrarSugestoes();
                    }, 100);
            break;
                
        case '3':
        case 'jogadores':
            fetch('/api/player')
                .then(response => response.json())
                .then(time => {
                    if (!time.players || time.players.length === 0) {
                        adicionarMensagem('Nenhum jogador encontrado para a FURIA.');
                        mostrarSugestoes(); 
                        return;
                    }
        
                    let mensagem = `👥 Jogadores do time de CS da ${time.name}:</strong><br><br><strong>`;
        
                    time.players.forEach(player => {
                        mensagem += `• <strong>${player.fullname} - ${player.country.name} 🌎</strong><br>`;
                    });
        
                    adicionarMensagem(mensagem.trim());
                    mostrarSugestoes(); 
                })
                .catch(err => {
                    console.error('Erro ao buscar jogadores:', err);
                    adicionarMensagem('Erro ao buscar jogadores. Tente novamente mais tarde.');
                    mostrarSugestoes(); 
                });
            break;
                
        case '4':
        case 'notícias':
            adicionarMensagem('📰 Buscando notícias mais recentes sobre a FURIA...');
        
            fetch('/api/news')
                .then(response => response.json())
                .then(news => {
                    if (!news.length) {
                        adicionarMensagem('Nenhuma notícia encontrada sobre a FURIA no momento.');
                        mostrarSugestoes();
                        return;
                    }
        
                    news.forEach(noticia => {
                        const dataNoticia = new Date(noticia.time).toLocaleDateString('pt-BR');
                        adicionarMensagem(`
                            <strong><br>🗞️ ${noticia.title_pt || noticia.title}</strong><br>
                            📅 ${dataNoticia}<br>
                            📃 ${noticia.description_pt || noticia.description}<br>
                            <a href="#" class="leia-mais" data-extra-text="A FURIA é a história de sucesso que define a nova era do Counter-Strike brasileiro. Eles foram a equipe revelação que sucedeu as formações outrora dominantes da Luminosity e SK para se tornar o melhor time sul-americano, uma escalação composta inteiramente por novos talentos que surgiu após a mudança para a América do Norte em 2018 e começou a subir lentamente no ranking, conquistando um lugar entre os 30 melhores times do mundo no ano seguinte." data-link="${noticia.link}">Clique aqui para saber mais</a>
                            <hr>
                        `);
                    });
        
                    setTimeout(() => {
                        document.querySelectorAll('.leia-mais').forEach(link => {
                            link.addEventListener('click', e => {
                                e.preventDefault();
                                const textoExtra = e.target.dataset.extraText;
                                const linkOriginal = e.target.dataset.link;
        
                                if (textoExtra) {
                                    adicionarMensagem(`📘 <em>${textoExtra}</em><br><strong>Você será direcionado para a página completa da notícia:</strong><br><a href="${linkOriginal}" target="_blank">🔗 Acesse a notícia completa aqui</a>`);
                                } else {
                                    adicionarMensagem('Nenhuma informação adicional disponível.');
                                }
        
                                mostrarSugestoes();
                            });
                        });
                    }, 100);
                })
                .catch(err => {
                    console.error('Erro ao buscar notícias:', err);
                    adicionarMensagem('Erro ao buscar notícias. Tente novamente mais tarde.');
                    mostrarSugestoes();
                });
            break;
        
        case '5':
        case 'história do time':
            adicionarMensagem(`
                🏆 A FURIA Esports é uma das organizações brasileiras mais proeminentes no cenário competitivo de Counter-Strike.<br><br>
                Fundada em agosto de 2017 em Uberlândia, Minas Gerais, por Jaime Pádua, André Akkari e Cris Guedes, a equipe rapidamente se destacou no cenário nacional e internacional.<br><br>
                O primeiro investimento da FURIA foi no Counter-Strike: Global Offensive (CS:GO). A equipe fez sua primeira aparição em um campeonato Major apenas dois anos após sua fundação, no IEM Katowice Major 2019, embora tenha sido eliminada na primeira fase do torneio. A FURIA continuou a melhorar pelo resto do ano, terminando em segundo lugar na 7ª temporada do Esports Championship Series (ECS).<br><br>
                🔗 <a href="https://pt.wikipedia.org/wiki/Furia_Esports" target="_blank">Clique aqui para conhecer a história completa da FURIA no CS</a>
            `);
        
                setTimeout(() => {
                    mostrarSugestoes();
                }, 100); 
            break;    
        
        case '6':
        case 'loja oficial':
                adicionarMensagem(' Acesse agora a loja oficial da FURIA e descubra uma linha exclusiva de produtos feitos para verdadeiros fãs! Garanta camisetas, moletons, acessórios e muito mais com o estilo único da equipe! Compre já em: <a href="https://loja.furia.gg/" target="_blank">loja.furia.gg</a>');
                
                setTimeout(() => {
                    mostrarSugestoes();
                }, 100);
            break;
    
        default:
            adicionarMensagem('Ops! Essa opção não foi reconhecida. Tente digitar o número da opção ou o nome dela!');
            break;
    }
}

function enviarMensagem() {
    const input = document.getElementById('userMessage').value;
    if (input) {
        adicionarMensagem(`Você: ${input}`);
        responderOpcao(input);
        document.getElementById('userMessage').value = '';
    }
}

let mensagemEncerramentoExibida = false;

function fecharChat() {

    if (!mensagemEncerramentoExibida) {
        adicionarMensagem("👋 Até a próxima, Furioso!");
        mensagemEncerramentoExibida = true;  
    }

    setTimeout(() => {
        document.getElementById('chatModal').style.display = 'none';

        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';  

        const input = document.getElementById('userMessage');
        input.value = ''; 
        input.placeholder = 'Digite sua mensagem...';
    }, 2500);  
}


  