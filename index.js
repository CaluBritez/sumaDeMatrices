const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/sumar', (req, res) => {
    const { matriz1, matriz2 } = req.body;
    console.log(matriz1, matriz2);
    
    if (!matriz1 || !matriz2) {
        return res.status(400).json({ error: 'Las matrices no fueron proporcionadas.' });
    }
    
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        return res.status(400).json({ error: 'Las matrices deben tener la misma dimensión para poder sumarlas.' });
    }
    

    let resultado = [];
    for (let i = 0; i < matriz1.length; i++) {
        let fila = [];
        for (let j = 0; j < matriz1[i].length; j++) {
            fila.push(parseInt(matriz1[i][j]) + parseInt(matriz2[i][j]));
        }
        resultado.push(fila);
    }
    
    res.json(resultado);
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));