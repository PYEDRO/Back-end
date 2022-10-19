const express = require('express');
const app = express();
const morgan =  require ('morgan');
const bodyParser = require('body-parser');


const routerProdutos = require('./routes');
const routerPedidos = require('./pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Resquested-With,Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        return res.status(200).send({});
    }
    next();
}),

app.use('/produtos', routerProdutos);
app.use('/pedidos', routerPedidos);

//Quando der erro de rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado !');
    erro.status(404);
    next(erro);
});

app.use((erro, req, res, next) => {
    res.status(erro, status || 500);
    return res.send({
        erro: {
            mensagem : erro.message
        }
    });
});

module.exports = app;