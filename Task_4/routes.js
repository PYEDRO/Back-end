const express = require('express');
const router = express.Router();
const mysql = require('./datbase/mysql').pool;


// Retorna todos os produtos 
router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, field) => {
                console.log(resultado)
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        );
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})};
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) };
                res.status(201).send({
                    mensagem: "Deu certo!!!",
                    id_produto: resultado.insertId
                });
            }
        );
    });
});


// Retorna apenas de um pedido
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produto],
            (error, resultado, field) => {
                console.log(resultado)
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(200).send({ response: resultado });
            }
        );
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            `UPDATE produtos
                SET nome          = ?,
                    preco         = ?,
                WHERE id_produto  = ?`,
            [
                req.body.nome,
                req.body.preco,
                req.body.id_produto
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) };
                res.status(202).send({
                    mensagem: "Produto alterado com sucesso"
                });
            }
        );
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            `DELETE FROM produtos WHERE id_produtos = ?`,
            [
                req.body.id_produto
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) };
                res.status(202).send({
                    mensagem: "Produto deletado com sucesso"
                });
            }
        );
    });
});



module.exports = router;