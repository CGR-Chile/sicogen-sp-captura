<%--
  Created by IntelliJ IDEA.
  User: kibernum
  Date: 13-08-20
  Time: 09:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>Ver Informe Contable</title>

    <spring:url value="/resources/css/" var="styles"/>
    <spring:url value="/resources/img/" var="images"/>
    <spring:url value="/resources/js/" var="scripts"/>

    <link type="text/css" href="${styles}rv.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}system.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}template.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}tipr/tipr.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}data-tables/jquery.dataTables.min.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}jquery-confirm/3.3.2/jquery-confirm.min.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}jquery-ui.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}reporteValidacion/cssInformeBase.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}mensaje/jquery.alerts.css" rel="stylesheet"/>

    <script type="text/javascript" src="${scripts}jquery/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="${scripts}tipr/tipr.min.js"></script>
    <script type="text/javascript" src="${scripts}data-tables/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${scripts}jquery.fileDownload.js"></script>
    <script type="text/javascript" src="${scripts}jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="${scripts}jquery-ui.js"></script>
    <script type="text/javascript" src="${scripts}reporteValidacionIC.js"></script>
    <style type="text/css">
        .contenedor {
            width: 90%;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
<div class="contenedor">
    <table class="adminlist">
        <thead>
        <tr style="height: 120px;">
            <td class="sicogenlogo" colspan="6"><img src="${images}sicogenii_logo.png" style="height:96px;width:322px;"/></td>
        </tr>
        <tr></tr>
        <tr style="background-color: #d7d7d9;text-align:center;">
            <td colspan="3" class="title-rv">INFORME CONTABLE</td>
        </tr>
        <tr style="height: 118px;">
            <td style="width:100%">
                <table class="adminlist" width="100%">
                    <thead>
                    <tr>
                        <td colspan="20" class="title-grid"><div align="center"><span class="Estilo11"><b>Informaci??n General</b></span></div></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="row0">
                        <td style="width: 20%;"><strong>ESTADO DE VALIDACI??N</strong></td>
                        <td>${infoGeneralRV.estado}</td>
                    </tr>
                    <tr class="row1">
                        <td><strong>TIPO DE INFORME</strong></td>
                        <td>${infoGeneralRV.tipoInforme}</td>
                    </tr>
                    <tr class="row0">
                        <td><strong>INFORME</strong></td>
                        <td>${infoGeneralRV.informe}</td>
                    </tr>
                    <tr class="row1">
                        <td><strong>PER??ODO</strong></td>
                        <td>${infoGeneralRV.periodo}</td>
                    </tr>
                    <tr class="row0">
                        <td><strong>EJERCICIO</strong></td>
                        <td>${infoGeneralRV.ejercicio}</td>
                    </tr>
                    <tr class="row1">
                        <td><strong>USUARIO</strong></td>
                        <td>${infoGeneralRV.usuario}</td>
                    </tr>
                    <tr class="row0">
                        <td><strong>ENTIDAD</strong></td>
                        <td>${infoGeneralRV.entidad}</td>
                    </tr>
                    </tbody>
                </table>
                <input type="hidden" id="idFile" value="${idFileUp}"/>
            </td>
        </tr>
        </thead>
    </table>
    <table class="adminlist">
        <thead>
        <tr>
            <td colspan="20" class="title-grid"><div align="center"><span class="Estilo11"><b>Detalle de Archivo Cargado</b></span></div></td>
        </tr>
        </thead>
        <tbody>
        <tr class="row0">
            <td style="width: 20%;"><strong>INFORME</strong></td>
            <td>${datosInforme.uuid}</td>
        </tr>
        <tr class="row1">
            <td><strong>PARTIDA</strong></td>
            <td>${datosInforme.partida}</td>
        </tr>
        <tr class="row0">
            <td><strong>CAP??TULO</strong></td>
            <td>${datosInforme.capitulo}</td>
        </tr>
        <tr class="row1">
            <td><strong>RUT</strong></td>
            <td>${datosInforme.rut}</td>
        </tr>
        </tbody>
    </table>
    <br/>
    <br/>
    <c:if test="${datosInforme.errorEsquema eq 0}">
        <table class="tablaCuentas showHideColumns">
            <thead>
            <tr>
                <th>Mostrar/Ocultar Columnas: </th>
            </tr>
            </thead>
            <tbody>
            <table id="grpChkBox" class="tablaCuentas showHideColumns">
                <tr>
                    <td><input type="checkbox" name="8y9" /><strong>"C??digo BIP" y "Denominaci??n Proyecto"</strong><input type="checkbox" name="dh" /><strong>"Debe y Haber (USD)"</strong></td>
                </tr>
            </table>
            </tbody>
        </table>
        <br/>
        <table id="datosInformeContable" class="display tablaCuentas" style="width: 100%">
            <thead>
            <tr>
                <th style=" display:none;">Estado</th>
                <th>Programa</th>
                <th>??rea Transaccional</th>
                <th style="min-width: 50px;">Moneda</th>
                <th style="min-width: 50px;">Movim.</th>
                <th style="min-width: 130px;">Cuenta Contable</th>
                <th class="8y9" style="min-width: 100px; display:none;">C??digo BIP</th>
                <th class="8y9" style="min-width: 200px; display:none;">Denominaci??n Proyecto</th>
                <th>Debe CLP</th>
                <th>Haber CLP</th>
                <th class="dh" style=" display:none;">Debe USD</th>
                <th class="dh" style=" display:none;">Haber USD</th>
                <th style="min-width: 350px;">Denominaci??n Cuenta</th>
                <th>Folio Contable</th>
                <th>Tipo Transacci??n</th>
                <th>Cuenta Presupestaria</th>
            </tr>
            </thead>
        </table>
    </c:if>

    <div style="text-align:center;width:100%">
        <div id="contBotones">
            <hr class="separador"/>
            <button id="excelVer" class="boton">Excel</button>
            <button id="cerrar" class="boton" onClick="window.close()">Salir</button>
        </div>
        <div id="pie" class="Pauta_texto">
            <span>Teatinos 56 , Santiago de Chile, Tel&eacutefono 56-2 24021100 -&nbsp;C&oacutedigo Postal: 8340521</span></br>
            <span id="reqmin">Sitio web optimizado para ser visualizado en una resoluci??n de pantalla de 1024 x 768 p??xeles, en los navegadores iExplorer 10 o superior, Firefox 3.6 o superior y Chrome 8 o superior</span>
        </div>
    </div>

</div>
<input id="idArchivo" value="${idArchivo}" style="display: none;"/>
<div id="dialogoDescarga" title="Generando documento...">
    <div class="progress-label" style="margin-top: 5%"><strong>Este proceso puede durar varios segundos...</strong></div>
    <div id="progressbar"></div>
</div>
</body>
<script>
    if ($('#datosInformeContable').length) {
        $('#datosInformeContable').DataTable({
            "pagingType": "full_numbers",
            "searching": false,
            "ordering": false,
            "processing": true,
            "serverSide": true,
            "fnDrawCallback": function (oSettings) {
                $('.detalleError').tipr({
                    'alt': false,
                    'marginAbove': -65,
                    'marginBelow': 7,
                    'mode': 'above',
                    'space': 70,
                    'speed': 300
                });
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                if ($('input[name = "8y9"]').is(':checked')) {
                    $('td:eq(5)', nRow).attr("style", "text-align: center;");
                    $('td:eq(6)', nRow).attr("style", "text-align: center;");
                } else {
                    $('td:eq(5)', nRow).attr("style", "text-align: center; display: none;");
                    $('td:eq(6)', nRow).attr("style", "text-align: center; display: none;");
                }

                if ($('input[name = "dh"]').is(':checked')) {
                    $('td:eq(9)', nRow).attr("style", "text-align: right;");
                    $('td:eq(10)', nRow).attr("style", "text-align: right;");
                } else {
                    $('td:eq(9)', nRow).attr("style", "text-align: right; display: none;");
                    $('td:eq(10)', nRow).attr("style", "text-align: right; display: none;");
                }

                $('td:eq(2)', nRow).attr("style", "width: 15px; text-align: center;");
                $('td:eq(3)', nRow).attr("style", "width: 15px; text-align: center;");
                $('td:eq(4)', nRow).attr("style", "width: 100px; text-align: center;");
                $('td:eq(5)', nRow).addClass("8y9");
                $('td:eq(6)', nRow).addClass("8y9");
                $('td:eq(7)', nRow).attr("style", "text-align: right;");
                $('td:eq(8)', nRow).attr("style", "text-align: right;");
                $('td:eq(9)', nRow).addClass("dh");
                $('td:eq(10)', nRow).addClass("dh");
                $('td:eq(14)', nRow).attr("style", "width: 100px; text-align: center;");
            },
            "ajax": {
                "url": "/sicogen-mf/seguimiento/datosPaginacion",
                "method": "POST",
                "data": function (d) {
                    d.idArchivo = $('#idArchivo').val();
                }
            },
            "columns": [
                {"data": "programa"},
                {"data": "areaTransaccional"},
                {"data": "moneda"},
                {"data": "movimiento"},
                {"data": "cuentaContable"},
                {"data": "codigoBIP"},
                {"data": "denominacionProyecto"},
                {"data": "debeCLP"},
                {"data": "haberCLP"},
                {"data": "debeUSD"},
                {"data": "haberUSD"},
                {"data": "denominacionCuenta"},
                {"data": "folioContable"},
                {"data": "tipoTransaccion"},
                {"data": "cuentaPresupuestaria"},
            ],
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ning??n dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "??ltimo",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    }

</script>
</html>