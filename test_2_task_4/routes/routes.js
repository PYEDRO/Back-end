const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// Retorna todos os produtos 
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem : "Deu certo!!!"
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        reponse:null
                    });
                }
                res.status(201).send({
                    mensagem: "Deu certo!!!",
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

// Retorna apenas de um pedido
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    if (id === 'especial') {
        res.status(200).send({
            mensagem : 'Retorna um produto especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'normal',
            id: id
        });
    };
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem : 'Deu certo !'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem : "Deu certo !"
    });
});

module.exports = router;