import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Solução para __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criação do app Express
const app = express();

// Definindo o diretório de arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota principal que retorna o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Porta de escuta (Railway usa process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


