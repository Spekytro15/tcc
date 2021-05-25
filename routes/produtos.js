var express = require('express');
var router = express.Router();
//conexão banco de dados
var mysql = require("../cone").pool;
// uploads
const multer = require("multer");
var login = require("../middleware/login");
//---


const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/produtos/')
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


router.get('/', function(req, res, next) {

    mysql.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error,
                reponse: null
            })
        } else {

            conn.query("select * from  produto ORDER BY ID_produto DESC;", (error, results, field) => {
                conn.release();
                res.send(results);


            })
        }



    })
})
router.get('/procurar/:id', function(req, res, next) {

    mysql.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error,
                reponse: null
            })
        } else {

            conn.query("select * from  produto  where ID_produto =? ;", [req.params.id], (error, results, field) => {
                conn.release();

                if (error) {
                    res.status(500).send("não encontrado");
                }
                res.status(200).send(results);

            })
        }



    })
})
router.post('/update/:id', upload.single('produto_img_update'), (req, res, next) => {
    var sql = "UPDATE produto SET nome = ? ,preco = ?,descricao = ?,quantidade = ? WHERE ID_produto = '" + req.params.id + "';";
    var params = [req.body.nome, req.body.preco, req.body.descricao, req.body.quantidade];



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
                    menssagem: "Produto atualizado com sucesso!",


                })
            })

    })
})
router.post('/cadastrar', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query("INSERT INTO produto ( nome, preco, descricao,foto) VALUES ( ?, ?, ?, 'uploads/produtos/logotipo.png');", [req.body.nome, req.body.preco, req.body.descricao],
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send({
                    menssagem: "Produto Inserido com Sucesso !",
                    ID_inserido: results.insertId

                })
            })

    })
});
router.get('/select/:id', function(req, res, next) {
    mysql.getConnection((error, conn) => {
        conn.query("select * from produto where ID_produto = ?", [req.params.id], (error, results, field) => {
            conn.release();

            if (results == []) {
                res.status(500).send({
                    menssagem: "Produto não encontrado",
                })
            } else {
                res.status(201).send({
                    menssagem: "Seu produto",
                    inf: {
                        "nome": results[0].nome,
                        "preco": results[0].preco,
                        "descricao": results[0].descricao,
                        "foto": results[0].foto,
                        "quantidade": results[0].quantidade
                    }
                })
            }
        })

    })
})


router.delete('/deletar/:id', function(req, res, next) {
    console.log(req.file)
    mysql.getConnection((error, conn) => {
        conn.query("DELETE FROM produto where ID_produto = ? ;", [req.params.id],
            (error, results, field) => {
                conn.release();
                if (error) {

                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send({
                    menssagem: "deletado",


                })
            })
    })
})

router.post('/foto/:id', upload.single('produto_img_2'), (req, res, next) => {

    var sql = "UPDATE produto SET foto=? WHERE ID_produto = '" + req.params.id + "';";
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
                    menssagem: "cadastro de imagem",


                })
            })

    })
})

router.delete('/delete/:id', (req, res, next) => {

    var sql = "DELETE from produto WHERE ID_produto = '" + req.params.id + "';";
    var params = [];
    if (req.file !== undefined) {
        params.push(req.file.path);
    }
    if (req.file === undefined) {
        params.push(req.body.foto);
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
                    menssagem: "DELETADO COM SUCESSO",


                })
            })

    })
})


module.exports = router;