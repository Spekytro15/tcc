let URL_aluno = "http://179.217.154.20:3000/alunos";


// cadastro aluno
$("#btn-entrar-login").click(function() {
    var cpf = $("#CPF_aluno").val();
    var senha = $("#senha_aluno").val();

    if (cpf == "" || senha == "") {
        M.toast({ html: 'Preencha todos os campos ' });
    } else {
        $.ajax({
                type: 'POST',
                url: URL_aluno + "/login",
                data: {
                    CPF: cpf,
                    senha: senha,
                },
                dataType: "json",
                success: function(json) {


                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#CPF_aluno").val("");
                    $("#senha_aluno").val("");
                    M.toast({
                        html: '<div class="toats_css" style="color:red; text-align: center;" >Falha na autenticação</div>',
                        classes: "transparent",
                    });


                }
            })
            .done(function(menssage) {
                if (menssage.menssagem == "logado") {

                    const token = menssage.token;
                    const CPF = menssage.usuario.cpf;
                    const senha = menssage.usuario.senha;
                    console.log(menssage.menssagem + " usuario: " + CPF)

                    db.transaction(function(tx) {
                        tx.executeSql('select * from usuario_aluno where CPF=?', [CPF], function(tx, rs) {
                            console.log(rs.rows);
                            if (rs.rows.length == 1) {
                                $('#tela-1').hide();
                                $('#tela-2').hide();
                                $('#tela-3').hide();
                                $('#tela-4').show();
                            } else {
                                tx.executeSql("INSERT INTO usuario_aluno(CPF,token, senha) VALUES (?,?,?)", [CPF, token, senha], onSuccess, onError);
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


    }

});
//add creditos