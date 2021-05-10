$(document).ready(function() {

    $('ul.tabs').tabs({ swipeable: 'false' })

    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.modal').modal();

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




    /* cadastrar aluno  */
    $("#cadastrar-aluno-btn-tela-5").click(() => {
        $('#close-produtos').show();
        $('#title-produtos').show();
        $('#tela-6').show();
        $('#input-buscar-add-creditos').hide();
        $("#btn-lancar-creditos").hide();
        $('#menu_tela_global').show();
        $('#tela-5').hide();
        $('#tela-7').hide();
        $('#tela-8').hide();
        $('#tela-9').hide();
        $("#btn-voltar-central").fadeIn("slow");
        $("#slide-out").hide();
        $("#menu_tela_global").hide();

    })

    /* btn lançar creditos */
    $("#btn-cadastrar-creditos").click(function() {
        $('#tela-5').show();
        $("#btn-lancar-creditos").show();
        $("#tela-9").fadeIn("slow");
        $("#close-btn-lancar-creditos").hide();
        $("#btn-voltar-central").fadeIn("slow")
        $('#tela-6').hide();
        $('#tela-7').hide();
        $('#tela-8').hide();
        $("#slide-out").hide();
        $("#menu_tela_global").hide();

    })
    $("#btn-insert-btn-tela-6").click(function() {
        $("#modal_creditos").modal("open");
    })

    $("#close-btn-insert-creditos").click(() => {
        $("#tela-6-add").hide();
    })
    $("#btn-insert-btn-tela-6").click(() => {
        $("#tela-6-add").hide();
    })
    $("#btn-lancar-creditos").click(() => {
        $("#tela-7").hide();
        $("#btn-insert-btn-tela-6").fadeIn("slow");
        $("#btn-lancar-creditos").hide();
        $("#close-btn-lancar-creditos").show();
    })
    $("#close-btn-lancar-creditos").click(function() {
        $("#tela-9").hide();
        $("#btn-insert-btn-tela-6").hide();
        $("#remove-li").html("");
        $("#remove-li").remove();

    })

    /* btn cadastrar produto */

    $("#btn-cadastrar-produto").click(() => {
            $("#tela-8").fadeIn("slow");
            $("#btn-voltar-central").fadeIn("slow")
            $('#tela-5').hide();
            $('#tela-6').hide();
            $('#tela-7').hide();
            $('#tela-9').hide();
            $("#menu_tela_global").hide();

            $("#slide-out").hide();
        })
        /* btn mostrar produto */
    $("#btn-mostrar-produto").click(() => {
            $("#tela-7").fadeIn("slow");
            $("#btn-voltar-central").fadeIn("slow")
            $('#tela-5').hide();
            $('#tela-6').hide();
            $('#tela-8').hide();
            $('#tela-9').hide();
            $("#menu_tela_global").hide();
            produtos_get();
            $("#slide-out").hide();

        })
        /* editar produtos */


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