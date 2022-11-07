<%@ page contentType="text/html;charset=UTF-8;;;;;" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8;"/>
    <title>Contraloria General de la República</title>

    <spring:url value="/resources/css/" var="styles"/>
    <spring:url value="/resources/img/" var="images"/>
    <spring:url value="/resources/js/" var="scripts"/>

    <link type="text/css" href="${styles}system.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}template.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}rounded.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}PrincipalUser.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}jquery-ui/1.12.1/jquery-ui.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}jquery-confirm/3.3.2/jquery-confirm.min.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}css-loader/css-loader.css" rel="stylesheet"/>
    <link type="text/css" href="${styles}tipr/tipr.css" rel="stylesheet"/>

    <script type="text/javascript" src="${scripts}net.js"></script>
    <script type="text/javascript" src="${scripts}ajax.js"></script>
    <script type="text/javascript" src="${scripts}nu.js"></script>
    <script type="text/javascript" src="${scripts}functions.js"></script>
    <script type="text/javascript" src="${scripts}menu.js"></script>
    <script type="text/javascript" src="${scripts}cargaInformes/filtrosCarga.js"></script>
    <script type="text/javascript" src="${scripts}jquery/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="${scripts}jquery-ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="${scripts}cargaInformes/cargaInforme.js"></script>
    <script type="text/javascript" src="${scripts}jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="${scripts}tipr/tipr.min.js"></script>
    <style>
        #progressbar {
            margin-top: 20px;
        }

        .progress-label {
            font-weight: bold;
            text-shadow: 1px 1px 0 #fff;
            margin-top: 5%;
        }

        .ui-dialog-titlebar-close {
            display: none;
        }
    </style>
</head>

<body id="minwidth-body">
<div id="header-box">
    <div id="module-status">
        <span class="logout"><a href="../">Cerrar Sesion</a></span>
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
                                <td class="button" id="icon-32-back">
                                    <a href="javascript:cargaMain();" class="toolbar" style="margin-top: 25px;">
		<span class="icon-32-back" title="Volver">
		</span>
                                        Volver
                                    </a>
                                </td>
                                <td class="button" id="toolbar-edit">
                                    <a href="#" onclick="javascript:enviaValidacionInformeIC('${images}');" id="edit"
                                       class="toolbar" style="margin-top: 25px;"><span class="icon-32-upload" title="Cargar"></span>Validar</a>
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
                    <table class="adminlist" width="100%" id="tablaCarga">
                        <thead>
                        <tr>
                            <c:choose>
                                <c:when test="${hayComplemento > 0}">
                                    <%@ include file="filtrosCargaCorreccion.jsp" %>
                                </c:when>
                                <c:otherwise>
                                    <%@ include file="filtrosCarga.jsp" %>
                                </c:otherwise>
                            </c:choose>
                        </tr>
                        <tr>
                            <td width="35%" class="title-grid">
                                <div align="center"><span class="Estilo11"><b>INFORMES</b></span></div>
                            </td>
                            <td width="30%" class="title-grid">
                                <div align="center"><span class="Estilo11"><b>SELECCI&Oacute;N DE ARCHIVOS</b></span>
                                </div>
                            </td>
                            <td width="20%" class="title-grid">
                                <div align="center"><span class="Estilo11"><b>OBSERVACI&Oacute;N CARGA</b></span></div>
                            </td>
                            <td width="10%" class="title-grid">
                                <div align="center"><span class="Estilo11"><b>ESTADO</b></span></div>
                            </td>
                            <td width="10%" class="title-grid">
                                <div align="center"><span class="Estilo11"><b>RV</b></span></div>
                            </td>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div id="listado" style="height:290px; width:100%;position:static;"></div>
                    <div align="center" id="registros" style="overflow:auto;height:30px;visibility:hidden;top:180px;">
                        <font class="adminlist">No Existen Registros Asociados a la Consulta....</font>
                    </div>
                    <div class="clr"></div>
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
<div id="dialogoCarga" title="Carga de informe manual">
    <div class="progress-label">Comenzando carga...</div>
    <div id="progressbar"></div>
</div>
<div id="dialogoValidacion" title="Validación Ejecutada">
    <span>Se ha enviado a validar el informe correctamente. Este proceso puede durar varios minutos...</span>
</div>
<div id="loading-spinner" class="loader loader-default" data-text="Cargando información..."></div>
<form id="formCargaMain" action="../main" method="post"></form>
</body>
</html>




