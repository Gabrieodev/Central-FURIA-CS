function abrirChat() {
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    document.getElementById('chatModal').style.display = 'flex';

    if (!nomeSalvo) {
        const nome = prompt('Qual seu nome?');
        if (nome) {
            localStorage.setItem('nomeUsuario', nome);
            adicionarMensagem(`Prazer, ${nome}! Vamos nessa!`);
        }
    } else {
        adicionarMensagem(`Bem-vindo de volta, ${nomeSalvo}!`);
    }

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
                        return;
                    }

                    data.forEach(match => {
                        const dataFormatada = match.time.slice(0, 10); 
                        adicionarMensagem(`
                            </strong><br><br><strong>
                                🕒 <strong>${dataFormatada}</strong><br>
                                🏆 <strong>${match.event.name}</strong><br>
                                🗺️ Mapas: ${match.maps}<br>
                                👥 Adversários: ${match.teams.map(t => t.name).join(' vs ')}<br>
                                <hr>
                        `);
                    });
                })
                .catch(err => {
                    console.error(err);
                    adicionarMensagem('Erro ao buscar partidas. Tente novamente mais tarde.');
                });
            break;

        case '2':
        case 'jogos ao vivo':
                    adicionarMensagem(`
                    </strong><br><br><strong>
                    🎥 Assista agora aos jogos ao vivo da FURIA!</strong>
                    👉 <a href="https://www.twitch.tv/furiatv?lang=pt-br" target="_blank">Clique aqui para assistir na Twitch</a><hr>`);
            break;
                
         case '3':
         case 'jogadores':
         
             fetch('/api/player')
                 .then(response => response.json())
                 .then(time => {
                     if (!time.players || time.players.length === 0) {
                         adicionarMensagem('Nenhum jogador encontrado para a FURIA.');
                         return;
                     }
         
                     let mensagem = `👥 Jogadores do time de CS da ${time.name}:</strong><br><br><strong>`;
         
                     time.players.forEach(player => {
                         mensagem += `• <strong>${player.fullname} - ${player.country.name} 🌎</strong><br>`;
                     });
         
                     adicionarMensagem(mensagem.trim());
                 })
                 .catch(err => {
                     console.error('Erro ao buscar jogadores:', err);
                     adicionarMensagem('Erro ao buscar jogadores. Tente novamente mais tarde.');
                 });
             break;
                
        case '4':
        case 'loja oficial':
            adicionarMensagem('Acesse a loja oficial da FURIA e compre produtos exclusivos em: <a href="https://loja.furia.gg/" target="_blank">loja.furia.gg</a>');
            break;
        case '6':
        case 'história do time':
            adicionarMensagem('A FURIA tem uma história incrível no CS, se tornando um dos maiores times do Brasil e do mundo!');
            break;
        case '8':
        case 'stats e ranking':
            adicionarMensagem('A FURIA ocupa atualmente a 4ª posição no ranking mundial de CS! Vamos subir mais!');
            break;
        case '9':
        case 'resultados passados':
            adicionarMensagem('Reviva os resultados passados da FURIA com vitórias históricas em torneios internacionais!');
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

function fecharChat() {
    document.getElementById('chatModal').style.display = 'none';
}


  