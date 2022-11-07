<%@ page contentType="text/html; charset=iso-8859-1;;;;" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <title>SICOGEN II - Panel de Control</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1;"/>

    <spring:url value="/resources/css/system.css" var="system"/>
    <spring:url value="/resources/css/template.css" var="template"/>
    <spring:url value="/resources/css/rounded.css" var="rounded"/>
    <spring:url value="/resources/img/header/" var="imagenesHeader"/>

    <link type="text/css" href="${system}" rel="stylesheet"/>
    <link type="text/css" href="${template}" rel="stylesheet"/>
    <link type="text/css" href="${rounded}" rel="stylesheet"/>
</head>

<body id="minwidth-body">
<table class="adminlist" width="100%">
    <thead><tr>
        <td colspan="4"><b>Ejercicio:</b>
            <form:select id="cbEjercicio" path="ejercicios" onchange="loadEstadosInformeAnual(cbEjercicio.value, contTipoInformes.value);">
                <form:options items="${ejercicios}" itemValue="ejercicioId" itemLabel="ejercicioNombre"/>
            </form:select>&nbsp;&nbsp;&nbsp;<b>Tipo de Informe:</b> <form:select id="contTipoInformes" path="tipoInforme" onchange="loadEstadosInformeAnual(cbEjercicio.value, contTipoInformes.value);">
                <form:options items="${tipoInforme}"  itemValue="codigo" itemLabel="nombre"/>
            </form:select></td>
    </tr>

    <tr>
        <td width="40%"  background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>INFORMES</b></span></div></td>
        <td width="4%"  background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>APE</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>ENE</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>FEB</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>MAR</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>ABR</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>MAY</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>JUN</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>JUL</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>AGO</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>SEP</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>OCT</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>NOV</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>DIC</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>COR</b></span></div></td>
        <td width="4%" background="${images}fondo1.jpg"><div align="center"><span class="Estilo11"><b>CIE</b></span></div></td>
    </tr>
    </thead>
</table>
</body>
</html>
		