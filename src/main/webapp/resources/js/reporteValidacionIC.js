$(document).ready(function () {

    var $chk = $("#grpChkBox input:checkbox");
    var $tbl = $("#datosInformeContable");
    $chk.prop('checked', false);
    $chk.click(function () {
        var colToHide = $tbl.find("." + $(this).attr("name"));
        $(colToHide).toggle();
    });

    var dialogoDescarga = $('#dialogoDescarga').dialog({
        autoOpen: false,
        closeOnEscape: false,
        resizable: false,
        draggable: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    });

    $('#progressbar').progressbar({
        value: false
    });

    $('#excel').click(function () {

        dialogoDescarga.dialog('open');

        var idFileUp = $('#idArchivo').val();

        $.fileDownload('downExcelIC?idFileUp=' + idFileUp, {
            successCallback: function (url) {
                dialogoDescarga.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                dialogoDescarga.dialog('close');
                console.log(responseHtml);
                $.confirm({
                    title: 'Disculpa las molestias...',
                    content: "Ha ocurrido un error interno en el servidor",
                    type: 'red',
                    typeAnimated: true,
                    boxWidth: '30%',
                    useBootstrap: false,
                    buttons: {
                        close: {
                            text: 'Cerrar',
                            action: function () {
                            }
                        }
                    }
                });
            }
        });
    });

    $('#excelVer').click(function () {

        dialogoDescarga.dialog('open');

        var idFileUp = $('#idArchivo').val();

        $.fileDownload('downExcelVerIC?idFileUp=' + idFileUp, {
            successCallback: function (url) {
                dialogoDescarga.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                dialogoDescarga.dialog('close');
                console.log(responseHtml);
                $.confirm({
                    title: 'Disculpa las molestias...',
                    content: "Ha ocurrido un error interno en el servidor",
                    type: 'red',
                    typeAnimated: true,
                    boxWidth: '30%',
                    useBootstrap: false,
                    buttons: {
                        close: {
                            text: 'Cerrar',
                            action: function () {
                            }
                        }
                    }
                });
            }
        });
    });
});