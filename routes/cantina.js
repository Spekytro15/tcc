var express = require('express');
var router = express.Router();
var mysql = require("../cone").pool;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) };
        conn.query('select * from cantina where gmail = ?', [req.body.gmail], (error, results) => {
            if (results.length == 1) {

                res.status(409).send({
                    menssage: 'Cantina já esta cadastrada ',
                    user: results[0].nome
                });

            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.senha, salt, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) };
                        conn.query('INSERT INTO cantina ( nome, gmail, senha) VALUES ( ?, ?, ?);', [req.body.nome, req.body.gmail, req.body.senha],
                            (error, results) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) };
                                response = {
                                    menssage: 'Cantina cadastrada com Sucesso ',
                                    usuarioCriado: {
                                        id_cantina: results.insertId,
                                        nome: req.body.nome,
                                        email: req.body.gmail
                                    }
                                }
                                return res.status(201).send(response);


                            });
                    });
                });




            }
        });

    });

});
router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        const query = "select * from cantina where gmail = ?";
        conn.query(query, [req.body.gmail], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) };
            if (results.length < 1) {
                return res.status(401).send({ messagem: "Falha na autenticação " });
            }

            if (req.body.senha === results[0].senha) {
                const id = results[0].id;
                const token = jwt.sign({
                        id_usuario: results[0].ID_cantina,
                        email: results[0].gmail,

                    },
                    process.env.SECRET, {
                        expiresIn: "24h"
                    });

                return res.status(200).send({
                    menssagem: "logado",
                    usuario: {
                        nome: results[0].nome,
                        gmail: results[0].gmail,
                        senha: results[0].senha
                    },
                    token: token

                });


            } else {
                return res.status(500).send({ menssagem: "Falha na autenticação " });
            }
        });
    });
});
module.exports = router;