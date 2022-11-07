<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: kibernum
  Date: 2020-11-10
  Time: 00:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources/img" var="images"/>
<spring:url value="/resources/js" var="js"/>
<spring:url value="/resources/css" var="css"/>
<link type="text/css" href="${css}/bootstrap.css" rel="stylesheet"/>

<script type="text/javascript" src="${js}/popper.min.js"></script>
<script type="text/javascript" src="${js}/bootstrap.min.js"></script>
<div class="py-1">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label><strong>TIPO DE INFORME</strong></label>
                    <select class="form-control" id="cbTipoInformesPopup">
                        <option value="-1">Seleccione Tipo de Informe</option>
                        <c:forEach var="inf" items="${listaTipoInformes}">
                            <option value="${inf.codigo}">${inf.nombre}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>
        </div>
        <div id="divInformesEnviar">
            <div class="row mt-4">
                <div class="col-md-12 justify-content-center d-flex">
                    <button type="button" class="btn btn-primary" onclick="closeDialogEnvioInforme();">Volver</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="dialogAlertEnvInf" title="Envio de Informes">
</div>
<script>
    var dialogAlertEnvInf;

    $(document).ready(function () {

        dialogAlertEnvInf = $('#dialogAlertEnvInf').dialog({
            autoOpen: false,
            modal: true,
            buttons: {
                Aceptar: function() {
                    $( this ).dialog( "close" );
                }
            }
        });

        $('#cbTipoInformesPopup').change(function () {
            var codTipoInforme = $('#cbTipoInformesPopup option:selected').val();
            var divInformesEnviar = $('#divInformesEnviar');

            if (codTipoInforme !== "-1") {
                var idEjercicio = $('#cbEjercicio option:selected').val();

                var postData = {
                    idEjercicio : idEjercicio,
                    tpInforme: codTipoInforme
                };

                $.post('./informes/showInforContSend', postData).done(function (data) {
                    divInformesEnviar.html(data);
                    dialogEnvioInformes.dialog('option', 'position', 'center');
                });
            } else {
                divInformesEnviar.html('<div class="row mt-4">' +
                    '<div class="col-md-12 justify-content-center d-flex">' +
                    '<button type="button" class="btn btn-primary" onclick="closeDialogEnvioInforme();">Volver</button>' +
                    '</div>' +
                    '</div>');
            }
        });
    });
</script>
