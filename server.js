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


app.get('/api/estatisticas-furia', async (req, res) => {
  try {
  
    const response = await fetch('URL_DA_API_DE_ESTATISTICAS');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar as estatísticas');
    }

    const estatisticas = await response.json();  

    res.json(estatisticas); 
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).send('Erro ao obter as estatísticas');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

