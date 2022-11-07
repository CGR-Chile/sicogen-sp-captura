<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
    <title>Reporte de Cuadratura</title>


    <spring:url value="/resources/css/system.css" var="system"/>
    <spring:url value="/resources/css/template.css" var="template"/>
    <spring:url value="/resources/css/rounded.css" var="rounded"/>
    <spring:url value="/resources/css/login.css" var="login"/>
    <spring:url value="/resources/css/Contenedores.css" var="Contenedores"/>
    <spring:url value="/resources/css/scroll.css" var="scroll"/>
    <spring:url value="/resources/css/reportes/cuadratura/disponibilidad.css" var="disponibilidad"/>
    <spring:url value="/resources/img/" var="images"/>

    <link type="text/css" href="${system}" rel="stylesheet"/>
    <link type="text/css" href="${template}" rel="stylesheet"/>
    <link type="text/css" href="${rounded}" rel="stylesheet"/>
    <link type="text/css" href="${login}" rel="stylesheet"/>
    <link type="text/css" href="${Contenedores}" rel="stylesheet"/>
    <link type="text/css" href="${scroll}" rel="stylesheet"/>
    <link type="text/css" href="${disponibilidad}" rel="stylesheet"/>


    <script type="text/javascript" src="/sicogen-mf/resources/js/jquery.tinyscrollbar.js"></script>

