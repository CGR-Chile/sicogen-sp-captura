<%@ page contentType="text/html;charset=UTF-8;" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8;"/>
    <title>Contraloria General de la República</title>

    <spring:url value="/resources/css/system.css" var="system"/>
    <spring:url value="/resources/css/template.css" var="template"/>
    <spring:url value="/resources/css/rounded.css" var="rounded"/>
    <spring:url value="/resources/css/nyroModal.css" var="nyroModal"/>

    <spring:url value="/resources/css/Contenedores.css" var="Contenedores"/>

    <spring:url value="/resources/css/carrusel.css" var="carrusel"/>
    <spring:url value="/resources/css/linkCss.css" var="linkCss"/>
    <spring:url value="/resources/css/jquery.cluetip.css" var="cluetip"/>
    <spring:url value="/resources/css/jquery-ui.css" var="ui"/>
    <spring:url value="/resources/css/mensaje/jquery.alerts.css" var="alerts"/>
    <spring:url value="/resources/css/css-loader/css-loader.css" var="cssLoader"/>

    <spring:url value="/resources/css" var="css"/>
    <spring:url value="/resources/img/" var="images"/>
    <spring:url value="/resources/js" var="js"/>

    <link type="text/css" href="${system}" rel="stylesheet"/>
    <link type="text/css" href="${template}" rel="stylesheet"/>
    <link type="text/css" href="${rounded}" rel="stylesheet"/>
    <link type="text/css" href="${nyroModal}" rel="stylesheet"/>
    <link type="text/css" href="${Contenedores}" rel="stylesheet"/>
    <link type="text/css" href="${carrusel}" rel="stylesheet"/>
    <link type="text/css" href="${linkCss}" rel="stylesheet"/>
    <link type="text/css" href="${cluetip}" rel="stylesheet"/>
    <link type="text/css" href="${ui}" rel="stylesheet"/>
    <link type="text/css" href="${alerts}" rel="stylesheet"/>
    <link type="text/css" href="${cssLoader}" rel="stylesheet"/>
    <link type="text/css" href="${css}/jquery-confirm.min.css" rel="stylesheet"/>
    <link type="text/css" href="${css}/PrincipalUser.css" rel="stylesheet"/>

    <script type="text/javascript" src="${js}/net.js"></script>
    <script type="text/javascript" src="${js}/functions.js"></script>
    <script type="text/javascript" src="${js}/ajax.js"></script>
    <script src="${js}/carrusel/jquery.js"></script>
    <script src="${js}/jquery/jquery-1.7.2.js"></script>
    <script src="${js}/jquery.form.js"></script>
    <script src="${js}/jquery-ui.js"></script>
    <script src="${js}/ticker.js"></script>
    <script src="${js}/webtoolkit.utf8.js"></script>
    <script src="${js}/jquery.tinyscrollbar.min.js"></script>
    <script src="${js}/filtrosPeriodos.js"></script>
    <script src="${js}/mensaje/jquery.alerts.js"></script>
    <script src="${js}/cierraSesion.js"></script>
    <script src="${js}/envioInformes.js"></script>
    <script src="${js}/aSectorPublico/estadoInformeAnual.js"></script>

    <script src="${js}/SpryStyles/SpryTabbedPanels.js"></script>
    <script src="${js}/SpryStyles/SpryCollapsiblePanel.js"></script>
    <script src="${js}/jquery.cluetip.js"></script>
    <script src="${js}/informeAnual.js"></script>
    <script src="${js}/principalUser.js"></script>
    <script src="${js}/general.js"></script>
    <script src="${js}/selectorCarga/selectorCarga.js"></script>
    <script src="${js}/ValidacionesPendientes.js"></script>
    <script src="${js}/jquery.fileDownload.js"></script>
    <script src="${js}/cargaInformes/filtrosCarga.js"></script>
    <script src="${js}/cargaInformes/cargaInforme.js"></script>
    <script src="${js}/envioInformes.js"></script>
    <script type="text/javascript" src="${js}/jquery-confirm.min.js"></script>

</head>

