const express = require('express');
const { calcularOrcamentoPorta } = require('./calculo')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    return res.status(200).send('API ok');
})

app.post('/', async (req, res) => {
    const { largura, altura, quantidadePortas, material, tipoMotor, dentroDoVao } = req.body;

    try {
        const orcamento = calcularOrcamentoPorta({ largura, altura, quantidadePortas, material, tipoMotor, dentroDoVao });
        return res.status(201).json({
            orcamento: orcamento
        });
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});