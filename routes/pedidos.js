var express = require('express');
var router = express.Router();
var mysql = require("../cone").pool;


router.post('/cadastro', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query("INSERT INTO pedidos ( Id_produto, CPF_aluno, data_pedido,status,quantidade) VALUES ( ?, ?, ?,'Pendente', ?);", [req.body.ID_produto, req.body.CPF_aluno, req.body.data_pedido, req.body.quantidade],
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send({
                    menssagem: "Pedido_feito com sucesso aguarde confirmação",
                    ID_inserido: results.insertId

                })
            })
    })
})
router.get('/pedidos', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query("select * from  pedidos ORDER BY Id_pedido DESC;",
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null,
                        menssagem: "vazio"
                    });

                }
                res.status(201).send({
                    "pedido": results
                })
            })
    })
})
router.post('/update/:id', (req, res, next) => {
    var sql = "UPDATE cantina SET hora_atualiza =? WHERE gmail= '" + req.params.gmail + "';";
    var params = [req.body.hora];



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
                    menssagem: "hora configurada com sucesso!",


                })
            })

    })
})
module.exports = router;