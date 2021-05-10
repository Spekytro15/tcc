$(document).ready(function() {

    $('ul.tabs').tabs({ swipeable: 'false' })

    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $(document).ready(function() {
        $('.tooltipped').tooltip();
    });
    //Btns tela inicio
    $('#btn-entrar-tela-1').click(function() {
        $('#tela-1').hide();
        $('#tela-3').fadeIn("slow");

    })
    $('#btn-cadastro-tela-1').click(function() {
        $('#tela-1').hide();
        $('#tela-2').fadeIn("slow");
    })
    $('.btn-voltar-cad').click(function() {
            $('#tela-1').fadeIn("slow");
            $('#tela-2').hide();
            $('#tela-3').hide();
            $('#tela-4').hide();
            $('#tela-5').hide();

        })
        /* visibilidade creditos alunos */
    $("#open_visibili_creditos").click(function() {
        $("#creditos_atual").removeClass("enbacar");
        $("#open_visibili_creditos").hide();
        $("#close_visibili_creditos").show();
    })
    $("#close_visibili_creditos").click(function() {
        $("#creditos_atual").addClass("enbacar");
        $("#open_visibili_creditos").show();
        $("#close_visibili_creditos").hide();
    })

    /*----------------------------------*/
    $("#btn-insert-btn-tela-6").click(function() {
        $("#modal_creditos").modal("open");
    })

    $("#close-btn-insert-creditos").click(() => {
        $("#tela-6-add").hide();
    })
    $("#btn-insert-btn-tela-6").click(() => {
        $("#tela-6-add").hide();
    })
    $("#close-btn-lancar-creditos").click(function() {
            $("#tela-9").hide();
            $("#btn-insert-btn-tela-6").hide();
            $("#remove-li").html("");
            $("#remove-li").remove();

        })
        /* btn central voltar */
    $("#btn-voltar-central").click(() => {
        $('#tela-5').hide();
        $('#tela-6').hide();
        $('#tela-7').hide();
        $('#tela-8').hide();
        $('#tela-9').hide();
        $("#tela-6-add").hide();
        $("#btn-voltar-central").fadeOut("slow");
        $("#remove-li").remove();
        $(".produtosgeral").remove();
        $("#menu_tela_global").fadeIn("slow");
        $("#slide-out").show();
    })
});