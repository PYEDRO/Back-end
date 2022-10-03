const express = require("express");
const app = express();
const data = require('../data.json');

app.use(express.json());

// Comunicação HTTP
// GET: recebe
// POST: envia
// PUT: atualiza
// DELETE: deleta

// xpress estrutura, ... , fuction - processa a requisição (fazendo um requisitando, e respondendo)
app.get('/clients', function(req, res){
    res.json(data)
});
app.get('/clients/:id', function(req, res){});
app.post('/clients', function(req, res){});
app.put('/clients', function(req, res){});
app.put('/clients/:id', function(req, res){});
app.delete('/clients/:id', function(req, res){});

app.listen(3000, function(){
    console.log('Server is running')
});