<body id="minwidth-body">
<div id="header-box">
    <div id="module-status">
        <span class="logout"><a href="./">Cerrar Sesion</a></span>
    </div>
    <div id="module-status">
                <span style="background-image:url(${images}menu/icon-16-user.png);background-repeat:no-repeat ">Usuario:<a
                        href="#"> ${usuario.userLogin}</a></span>
    </div>
    <div id="module-menu">
        <%@include file="menu.jsp" %>
    </div>
    <div class="clr"></div>
</div>
<div id="content-box">
    <div class="border">
        <div class="padding">
            <div id="toolbar-box">
                <div class="t">
                    <div class="t">
                        <div class="t"></div>
                    </div>
                </div>
                <div class="m">
                    <div class="toolbar" id="toolbar">
                        <table class="toolbar">
                            <tr>

                                <td class="button" id="icon-32-new">
                                    <a href="javascript:submitForm();" class="toolbar" style="margin-top: 25px;">
                <span class="icon-32-new" title="Carga Informes">
                </span>
                                        Carga Informes
                                    </a>
                                </td>
                                <td class="button" id="icon-32-send">
                                    <a id="btn_envio" href="javascript:enviaInformes();" class="toolbar" style="margin-top: 25px;">
                <span class="icon-32-send" title="Envio de Informes">
                </span>
                                        Envio Informes
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="header logo">
                    </div>
                    <div class="clr"></div>
                </div>
                <div class="b">
                    <div class="b">
                        <div class="b"></div>
                    </div>
                </div>
            </div>
            <div class="clr"></div>
            <div id="submenu-box">
                <div class="t">
                    <div class="t">
                        <div class="t"></div>
                    </div>
                </div>
                <div class="m">
                    <%@ include file="infoEntidad.jsp" %>

                    <div class="col100"></div>
                    <div class="clr"></div>
                </div>
                <div class="b">
                    <div class="b">
                        <div class="b"></div>
                    </div>
                </div>
            </div>
            <div id="element-box">
                <div class="t">
                    <div class="t">
                        <div class="t"></div>
                    </div>
                </div>
                <div class="m">
                    <form name="listadoCorreccion" id="listadoCorreccion" action="./informes/formularioCarga"
                          method="post">
                        <table class="adminlist" width="100%">
                            <thead>
                            <tr>
                                <input type="hidden" name="oculto" id="oculto"/>
                                <td colspan="4"><b>Ejercicio:</b>
                                    <form:select id="cbEjercicio" path="ejercicios"
                                                 onchange="busquedaListado(cbEjercicio.value, contTipoInformes.value, '${images}', '${usuario.entidadID}');">
                                        <form:options items="${ejercicios}" itemValue="ejercicioId"
                                                      itemLabel="ejercicioNombre"/>
                                    </form:select>&nbsp;&nbsp;&nbsp;<b>Tipo de Informe:</b> <form:select
                                            id="contTipoInformes" path="tipoInforme"
                                            onchange="busquedaListado(cbEjercicio.value, contTipoInformes.value, '${images}', '${usuario.entidadID}');">
                                        <form:options items="${tipoInforme}" itemValue="codigo" itemLabel="nombre"/>
                                    </form:select></td>
                            </tr>
                            <tr>
                                <td width="25%" background="${images}fondo1.jpg" class="title-grid">
                                    <div align="center"><span class="Estilo11"><b>INFORMES</b></span></div>
                                </td>
                                <c:forEach var="periodo" items="${periodos}">
                                    <c:if test="${periodo.periodoCodigo != '00'}">
                                        <td width="5%" background="${images}fondo1.jpg" class="title-grid">
                                            <div align="center"><span class="Estilo11"><b>${periodo.periodoAbrev}</b></span>
                                            </div>
                                        </td>
                                    </c:if>
                                </c:forEach>
                            </tr>
                            </thead>
                            <tbody class="table-body-informes">
                            <c:set var="printCelda" value="false"/>
                            <c:forEach var="informe" items="${informesEstados.informes}">
                                <tr class="fila-informe ${informe.rowClass}">
                                    <td style="text-align: center;">${informe.informeNombre}</td>
                                    <c:forEach var="periodo" items="${periodos}">
                                        <c:if test="${periodo.periodoCodigo != '00'}">
                                            <c:set var="countArchivos" value="0"/>
                                            <c:forEach var="archivo" items="${informesEstados.estados}">
                                                <c:if test="${archivo.periodoCodigo eq periodo.periodoCodigo and countArchivos eq 0}">
                                                    <c:set var="countArchivos" value="1"/>
                                                    <c:choose>
                                                        <c:when test="${archivo.archivoEstadoId eq 3}">
                                                            <c:set var="imagenEstado" value="error.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 4}">
                                                            <c:set var="imagenEstado" value="Validado.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 5}">
                                                            <c:set var="imagenEstado" value="ValidadoOBS.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 6}">
                                                            <c:set var="imagenEstado" value="Procesado.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 7}">
                                                            <c:set var="imagenEstado" value="ProcesadoOBS.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 8}">
                                                            <c:set var="imagenEstado" value="NotMov.png"/>
                                                        </c:when>
                                                        <c:when test="${archivo.archivoEstadoId eq 10}">
                                                            <c:set var="imagenEstado" value="NotMovProc.png"/>
                                                        </c:when>
                                                    </c:choose>

                                                    <td style="text-align: center;">
                                                        <a href="#" aria-describedby="ui-tooltip-8" id="inf_${archivo.archivoId}"><img src="${images}${imagenEstado}" onclick="openDialog(${archivo.archivoId}, '${informe.informeCodigo}', '${informe.informeNombre}', ${archivo.archivoEstadoId}, '${archivo.archivoUsuario}', '${archivo.archivoFecha}', ${archivo.certificadoId}, ${archivo.informeId}, ${archivo.periodoEjercicioId}, ${archivo.ejercicioId})"/></a>
                                                        <script>
                                                            $('#inf_${archivo.archivoId}').live({
                                                                mouseenter: function(){
                                                                    $(this).css({'cursor':'pointer'});
                                                                    var fechas = '${archivo.archivoFecha}'.split(' ');
                                                                    var menEstado="";
                                                                    switch(${archivo.archivoEstadoId}){
                                                                        case  3:	menEstado="Informe con error bloqueante cargado ";break;
                                                                        case  4:	menEstado="Validado en CGR ";break;
                                                                        case  5:	menEstado="Validado con observaciones en CGR ";break;
                                                                        case  6:	menEstado="Enviado a CGR ";break;
                                                                        case  7:	menEstado="Enviado con observaciones a CGR ";break;
                                                                        case  8:	menEstado="Validado sin movimiento en CGR ";break;
                                                                        case 10:	menEstado="Enviado sin movimiento a CGR ";break;
                                                                    }

                                                                    tooltip = '<div class="ui-tooltip-content" style="width:450px;position:absolute; ">'+
                                                                        '<div class="tooltip-title">${informe.informeCodigo} ${informe.informeNombre}</div>'+
                                                                        '<div class="tooltip-content">'+
                                                                        '<p style="margin:0;padding:0;">' + menEstado + ' por ${archivo.archivoUsuario} el ' + fechas[0] + ' a las ' + fechas[1] +
                                                                        '</p>';

                                                                    <c:if test="${archivo.archivoEstadoId == 6 || archivo.archivoEstadoId == 7 || archivo.archivoEstadoId == 10}">
                                                                    tooltip = tooltip + "<br><p style='margin:0;padding:0;'>N&deg; de Env&iacuteo: ${archivo.certificadoId}</p>";
                                                                    </c:if>

                                                                    tooltip = tooltip + "<br><p style='margin:0;padding:0;' class='tooltip-message'>Para Acceder a m&aacutes Informacion Haga Click sobre el Icono del Estado del Informe</p></div></div>";

                                                                    $('body').append(tooltip);

                                                                    izq=0;

                                                                    if ($(this).offset().left < 820){ izq=$(this).offset().left+20;}
                                                                    else{							izq=$(this).offset().left-450;}
                                                                    $('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});
                                                                },
                                                                mouseleave: function(){
                                                                    //if ($(this).attr('onclick')){
                                                                    $('div').remove('.ui-tooltip-content');}
                                                                //}
                                                            });
                                                        </script>
                                                    </td>

                                                    <c:set var="printCelda" value="true"/>
                                                </c:if>
                                            </c:forEach>
                                            <c:if test="${!printCelda}">
                                                <td></td>
                                            </c:if>
                                            <c:set var="printCelda" value="false"/>
                                        </c:if>
                                    </c:forEach>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                        <div id="listado" style="height:290px; width:100%;position:static;"></div>
                        <div align="center" id="registros"
                             style="overflow:auto;height:30px;visibility:hidden;top:180px;">
                            <font class="adminlist"><h1>No Existen Registros Asociados a la Consulta....</h1></font>
                        </div>

                        <div id="prueba" style="visibility: hidden">
                            <h1><a href="javascript:abreReporte();">Lin 1</a></h1>

                        </div>

                    </form>
                    <div id="contIconografia" class="contIconografia">
                        <div class="contIcono" style="clear:both;width:165px;">
                            <img id="icoValidado" src="${images}Validado.png" style="width:18px;height: 18px; float:left;margin-right:5px;" title="Informe Validado">
                            <span style="float:left;">Validado</span>
                        </div>
                        <div class="contIcono" style="width:165px;padding:0 10px 0 0;">
                            <img src="${images}Procesado.png" style="width:18px;height: 18px; float:left; margin-right:5px;" title="Informe Procesado">
                            <span>Procesado</span>
                        </div>
                        <div class="contIcono" style="width:100px;">
                            <img src="${images}error.png" style="width:18px;height: 18px; float:left;margin-right:5px;" title="Informe Con Errores">
                            <span>Error</span>
                        </div>

                        <div class="contIcono" style="clear:both;width:165px;">
                            <img src="${images}ValidadoOBS.png" style="width:18px;height: 18px; float:left; margin-right:5px;" title="Validado con Observaciones">
                            <span>Validado con observación</span>
                        </div>
                        <div class="contIcono" style="width:165px;padding:0 10px 0 0;">
                            <img src="${images}ProcesadoOBS.png" style="width:18px;height:18px;float:left;margin-right:5px;" title="Procesado con Observaciones">
                            <span>Procesado con observación</span>
                        </div>
                    </div>
                    <div class="clr"></div>
                    <div class="desc-informe" id="diaResumenCuadratura" title="Prop"
                         style="border: #0000FF; display:none;width:600px; height:400px;z-index:9999;">
                        <div id="contResumenCuadratura"></div>
                    </div>
                </div>
                <div class="b">
                    <div class="b">
                        <div class="b"></div>
                    </div>
                </div>
            </div>
            <noscript>
                ¡Advertencia! JavaScript debe estar habilitado para un correcto funcionamiento de la Administración
            </noscript>
            <div class="clr"></div>
        </div>
        <div class="clr"></div>
    </div>
</div>
<div id="border-bottom">
    <div>
        <div></div>
    </div>
</div>
<div id="footer">
    <p class="copyright">
        <a href="#" target="_blank">Contraloria General de la República</a>
        Sistema de Contabilidad General de la Nación<br/>
        Teatinos 56 , Santiago de Chile, Teléfono 56-2 24021100 -Código Postal: 8340521
        Sitio web optimizado para ser visualizado en una resolución de pantalla de 1024 x 768 píxeles, en los
        navegadores iExplorer 10 o superior, Firefox 3.6 o superior y Chrome 8 o superior
        Versión 2.0
    </p>
</div>
</td>
</tr>
</table>
</div>
<div id="links-informe" title="">
    <p class="desc-informe"></p>
    <br/>
    <div id="divNumEnvio">
        <p class="num-envio"></p>
        <br/>
    </div>
    <div style="margin-left: 10%;">
        <p>
        <ul>
            <li><a href="#" target="_blank" class="link-ver-informe">Ver Informe</a></li>
            <li><a href="#" target="_blank" class="link-reporte-val">Ver Reporte Validación</a></li>
            <li id="link-rep-cuad"><a href="javascript:void(0);" class="link-ver-reporteCuadraturas">Ver Reportes de Cuadraturas</a></li>
            <li><a href="#" target="_blank" class="link-descarga-archivo">Descargar Archivo</a></li>
            <li id="link-cert-env"><a href="javascript:void(0);" target="_blank" class="link-cert-env">Ver Certificado de Envío</a></li>
            <li><a href="javascript:void(0);" class="link-ver-bitacora">Ver Bitácora</a></li>
            <li id="link-res-err"><a href="javascript:void(0);" class="link-resumen-errore">Ver Resumen de Errores</a></li>
        </ul>
        </p>
    </div>
</div>
<div id="loading-spinner" class="loader loader-default" data-text="Cargando información..."></div>
<div class="Acceso" id="dialogBitacora" title="Bit&aacute;cora"
     style="width:600px;max-height:400px;z-index:1900; display:none;" class="TextoNombre">
    <div id="" class="TextoPopupPrincipal"></div>
    <div style="width:660px;max-height:400px; margin:auto 0;overflow-y:scroll ;">
        <div style="float:left;margin:0px 0 0 15px;"></div>
        <div style="clear: both;display: block; margin: 0px 0 0 15px;">
            <div style="clear: both;width:620px;float:left;">
                <label id="estadoSendCGRError" style="display:inline;"> </label>

            </div>
        </div>
        <div style="float:left;margin:-1px 0 0 15px;"></div>
        <div style="clear: both;display: block; margin: 0 0 20px 15px;height: 300px; ">
            <div style="clear: both;" class="grillaInformes">
                <div style="clear: both;" class="rwEncInf">
                    <div style="width:99px;text-align:center;"
                         class="tituloInfColError">Estado
                    </div>
                    <div style="width:99px;text-align:center;"
                         class="tituloInfColErrorFinal">Usuario
                    </div>
                    <div style="width:189px;text-align:center;"
                         class="tituloInfColError">Fecha Procesamiento
                    </div>
                    <div id="divColFechaTramitacion"
                         style="width:99px;text-align:center;"
                         class="tituloInfColErrorFinal">Fecha Tramitación
                    </div>
                    <div id="divColFechaEnvio"
                         style="width:99px;text-align:center;"
                         class="tituloInfColErrorFinal" style="Display:none; ">Nº de Envio
                    </div>
                </div>
                <div class="contEstInfAnual" id="contBitacora"></div>
            </div>
        </div>
    </div>
</div>
<div class="Acceso" id="dialogErrorCGF" title="FINIC INFORME CONTABLE"
     style="width:760px; height:auto;max-height:400px;z-index:2001; display:none;"
     class="TextoNombre">
    <div id="inforErrores" class="TextoPopupPrincipal" style="width: 760px;"></div>
    <div style="width:760px;max-height:400px; margin:auto 0;">
        <div style="float:left;margin:5px 0 0 15px; width: 760px;"></div>
        <div style="clear: both;display: block; margin: 10px 0 0 15px; width: 760px;">
        </div>
        <div style="float:left;margin:5px 0 0 15px; width: 760px;"></div>
        <div style="clear: both;display: block; margin: 0 0 20px 15px; height: 300px; width: 760px;">
            <div style="clear: both; width: 760px;" class="grillaInformes">
                <div style="clear: both;" class="rwEncInf">
                    <div class="tituloInfColError">Tipo</div>
                    <div class="tituloInfColErrorFinal">Error</div>
                </div>
                <div class="contEstInfAnual" id="divResumenError" style="overflow:auto;"></div>
            </div>
        </div>
    </div>
</div>
<div id="dialogEnvioInformes" title="Envío de Informes a Contraloría">

</div>
<div id="dialogEnvioInformesOK" title="Envío de Informes a Contraloría">
    <p>Informe(s) procesados correctamente.</p>
</div>
<form id="formCargaMain" action="./main" method="post"></form>
</body>
</html>

		
