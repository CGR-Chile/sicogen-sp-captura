<%@ page import="java.text.SimpleDateFormat" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: kibernum
  Date: 2020-11-12
  Time: 17:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources/css" var="css"/>
<spring:url value="/resources/img" var="images"/>
<html>
<head>
    <title>Envio de Informes</title>

    <link rel="stylesheet" href="${css}/PrincipalUser.css" type="text/css" >
    <link rel="stylesheet" href="${css}/certificadoEnvio.css" type="text/css" >
</head>
<body>

<div id="datosCert" style="display:none;"></div>
<div id="formEnvio2" class="contenedorEnvio modalEnvio" style="width: 950px;left:12.5%; display:none; height:560px;position: absolute;top:10%;margin-left:auto;margin-right:auto;border-radius:10px;z-index: 1003" >
    <div class="contenedor" style=" border-radius:10px; border-style: solid;border-color: #CCCCCC;height:100%; width: 100%;margin: 0px'">
        <div class="contenedorformEnvio" >
            <form id="showInforSendInfTres" action="showInforSendInfTres" method="post" enctype="multipart/form-data">
                <table id="certificado" class="tblCert">
                    <thead style="background-color:#737478;color:#fff;border-collapse: collapse;width:1100px;">
                    <tr>
                        <th style="width:80%;" colspan="4">
                            <center>
                                <img style="width:450px;margin:20px;" src="${images}/sicogen2.png"></img>
                            </center>
                        </th>
                        <th style="width:90px;" colspan="2">
                            <div id="Ncertificado" style="font: 12px Helvetica;">N° Certificado : </div>
                            <div id="qrcode"></div>
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
                            <p>Yo, <b>${nomUsuario}</b>, declaro que con fecha <b>${fecha}</b>,
                                remito a la Contraloría General de la República los siguientes informes, los
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
                                        <div id="img"><img id="imagen1" src="${images}/cuadrados2.png"/></div>
                                        <div id="at" style="color: #5D5C61;">Atentamente,</div>
                                        <div id="nombre" ><b>${nomUsuario}</b></div>
                                        <div id="entidad" ><b>${entidadNombre}</b></div>
                                    </td>
                                    <td colspan="3" style="margin:15px 20px 0;width: 40%;">
                                        <button id="Btn_enviar3" type="button" class="boton" style="cursor:pointer;" onclick="certificadoFinal();" alt="Ver Certificado" value="validar_Informe"> Aceptar
                                        </button>
                                        <button type="button" class="boton" name="Btn_volver3" id="Btn_volver3" style="margin: 0 0 0 5%;cursor:pointer;"
                                                onclick="cierraEnvio_2()"
                                                alt="Envie los informes a contraloria" value="validar_Informe" > Cancelar
                                        </button>
                                    </td>
                                    <td colspan="1" style="width:30px;"></td>
                                </tr>
                                <tr>
                                    <td style="height:20px;" colspan="6"></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</div>
</body>
</html>
