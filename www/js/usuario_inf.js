$.get(produtos, function(data) {

    for (linha = 0; linha < data.length; linha++) {

        $("#resposta").append("<li class='produtosgeral'  id='li-remove-" + data[linha].ID_produto + "' style='list-style:none; margin:5vh;'><div class='card'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='http://179.217.154.20:3000/" + data[linha].foto + "' whidth='30'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + data[linha].nome + " " + data[linha].preco + " <i class='material-icons right'>more_vert</i></span><p><a onclick='btneditarproduto(" + data[linha].ID_produto + ")' class='btn left' href='#''><i  class='material-icons'>create</i></a><a id='btn-deletar-produto' href='#' onclick='deleteproduto(" + data[linha].ID_produto + ")'  class='btn right red'><i class='material-icons'>delete</i></a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4 rigth'>" + data[linha].nome + " " + data[linha].preco + "<i class='material-icons right'>close</i></span> <p> " + data[linha].descricao + "</p> </div> </div></li> ");
    }

});