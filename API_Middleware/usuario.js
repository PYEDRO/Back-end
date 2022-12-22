const express = require('express');
const router = express.Router();
const mysql = require('./datbase/mysql').pool;
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

// Cria um usuário 
router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query('SELECT * FROM usuario WHERE  email = ?', [req.body.email], (error, result) =>{
            if (error) { return res.status(500).send({ error: error }) };
            if (result.length > 0) {res.status(409).send({mensagem : 'Usuário já cadastrado'});}
            else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuario (email, senha) VALUES (?,?)`,
                        [req.body.email, hash],
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mensagem: 'Usuário criado com sucesso',
                                usuarioCriado: {
                                    id_usuario: result.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response)
                        }
                    );
                });
            }
        });        
    });
});

// Verifica se usuário exite e disponibiliza o token do usuário
router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        const query = `SELECT * FROM usuario WHERE email = ? `;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if(error) {return res.status(500).send({error : error})}
            if (results.length < 1) {
                return res.status(401).send({ 
                    mensagem: 'Falha na autenticação',
                    alternativa : {url: 'http://localhost:3000/usuario/alteração/' + req.body.id_usuario}
                })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
                if (error) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }
                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, 
                    process.env.JWT_KEY, {expiresIn : "1h"});

                    return res.status(401).send({ 
                        mensagem: 'Autenticado com sucesso !',
                        token : token
                    })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            });
        });
    });
});

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        const query = `SELECT * FROM usuario;`;
        conn.query(query, (error, resultado, field) => {
            if (error) { return res.status(500).send({ error: error }) };
            const response = {
                usuarioID: {
                    id_usuario: resultado[0].id_usuario,
                    email: resultado[0].email,
                    request: {
                        tipo: 'GET_ID',
                        decricao: 'Retorna um usuario',
                        }
                }
            }
            return res.status(200).send(response);
        });
    });
});

router.patch('/alteracao', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query('SELECT * FROM usuario WHERE  email = ?', [req.body.email], (error, result) => {
            if (error) { return res.status(500).send({ error: error }) };
            if (result.length < 1) { res.status(409).send({ mensagem: 'Nenhum usuário cadastrado' }) }
            else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `UPDATE usuario
                         SET email         = ?
                         WHERE senha       = ?`,
                        [req.body.email, hash],
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mensagem: 'Senha alterada com sucesso !',
                                alteracao: {
                                    id_usuario: result.insertId,
                                    email: req.body.email,
                                }
                            }
                            return res.status(201).send(response)
                        }
                    );
                });
            };
        }
        );
    });
});
module.exports=router;