</head>
<body>
<div id="contenedor" class="contDisp" style="width:950px;">
    <div id="cabecera" class="cabecera">
        <div id="logo" class="logo">
            <div id="Titulos" style="float: left;">
                <div id="contUsuarioLog" style="float: right; padding: 0px 20px 0 0;"></div>
            </div>
        </div>
    </div>
    <div id="cuerpo" class="cuerpo" >
        <img id="imgTitulo" style="float:left; width:45px; height: 12px;"src="${images}cuadros.png"></img>
        <div id="tituloInforme" class="tituloInforme">Reporte de Cuadratura</div>
        <div id="subtitulo" class="subtitulo">Cuadratura Disponibilidades</div>

        <table id="tblContenedor" style="width:400px;font:12px arial;border-collapse: collapse;margin-top:5px; ">
            <thead>
            <tr style="background-color:#464749;color:#fff;">
                <th colspan="2">Informaci&oacute;n General</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="background-color: #f8f8f8;width:100px;">Entidad</td>
                <td style="background-color: #d7d7d9;width:200px;">${nombreEntidad}</td>
            </tr>
            <tr>
                <td style="background-color: #f8f8f8;">Ejercicio</td>
                <td style="background-color: #d7d7d9;">${ejercicioNombre}</td>
            </tr>
            <tr>
                <td style="background-color: #f8f8f8;">Periodo</td>
                <td style="background-color: #d7d7d9;">${periodoNombre}</td>
            </tr>
            <tr>
                <td style="background-color: #f8f8f8;">Resultado</td>
                <td style="background-color: #d7d7d9;">${resultado}</td>
            </tr>
            </tbody>
        </table>

        <div id="scrollbar1" style="height: 230px;">
            <div class="scrollbar">
                <div class="track"> <!-- -->
                    <div class="thumb">
                        <div class="end"></div>
                    </div>
                </div> <!-- -->
            </div>
            <div>
                <div>
                    <table id="tbl_report">
                        <tr>
                            <td>
                                <!--********************************* Encabezado Reporte Titulo y glosa  *************************************-->
                                <table class="tblCuadratura" style="width: 915px;margin:10px 0;padding:5px;border-collapse:collapse;border-spacing:0;border:2px solid;">
                                    <thead>
                                    <tr style="background-color:#D7D7D9;color:#FFFFFF;font:bold 14px arial;margin:0;padding:5px 20px;">
                                        <th colspan="5">Cuadro Resumen</th>
                                    </tr>
                                    <tr style="background-color:#FAFAFA;color:#2581B8;font:bold 12px arial;padding:5px;">
                                        <th colspan="1" style="width:55px;"></th>
                                        <th colspan="1" style="text-align:left;">Descripci&oacute;n</th>
                                        <th colspan="1" style="width:15px;"></th>
                                        <th colspan="1" style="text-align:right;">Monto (en pesos)</th>
                                        <th colspan="1" style="width:5%;"></th>
                                    </tr>
                                    </thead>
                                    <tbody style="background-color:#FAFAFA;font:12px arial;padding-bottom: 10px;width: 100%;">
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">DEBITOS RECURSOS DISPONIBLES (111 debitos)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalRecuDispoCtaDebe}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">CREDITOS RECURSOS DISPONIBLES (111 creditos)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalRecuDispoCtaHaber}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;"><b>VARIACION DE DISPONIBILIDADES</b></td>
                                        <td colspan="1"><b>$</b></td>
                                        <td colspan="1" style="text-align:right;"><b><c:out value="${totalVarDisponibilidades}" />  </b></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" >&nbsp;</td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">PERCIBIDO (115 creditos)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalCtaCobrarHaber}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">PAGADO (215 debitos)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalCtaPagarDebe}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">ACREEDORES (credito complementarias)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalCtaCptoHaber}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;">DEUDORES (debito complementarias)</td>
                                        <td colspan="1">$</td>
                                        <td colspan="1" style="text-align:right;"><c:out value="${totalCtaCptoDebe}" /></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr >
                                        <td colspan="2" style="padding-left: 55px;"><b>VARIACION DE DISPONIBILIDADES (COMPROBACION)</b></td>
                                        <td colspan="1"><b>$</b></td>
                                        <td colspan="1" style="text-align:right;"><b><c:out value="${totalVarDispoComprobacion}" /></b></td>
                                        <td colspan="1"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" >&nbsp;</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <table class="tblCuadratura" style="width: 915px;margin:10px 0;padding:5px;border-collapse:collapse;border-spacing:0;border:2px solid;">
                                    <thead>
                                    <tr style="background-color:#D7D7D9;color:#FFFFFF;font:bold 14px arial;margin:0;padding:5px 20px;">
                                        <th colspan="8">RECURSOS DISPONIBLES</th>
                                    </tr>
                                    <tr style="background-color:#FAFAFA;color:#2581B8;font:bold 12px arial;padding:5px;">
                                        <th colspan="1">LINEA</th>
                                        <th colspan="1">Cuenta</th>
                                        <th colspan="1">DENOMINACI&Oacute;N</th>
                                        <th colspan="2">D&Eacute;BITO</th>
                                        <th colspan="2">CR&Eacute;DITO</th>
                                        <th colspan="1" style="width:5%;"></th>
                                    </tr>
                                    </thead>
                                    <tbody style="background-color:#FAFAFA;font:12px arial;padding-bottom: 10px;width: 100%;">
                                    <c:forEach items="${listaRecursosDispo}" var="item2">
                                        <tr class="${item2.estilo}" >
                                            <td style="text-align:center;">${item2.linea}</td>
                                            <td style="text-align:center;">${item2.codCta}</td>
                                            <td style="text-align:center;">${item2.cuenta}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item2.debe}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item2.haber}</td>
                                            <td colspan="1"></td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                    <tfoot style="background-color:#FAFAFA;font:bold 12px arial;padding-bottom: 10px;width: 100%;">
                                    <tr style="height: 25px;">
                                        <td colspan="3" style="text-align:right;">TOTALES DEBITOS Y CREDITOS</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalRecuDispoCtaDebe}</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalRecuDispoCtaHaber}</td>
                                        <td style="width:5%;"></td>
                                    </tr>
                                    </tfoot>
                                </table>

                                <table class="tblCuadratura" style="width: 915px;margin:10px 0;padding:5px;border-collapse:collapse;border-spacing:0;border:2px solid;">
                                    <thead>
                                    <tr style="background-color:#D7D7D9;color:#FFFFFF;font:bold 14px arial;margin:0;padding:5px 20px;">
                                        <th colspan="6">CUENTAS POR COBRAR</th>
                                    </tr>
                                    <tr style="background-color:#FAFAFA;color:#2581B8;font:bold 12px arial;padding:5px;">
                                        <th colspan="1">LINEA</th>
                                        <th colspan="1">Cuenta</th>
                                        <th colspan="1">DENOMINACI&Oacute;N</th>
                                        <th colspan="2">CR&Eacute;DITO</th>
                                        <th colspan="1" style="width:5%;"></th>
                                    </tr>
                                    </thead>
                                    <tbody style="background-color:#FAFAFA;font:12px arial;padding-bottom: 10px;width: 100%;">
                                    <c:forEach items="${listaCuentasCobrar}" var="item3">
                                        <tr class="${item3.estilo}" >
                                            <td style="text-align:center;">${item3.linea}</td>
                                            <td style="text-align:center;">${item3.codCta}</td>
                                            <td style="text-align:center;">${item3.cuenta}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item3.haber}</td>
                                            <td colspan="1"></td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                    <tfoot style="background-color:#FAFAFA;font:bold 12px arial;padding-bottom: 10px;width: 100%;">
                                    <tr style="height: 25px;">
                                        <td  colspan="3" style="text-align:right;">TOTALES PERCIBIDO</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalCtaCobrarHaber}</td>
                                        <td style="width:5%;"></td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <table class="tblCuadratura" style="width: 915px;margin:10px 0;padding:5px;border-collapse:collapse;border-spacing:0;border:2px solid;">
                                    <thead>
                                    <tr style="background-color:#D7D7D9;color:#FFFFFF;font:bold 14px arial;margin:0;padding:5px 20px;">
                                        <th colspan="6">CUENTAS POR PAGAR</th>
                                    </tr>
                                    <tr style="background-color:#FAFAFA;color:#2581B8;font:bold 12px arial;padding:5px;">
                                        <th colspan="1">LINEA</th>
                                        <th colspan="1">Cuenta</th>
                                        <th colspan="1">DENOMINACI&Oacute;N</th>
                                        <th colspan="2">D&Eacute;BITOS</th>
                                        <th colspan="1" style="width:5%;"></th>
                                    </tr>
                                    </thead>
                                    <tbody style="background-color:#FAFAFA;font:12px arial;padding-bottom: 10px;width: 100%;">
                                    <c:forEach items="${listaCuentasPagar}" var="item4">
                                        <tr class="${item4.estilo}" >
                                            <td style="text-align:center;">${item4.linea}</td>
                                            <td style="text-align:center;">${item4.codCta}</td>
                                            <td style="text-align:center;">${item4.cuenta}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item4.debe}</td>
                                            <td colspan="1"></td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                    <tfoot style="background-color:#FAFAFA;font:bold 12px arial;padding-bottom: 10px;width: 100%;">
                                    <tr style="height: 25px;">
                                        <td  colspan="3" style="text-align:right;">TOTALES PAGADO</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalCtaPagarDebe}</td>
                                        <td style="width:5%;"></td>
                                    </tr>
                                    </tfoot>
                                </table>
                                <table class="tblCuadratura" style="width: 915px;margin:10px 0;padding:5px;border-collapse:collapse;border-spacing:0;border:2px solid;">
                                    <thead>
                                    <tr style="background-color:#D7D7D9;color:#FFFFFF;font:bold 14px arial;margin:0;padding:5px 20px;">
                                        <th colspan="8">CUENTAS COMPLEMENTARIAS</th>
                                    </tr>
                                    <tr style="background-color:#FAFAFA;color:#2581B8;font:bold 12px arial;padding:5px;">
                                        <th colspan="1">LINEA</th>
                                        <th colspan="1">Cuenta</th>
                                        <th colspan="1">DENOMINACI&Oacute;N</th>
                                        <th colspan="2">D&Eacute;BITO</th>
                                        <th colspan="2">CR&Eacute;DITO</th>
                                        <th colspan="1" style="width:5%;"></th>
                                    </tr>
                                    </thead>
                                    <tbody style="background-color:#FAFAFA;font:12px arial;padding-bottom: 10px;width: 100%;">
                                    <c:forEach items="${listaCuentasCmpto}" var="item5">
                                        <tr class="${item5.estilo}" >
                                            <td style="text-align:center;">${item5.linea}</td>
                                            <td style="text-align:center;">${item5.codCta}</td>
                                            <td style="text-align:center;">${item5.cuenta}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item5.debe}</td>
                                            <td style="width:50px;"></td>
                                            <td style="text-align:right;">${item5.haber}</td>
                                            <td colspan="1"></td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                    <tfoot style="background-color:#FAFAFA;font:bold 12px arial;padding-bottom: 10px;width: 100%;">
                                    <tr style="height: 25px;">
                                        <td  colspan="3" style="text-align:right;">TOTALES DEUDORES Y ACREEDORES</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalCtaCptoDebe}</td>
                                        <td style="width:50px;padding-left: 10px;"><b>$</b></td>
                                        <td style="text-align:right;">${totalCtaCptoHaber}</td>
                                        <td style="width:5%;"></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>