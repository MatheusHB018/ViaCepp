// ARQUIVO: backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Configuração básica
app.use(cors());
app.use(express.json());

// Rota da API
app.get('/api/cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        // Limpa o CEP (deixa só números)
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return res.status(400).json({ error: 'CEP inválido. Digite 8 números.' });
        }

        // Vai buscar lá no ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado.' });
        }

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao conectar com ViaCEP.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`SERVIDOR LIGADO: http://localhost:${PORT}`);
});