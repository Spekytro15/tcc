const produtos = "http://179.217.154.20:3000/produtos";




function produtos_get() {

    $.get(produtos, function(data) {

        for (linha = 0; linha < data.length; linha++) {

            $("#resposta").append("<li class='produtosgeral'  id='li-remove-" + data[linha].ID_produto + "' style='list-style:none; margin:5vh;'><div class='card'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='http://179.217.154.20:3000/" + data[linha].foto + "' whidth='30'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + data[linha].nome + " " + data[linha].preco + " <i class='material-icons right'>more_vert</i></span><p><a onclick='btneditarproduto(" + data[linha].ID_produto + ")' class='btn left' href='#''><i  class='material-icons'>create</i></a><a id='btn-deletar-produto' href='#' onclick='deleteproduto(" + data[linha].ID_produto + ")'  class='btn right red'><i class='material-icons'>delete</i></a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4 rigth'>" + data[linha].nome + " " + data[linha].preco + "<i class='material-icons right'>close</i></span> <p> " + data[linha].descricao + "</p> </div> </div></li> ");
        }

    });

}

function deleteproduto(id) {
    $("#li-remove-" + id).detach();
    $.ajax({
            type: 'DELETE',
            url: produtos + "/delete/" + id,
            dataType: "json",
            success: function(json) {

            },
            error: function() {
                console.log("error")
            }
        })
        .done(function(menssage) {

            $("#modal_deletar").modal("open");
        })
}




function btneditarproduto(id) {
    $("#modal_editar").modal("open");
    $.ajax({
            type: 'GET',
            url: produtos + "/select/" + id,
            dataType: "json",
            success: function(json) {

            },
            error: function() {
                console.log("error")
            }
        })
        .done(function(menssage) {
            $("#modal_editar").html('<div class="modal-content"><input id="id_produto_atualizar" type="hidden" value="' + id + '"><a class="modal-close right "style="color: #00BFA6;"><i class="material-icons">close</i></a><h4 style="font-size: 14pt;">Atualizar dados do produto</h4><p><input id="input-update-nome-produto" value="' + menssage.inf.nome + '" style="margin-left: 1vh;"  class="col s5" type="text" placeholder="Nome Produto"></p><p><input id="input-update-descricao-produto" value="' + menssage.inf.descricao + '" style="margin-left: 1vh;" class="col s5" type="text" placeholder="Descrição"></p><p><input id="input-update-preco-produto" value="' + menssage.inf.preco + '" class="col s5" type="text" placeholder="Preço"></p><p><img src="http://179.217.154.20:3000/' + menssage.inf.foto + '"" width="0" alt=""></p>   <div class="input-field col s12"><button onclick="camera_upload(' + id + ')" class="btn left"><i class="material-icons">add_a_photo</i></button><button onclick="galeria(' + id + ')" class="btn right"><i class="material-icons">add_to_photos</i></button><div><p id="msg-local-ft"></p></div> </div><div class="modal-footer"><a href="#!" style="margin-right:7vh" onclick="btnupdateproduto(' + id + ')" class="modal-close waves-effect waves-green  btn"><i class="material-icons">check</i></a></div>');
        })
}


function btnupdateproduto(id) {


    var nome = $("#input-update-nome-produto").val();
    var descricao = $("#input-update-descricao-produto").val();
    var preco = $("#input-update-preco-produto").val();
    if (nome == "" || descricao == "" || preco == "") {
        M.toast({ html: 'Preencha todos os campos ' });
    } else {
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozNywiZW1haWwiOiJtYXRldXNsQGdtYWlsLmNvbSIsImlhdCI6MTYxODk1MTY3MiwiZXhwIjoxNjE5MDM4MDcyfQ.ru-Xc5Z7I2pS_BrwxYsUbL78hIMg5cio_lLop8Wcjbg";
        $.ajax({
                type: 'POST',
                url: produtos + "/update/" + id,
                data: {
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    token: token
                },
                dataType: "json",
                success: function(json) {
                    console.log("tudo ok")
                },
                error: function() {
                    console.log("error")
                }
            })
            .done(function(menssage) {
                $("#li-remove-" + id).remove();


                $(".produtosgeral").remove();
                $("#menu_tela_global").fadeIn("slow");
                $("#slide-out").show();
                $.get(produtos + "/procurar/" + id, function(data) {

                    for (linha = 0; linha < data.length; linha++) {
                        $("#resposta").append("<li class='produtosgeral' id='li-remove-" + data[linha].ID_produto + " ' style='list-style:none; margin:5vh;'><div class='card'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='http://179.217.154.20:3000/" + data[linha].foto + "' whidth='30'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + data[linha].nome + " " + data[linha].preco + " <i class='material-icons right'>more_vert</i></span><p><a onclick='btneditarproduto(" + data[linha].ID_produto + ")' class='btn left' href='#''><i  class='material-icons'>create</i></a><a id='btn-deletar-produto' href='#'  class='btn right red'><i class='material-icons'>delete</i></a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4 rigth'>" + data[linha].nome + " " + data[linha].preco + "<i class='material-icons right'>close</i></span> <p> " + data[linha].descricao + "</p> </div> </div></li> ");
                    }

                });



            })
    }
}

$("#btn-cadastro-produto").click(() => {

    var nome = $("#nome_produto").val();
    var descricao = $("#descricao_produto").val();
    var preco = $("#preco_produto").val();
    var foto = "produto.png"
    if (nome == "" || descricao == "" || preco == "") {
        M.toast({ html: 'Preencha todos os campos ' });
    } else {
        $.ajax({
                type: 'POST',
                url: produtos + "/cadastrar",
                data: {
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    foto: foto

                },
                dataType: "json",
                success: function(json) {
                    console.log("tudo ok")
                },
                error: function() {
                    console.log("error")
                }
            })
            .done(function(menssage) {
                produtos_get();
                $("#nome_produto").val("");
                $("#descricao_produto").val("");
                $("#preco_produto").val("");


                M.toast({ html: 'Produto Cadastrado com sucesso ' });

            })
    }
})

function camera_upload(id) {
    navigator.camera.getPicture(takephoto, function(message) {
        M.toast({ html: 'Foto não capiturada' });

    }, {
        quality: 80,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        targetWidth: 300,
        targetHeight: 400
    });

    function takephoto(imgURI) {
        document.getElementById('msg-local-ft').textContent = "Foto selecionada";
        var options = new FileUploadOptions();
        options.fileKey = "produto_img_2";
        options.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.httpMethod = 'POST';

        var ft = new FileTransfer();
        ft.upload(imgURI, encodeURI(produtos + "/foto/" + id), function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(JSON.stringify(error));
        }, options);

    }
}





function galeria(id) {
    navigator.camera.getPicture(uploadPhoto, function(message) {
        M.toast({ html: 'Foto não selecionada' });
    }, {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });

    function uploadPhoto(imgURI) {
        document.getElementById('msg-local-ft').textContent = "Foto selecionada";
        var options = new FileUploadOptions();
        options.fileKey = "produto_img_2";
        options.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.httpMethod = 'POST';
        var params = new Object();
        options.chunkedMode = false;


        var ft = new FileTransfer();
        ft.upload(imgURI, encodeURI(produtos + "/foto/" + id), function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(JSON.stringify(error));
        }, options);
    }
}