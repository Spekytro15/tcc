$("#btn-cadastro-cantina").click(function() {
    var nome = $("#nome ").val();
    var email = $("#email ").val();
    var senha = $("#senha").val();
    $.ajax({
            type: 'POST',
            url: "http://179.217.154.20:3000/cantina/cadastro",
            data: {
                nome: nome,
                gmail: email,
                senha: senha

            },
            dataType: "json",
            success: function(json) {
                $("#sucess").html("<p>" + json.menssage + "</p>");


            },
            error: function() {
                $("#error").html("<p>Cantina já cadastrada</p>");
                console.log("error")


            }


        })
        .done(function(menssage) {
            M.toast({ html: "<span >" + menssage.menssagem + "<span>" })
        });
})
$("#btn-entrar-login").click(function() {

    var email = $("#email_cantina ").val();
    var senha = $("#senha_cantina").val().trim();
    $.ajax({
            type: 'POST',
            url: "http://179.217.154.20:3000/cantina/login",
            data: {
                gmail: email,
                senha: senha
            },
            dataType: "json",
            success: function(json) {
                $("#sucess").html("<p>" + json.menssage + "</p>");
            },
            error: function() {
                $("#error").html("<p>Cantina já cadastrada</p>");
                M.toast({ html: "<span> Email ou senha incorreto <span>" })
            }
        })
        .done(function(menssage) {
            if (menssage.menssagem == "logado") {

                const token = menssage.token;
                const nome = menssage.usuario.nome;
                const gmail = menssage.usuario.gmail;
                const senha = menssage.usuario.senha;
                console.log(menssage.menssagem + " usuario: " + nome)

                db.transaction(function(tx) {
                    tx.executeSql('select * from usuario where email=?', [gmail], function(tx, rs) {
                        console.log(rs.rows);
                        if (rs.rows.length == 1) {
                            $('#tela-1').hide();
                            $('#tela-2').hide();
                            $('#tela-3').hide();
                            $('#tela-4').show();
                        } else {
                            tx.executeSql("INSERT INTO usuario(name, email,token, senha) VALUES (?,?,?,?)", [nome, gmail, token, senha], onSuccess, onError);
                            $('#tela-1').hide();
                            $('#tela-2').hide();
                            $('#tela-3').hide();
                            $('#tela-4').show();
                        }




                    }, function(tx, error) {
                        console.log('SELECT error: ' + error.message);
                    });
                }, function(error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function() {
                    console.log('Populated database OK');
                });


                function onSuccess(transaction, resultSet) {
                    console.log('Query completed: ' + JSON.stringify(resultSet));
                }

                function onError(transaction, error) {
                    console.log('Query failed: ' + error.message);
                }

            }
        })






});