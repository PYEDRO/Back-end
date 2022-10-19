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
                if (error) { return res.status(500).send({ error: error }) };
                const response = {
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                decricao: 'Retorna de um produtos',
                                url: 'http://localhost:3000/produtos/' +  prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send(response);
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
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: resultado.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            decricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos/'
                        }
                    }
                }
                return res.status(201).send(response);
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
                if(resultado.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não há nenhum registro com esse ID'
                    })
                }
                const response = {
                    produtoID: {
                        id_produto: resultado[0].id_produto,
                        nome: resultado[0].nome,
                        preco: resultado[0].preco,
                        request: {
                            tipo: 'GET_ID',
                            decricao: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos/'
                        }
                    }
                }
                return res.status(200).send(response);
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
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoID: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'PATCH',
                            decricao: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }
                res.status(202).send(response);
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
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request:{
                        tipo: 'POST',
                        descriocao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos/',
                        body: {
                            nome: 'Sting',
                            preco: 'Number'
                        }
                    }
                }
                res.status(202).send(response);
            }
        );
    });
});



module.exports = router;