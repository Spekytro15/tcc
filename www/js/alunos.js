let getAlunos = "http://179.217.154.20:3000/";

function atualizar_telas_get() {
    var link = getAlunos + "alunos/alunos/"
    var cpf = $("#search-creditos-get-aluno").val();
    console.log(link + cpf)
    if (cpf.length === 0) {

        M.toast({
            html: '<div class="toats_css">Digite um CPF</div>',
            classes: "transparent",
        })
    } else {

        $.get(link + cpf, function(data) {
            for (linha = 0; linha < data.length; linha++) {

                var img = getAlunos + data[linha].foto
                window.creditos = data[linha].creditos
                $("#tela-5").append('<li id="remove-li"><div id="remove-li"class="card"> <ul class="collection"><li class="collection-item avatar"><img   ; src="' + img + '"alt="" width="100" class="circle"><span class="title">' + data[linha].nome + '</span><p> CPF : ' + data[linha].CPF + '</p><p>Creditos :</p><p class="text-credidos"> ' + data[linha].creditos + ' R$</p><input name="valor_atual" style="display:none" type="hidden" value="' + data[linha].creditos + '"></li></ul></div></li>');


            }
        });
    }


}


$("#btn-lancar-creditos").click(function() {;

    atualizar_telas_get();
});

// cadastro aluno
$("#btn-cadastro-aluno").click(function() {
    var nome = $("#nome-aluno").val();
    var cpf = $("#cpf-aluno").val();
    var senha = $("#senha-aluno").val();

    var img = "uploads/alunos/avatar.jpg";
    if (nome == "" || cpf == "" || senha == "") {
        M.toast({ html: 'Preencha todos os campos ' });
    } else {
        $.ajax({
                type: 'POST',
                url: getAlunos + "alunos/cadastro",
                data: {
                    nome: nome,
                    cpf: cpf,
                    senha: senha,
                    foto: img

                },
                dataType: "json",
                success: function(json) {
                    $("#sucess").html("<p>" + json.menssage + "</p>");


                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#error").html();
                    console.log(jqXHR)


                }


            })
            .done(function(menssage) {
                $("#nome_produto").val("");
                $("#descricao_produto").val("");
                $("#preco_produto").val("");

            });
    }

});
//add creditos

$("#btn-inset-creditos").click(function() {
    var cpf = $("#search-creditos-get-aluno").val();
    var valor_creditos = $("#input-insert-creditos").val();

    var n1 = parseInt(valor_creditos);
    var n2 = parseInt(window.creditos);
    var soma = n1 + n2;
    $.ajax({
            type: 'POST',
            url: getAlunos + "alunos/creditos/" + cpf,
            data: {
                creditos: soma,
                cpf: cpf,


            },
            dataType: "json",
            success: function(json) {
                $("#sucess").html("<p>" + json.menssage + "</p>");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#error").html();
                console.log(jqXHR)
            }
        })
        .done(function(menssage) {
            M.toast({
                html: '<div class="toats_css">' + menssage.menssagem + '</div>',
                classes: "transparent",
            })

            atualizar_telas_get();
        });
});