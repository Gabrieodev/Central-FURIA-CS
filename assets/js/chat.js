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
        <br>1. Próximas Partidas
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
    p.innerHTML = `<strong>${texto.startsWith('Você') ? '' : 'Furioso:'}</strong> ${texto}`;
    chatMessages.appendChild(p);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function responderOpcao(texto) {
    texto = texto.trim().toLowerCase();

    switch (texto) {
        case '1':
        case 'próximas partidas':
            adicionarMensagem('Confira as datas e adversários dos próximos jogos da FURIA. Em breve, atualizações!');
            break;
        case '2':
        case 'campeonatos':
            adicionarMensagem('A FURIA está competindo nos principais campeonatos internacionais! Acompanhe os resultados aqui!');
            break;
        case '3':
        case 'notícias':
            adicionarMensagem('Fique por dentro das últimas atualizações sobre o time e o universo do CS. Tudo em tempo real!');
            break;
        case '4':
        case 'loja oficial':
            adicionarMensagem('Acesse a loja oficial da FURIA e compre produtos exclusivos em: <a href="https://loja.furia.gg/" target="_blank">loja.furia.gg</a>');
            break;
        case '5':
        case 'jogos ao vivo':
            adicionarMensagem('Assista às partidas da FURIA em tempo real, com cobertura completa de todos os jogos!');
            break;
        case '6':
        case 'história do time':
            adicionarMensagem('A FURIA tem uma história incrível no CS, se tornando um dos maiores times do Brasil e do mundo!');
            break;
        case '7':
        case 'jogadores':
            adicionarMensagem('Conheça os jogadores da FURIA: KSCERATO, yuurih, chelo, FalleN e skullz!');
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


  