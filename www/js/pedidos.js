/*const url_pedidos = "http://179.217.154.20:3000/pedidos/";
const url_alunos = "http://179.217.154.20:3000/alunos/";
const url_produtos = "http://179.217.154.20:3000/produtos/procurar/";



function pedidos() {
    $.get(url_pedidos + "/pedidos/", function(data) {
        var pedido = data.pedido;
        console.log(window.produtos_carregados)
        for (linha = 0; linha < pedido.length; linha++) {

            var Id_pedido = data.pedido[linha].Id_pedido;
            var Id_produto = data.pedido[linha].Id_produto;
            var CPF_aluno = data.pedido[linha].CPF_aluno;
            var status_pedido = data.pedido[linha].status;
            var quantidade = data.pedido[linha].quantidade;

            $.get(url_alunos + "/alunos/" + CPF_aluno, function(data) {

                for (linha = 0; linha < data.length; linha++) {
                    console.log(data[linha].id_aluno);

                }

            });


        }
    });

}
setInterval(function() { pedidos() }, 10000);
*/


//-$("#pedidos-feitos-ul").html(' <li class="collection-item avatar pedidos_edit"><img width="30" src=""alt="" class="circle"><span class="title">mateus</span><p>coxinha de carne </p><p>detalhes pedido</p><button class=" btn  red accent-2"><i class="material-icons">clear</i></button><button href="#!" class="btn "><i class="material-icons">check</i></button></li>');