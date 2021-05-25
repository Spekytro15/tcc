var express = require('express');
var router = express.Router();
var mysql = require("../cone").pool;
var login = require("../middleware/login");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const multer = require("multer");
const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/alunos/')
        },
        filename: function(req, file, cb) {
            cb(null, new Date().toDateString() + file.originalname)

        }
    })
    //filtros 
const filefilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
    //upload limitando tamanho e add os filtros
const upload = multer({
    storage: storage,

    fileFilter: filefilter
});


router.post('/cadastro', upload.single('img_aluno'), (req, res, next) => {
    var sql = "INSERT INTO alunos ( nome, CPF,senha,foto) VALUES ( ?, ?, ?,? )";
    console.log(sql)
    var params = [req.body.nome, req.body.cpf, req.body.senha];
    if (req.file !== undefined) {
        params.push(req.file.path);
    }
    if (req.file === undefined) {
        params.push(req.body.foto);
    }

    console.log(req.file);

    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        menssagem: error.sqlMessage,

                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "Aluno cadastrado com sucesso !",
                    ID_inserido: results.insertId

                })
            })

    })
});
router.get('/alunos/:cpf', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query("select * from alunos where CPF = ? ", [req.params.cpf],
            (error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send(results)
            })

    })

})

router.post('/creditos/:cpf', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query("update alunos set creditos = ? where CPF = ? ", [req.body.creditos, req.params.cpf],
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send({
                    menssagem: "Creditos lançados com Sucesso ",
                    aluno: req.params.cpf,
                    valor: req.body.creditos

                })
            })

    })
});

router.get('/:id', function(req, res, next) {
    mysql.getConnection((error, conn) => {
        conn.query("select * from alunos where CPF = ?", [req.params.id], (error, results, field) => {
            conn.release();

            if (results == []) {
                res.send({
                    menssagem: "produto não encontrado"

                })
            } else {
                res.send(results)
            }
        })

    })
})


router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        const query = "select * from alunos where CPF = ?";
        conn.query(query, [req.body.CPF], (error, results, fields) => {
            conn.release();

            if (error) { return res.status(500).send({ error: error }) };
            if (results.length < 1) {
                return res.status(401).send({ menssagem: "Falha na autenticação " });
            }

            if (req.body.senha === results[0].senha) {
                const id = results[0].id_aluno;
                const token = jwt.sign({
                        id_usuario: results[0].id_aluno,
                        email: results[0].CPF,

                    },
                    process.env.SECRET, {
                        expiresIn: "24h"
                    });

                return res.status(200).send({
                    menssagem: "logado",
                    usuario: {
                        nome: results[0].nome,
                        cpf: results[0].CPF,
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

router.post('/foto/:id', upload.single('img_aluno_1'), (req, res, next) => {

    var sql = "UPDATE alunos SET foto=? WHERE CPF = '" + req.params.id + "';";
    var params = [];
    if (req.file !== undefined) {
        params.push(req.file.path);
    }



    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "cadastro de imagem aluno",


                })
            })

    })
})
module.exports = router;