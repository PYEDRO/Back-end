const express = require('express');
const router = express.Router();


// REtorna todos os produtos 
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Deu certo!!!"
    });
});

//Insere um pedido
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };
    res.status(201).send({
        mensagem: "Deu certo!!!",
        pedidoCriado: pedido
    });
});

// Retorna apenas de um pedido
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Retorna um produto especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'normal',
            id: id
        });
    };
});

// Altera o pedido
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deu certo !'
    });
});

// Deleta um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Deu certo !"
    });
});

module.exports = router;