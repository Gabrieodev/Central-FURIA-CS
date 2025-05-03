import express from 'express';
import path from 'path';
import fetch from 'node-fetch';  
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Notícias

app.get('/api/news', async (req, res) => {
  const url = 'https://hltv-api.vercel.app/api/news.json';  

  try {
    const response = await fetch(url);
    const news = await response.json();
    
    const furiaNews = news.filter(newsItem => 
      newsItem.title.includes('FURIA')
    );

    res.json(furiaNews);  
  } catch (error) {
    console.error('Erro na requisição de notícias:', error);
    res.status(500).json({ error: 'Erro ao obter as notícias.' });
  }
});

//Partidas

app.get('/api/matches', async (req, res) => {
  const url = 'https://hltv-api.vercel.app/api/matches.json';

  try {
    const response = await fetch(url);
    const matches = await response.json();

    const furiaMatches = matches
      .filter(match =>
        match.teams.some(team => team.id === 8297)
      )
      .map(match => ({
        id: match.id,
        time: match.time,
        event: {
          name: match.event.name,
          logo: match.event.logo
        },
        stars: match.stars,
        maps: match.maps,
        teams: match.teams.map(team => ({
          id: team.id,
          name: team.name,
          logo: team.logo
        }))
      }));

    res.json(furiaMatches);
  } catch (error) {
    console.error('Erro ao buscar partidas futuras da FURIA:', error);
    res.status(500).json({ error: 'Erro ao buscar partidas futuras da FURIA.' });
  }
});

//Jogadores

app.get('/api/player', async (req, res) => {
  const url = 'https://hltv-api.vercel.app/api/player.json';
  const targetRanking = 8;

  try {
    const response = await fetch(url);
    const players = await response.json();

    const team = players.find(p => p.ranking === targetRanking);

    if (!team) {
      return res.status(404).json({ error: `Time com ranking ${targetRanking} não encontrado.` });
    }

    res.json(team);
  } catch (error) {
    console.error('Erro ao buscar time:', error);
    res.status(500).json({ error: 'Erro interno ao buscar dados.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

