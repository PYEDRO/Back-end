const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const data = require('./data.json');



app.use(express.json());
app.use(bodyParser.json());


const db = {
    test: {
        user : 'test',
        currency: '$',
        description: 'Test acconunt'
    }
}

// Comunicação HTTP
// GET: recebe
// POST: envia
// PUT: atualiza
// DELETE: deleta

// xpress estrutura, ... , fuction - processa a requisição (fazendo um requisitando, e respondendo)
app.get('/', (req, res) => {
    res.send('My API');
});
app.get('/clients', (req, res) => {
    res.status(200).json(data);
});
app.get('/clients/:id', function(req, res){
    
});
app.post('/clients', function(req, res){});
app.put('/clients', function(req, res){});
app.put('/clients/:id', function(req, res){});
app.delete('/clients/:id', function(req, res){});


app.listen(3000, () => {
    console.log('Server is running')
});
