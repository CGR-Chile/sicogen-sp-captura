<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Certificado de Envío</title>

    <spring:url value="/resources/css/Contenedores.css" var="Contenedores"/>
    <spring:url value="/resources/css/certificadoEnvio.css" var="certificadoEnvio"/>
    <spring:url value="/resources/css/mensaje/jquery.alerts.css" var="jquery.alerts"/>
    <spring:url value="/resources/css/tabla.css" var="tabla"/>

    <spring:url value="/resources/css/system.css" var="system"/>
    <spring:url value="/resources/css/template.css" var="template"/>
    <spring:url value="/resources/css/rounded.css" var="rounded"/>
    <spring:url value="/resources/css/login.css" var="login"/>
    <spring:url value="/resources/css/inputsCss.css" var="inputsCss"/>

    <link type="text/css" href="${system}" rel="stylesheet"/>
    <link type="text/css" href="${template}" rel="stylesheet"/>
    <link type="text/css" href="${rounded}" rel="stylesheet"/>
    <link type="text/css" href="${login}" rel="stylesheet"/>
    <link type="text/css" href="${inputsCss}" rel="stylesheet"/>
    <link type="text/css" href="${certificadoEnvio}" rel="stylesheet"/>


    <spring:url value="/resources/img/" var="images"/>


    <script type="text/javascript" src="/sicogen-mf/resources/js/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="/sicogen-mf/resources/js/jquery.qrcode.min.js"></script>
    <script type="text/javascript" src="/sicogen-mf/resources/js/mensaje/jquery.alerts.js"></script>
    <script type="text/javascript" src="/sicogen-mf/resources/js/envio/certEnvio.js"></script>
</head>
<body onload="generaCodigo('${qr}');">

<div id="datosCert" style="display:none;">${qr}</div>
<table id="certificado" class="tblCert" style="border-collapse: collapse;width:1100px;border: 1.5px solid #ccc;border-radius: 10px;">
    <thead style="background-color:#737478;color:#fff;border-collapse: collapse;width:1100px;">
    <tr>
        <th style="width:80%;" colspan="4">
            <center>
                <img style="width:450px;margin:20px;" src="/sicogen-mf/resources/img/sicogen2.png"></img>
            </center>
        </th>
        <th style="width:90px;" colspan="2">
            <div id="Ncertificado" style="font: 12px Helvetica;">N° Certificado :${nroCertificado}</div>
            <div id="qrcode"></div>
            <div id="dataQr" style="display:none;">${qr}</div>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr style="font:bold 26px Arial;text-align:center;color: #5D5C61;">
        <td colspan="6">CERTIFICADO</td>
    </tr>

    <tr style="font:bold 22px Arial;text-align:center;color: #5D5C61">
        <td colspan="6" style=";margin:10px 0;">DE ENVÍO DE INFORMES A CGR</td>
    </tr>
    <tr style="font: normal 12px sans-serif ;padding: 5px 25px 0px 25px;text-align : justify;color: #727074;">
        <td colspan="1" style="width:2.5%"></td>
        <td colspan="4">
            <p>Yo, <b>${usuario}</b>, declaro que con fecha <b><span id="fecha">${fecha}</span></b>
                a las <b><span id="hora">${hora}</span> hrs</b>, remito a la Contraloría General de la República los siguientes informes, los
                cuales son copias fiel de la información contenida en esta entidad.
            </p>
        </td>
        <td colspan="1" style="width:30px;"></td>
    </tr>
    <tr>
        <td style="width:2.5%"></td>
        <td colspan="4" style="width:95%">
            <table class="adminlist" width="100%">
                <thead>
                <tr class="title-grid">
                    <td width="20%" class="title-grid"><div align="center"><span class="Estilo11"><b>Tipo de Informe</b></span></div></td>
                    <td width="30%" class="title-grid"><div align="center"><span class="Estilo11"><b>Informes</b></span></div></td>
                    <td width="15%" class="title-grid"><div align="center"><span class="Estilo11"><b>Periodo</b></span></div></td>
                    <td width="10%" class="title-grid"><div align="center"><span class="Estilo11"><b>Ejercicio</b></span></div></td>
                    <td width="25%" class="title-grid"><div align="center"><span class="Estilo11"><b>Nota</b></span></div></td>

                </tr>
                </thead>
                <tbody>
                <table class="adminlist" width="100%">
                    <tbody>
                    <c:forEach items="${salidaEnvioCgr}" var="item2" varStatus="status">
                        <c:choose>
                            <c:when test="${status.index % 2 == 0}">
                                <c:set var="rowClass" value="row0"/>
                            </c:when>
                            <c:otherwise>
                                <c:set var="rowClass" value="row1"/>
                            </c:otherwise>
                        </c:choose>
                        <tr class="<c:out value="${rowClass}"/>">
                            <td width="20%" style="text-align: center;">${item2.tipoInformeNombre}</td>
                            <td width="30%" style="text-align: center;">${item2.informeNombre}</td>
                            <td width="15%" style="text-align: center;">${item2.informePeriodoCod}</td>
                            <td width="10%" style="text-align: center;">${item2.informeEjercicio}</td>
                            <td width="25%" style="text-align: center;">${item2.informeMensaje}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
                </td>
                <td style="width:30px;"></td>
                </tr>
                <tr>
                    <td style="height:20px;" colspan="6"></td>
                </tr>
                <tr style="color: #727074;font: 12px arial;">
                    <td colspan="1" style="width:2.5%"></td>
                    <td colspan="1" style="margin:15px 20px 0;width: 60%;">
                        <div id="img"><img id="imagen1" src="${images}cuadrados2.png"/></div>
                        <div id="at" style="color: #5D5C61;">Atentamente,</div>
                        <div id="nombre" ><b>${usuario}</b></div>
                        <div id="entidad" ><b>${nombreEntidad}</b></div>
                        <div id="ejercicio"><b>${ejercicioCod}</b></div>
                    </td>
                    <td colspan="3" style="margin:15px 20px 0;width: 40%;">
                        <button id="btnPrint" type="button" class="boton" style="cursor:pointer;float: none;" onclick="printPage()"title="Imprimir">Imprimir</button>
                        <button id="btnEnviar" type="button" class="boton" style="margin:cursor:pointer;float: none;" onclick="window.close()">Salir</button>
                    </td>
                    <td colspan="1" style="width:30px;"></td>
                </tr>
                <tr>
                    <td style="height:20px;" colspan="6"></td>
                </tr>
                </tbody>
            </table>


</body>

</html>