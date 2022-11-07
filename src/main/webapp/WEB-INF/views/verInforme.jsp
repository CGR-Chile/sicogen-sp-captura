<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
		<title>Ver Informe IC</title>

		<spring:url value="/resources/css/reportes/validacion/cssInformeBase.css" var="cssInformeBase"/>
		<spring:url value="/resources/css/mensaje/jquery.alerts.css" var="alerts"/>
		<spring:url value="/resources/css/jquery-ui.css" var="jquery-ui"/>
		<spring:url value="/resources/css/reporteValidacion/reporteValidacionSP.css" var="reporteValidacionSP"/>


		<link type="text/css" href="${cssInformeBase}" rel="stylesheet"/>
		<link type="text/css" href="${alerts}" rel="stylesheet"/>
		<link type="text/css" href="${jquery-ui}" rel="stylesheet"/>
		<link type="text/css" href="${reporteValidacionSP}" rel="stylesheet"/>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
		<script src="/SICOGEN2_PUB/resources/js/jquery/jquery.base64.js"></script>
		<script src="/SICOGEN2_PUB/resources/js/jquery.fileDownload.js"></script>
		<script src="/SICOGEN2_PUB/resources/js/mensaje/jquery.alerts.js"></script>
		<script src="/SICOGEN2_PUB/resources/js/jquery/jquery-1.7.2.js"></script>
		<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

		<spring:url value="/resources/img/" var="images"/>

		<script>
			$(window).load(function(){
				$('.loader').fadeOut(function(){  $('#getInforme').fadeIn(); });
			});
		</script>


		<script>
			$(function () {
				var $chk = $("#grpChkBox input:checkbox");
				var $tbl = $("#someTable");
					$chk.prop('checked', false);
					$chk.click(function () {
						var colToHide = $tbl.find("." + $(this).attr("name"));
						$(colToHide).toggle();
					});
			});
		</script>

	</head>
	
	<body>
		
		<div class="loader" style="height:200px;left:35%; position: fixed !important;display:block;background-color: #fff;
			width:150px;height:300px;margin:15px auto 5px auto;padding: 50px 100px 20px;border: 2px solid;
			border-radius: 25px;-moz-border-radius: 25px; top: 3%;left: 30%;color: #333;z-index: 1002;overflow: auto;">
			<img src="${images}loader.gif" ></img>
		</div>
		<div class="loader" style="opacity: 0;-moz-opacity: 0;filter: alpha(opacity=0);position: absolute;top: 0;left: 0;width: 100%;height: 100%;max-height: 110%;background:#000;z-index: 1001;"></div>

		<form:form id="getInforme" items="${infoGeneral}"  var="listado" action="javascript:void(0);" method="post" style="display:none;">


		<div id="reportePDF" >
			<table id="reporte" style="width:1270px;">

				<tr style="height: 120px;">
					<td style="height:120px" colspan="6"><img src="${images}sicogenii_logo.png" style="height:96px;width:322px;"></img></td>
				</tr>
				<tr></tr>
				<tr style="background-color: #d7d7d9;text-align:center;">
					<td colspan="3" style="color: #454648;font:bold 20px Arial;padding: 10px;width:1270px;">INFORME CONTABLE</td>
				</tr>
				<tr style="height: 118px;">
					  <td style="width:100%">
						<table id="infGen" style="font: normal 12px Arial; border-collapse: collapse; width:1270px;">
							<thead style="text-align:left;">
								<tr style="background-color:#464749;color:#fff;font-stretch:bold;">
									<th colspan="2" style="padding: 2.5px 0 2.5px 5px;">Información General</th>
								</tr>
							</thead>
							<tbody style="font: bold 10px sans-serif;">
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">ESTADO DE VALIDACIÓN</td>
									<td style="background-color:#d7d7d9;width:260px;">${infoGeneral.estado}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">TIPO DE INFORME</td>
									<td style="background-color:#d7d7d9;width:260px;">${infoGeneral.tipoInforme}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">INFORME</td>
									<td style="background-color:#d7d7d9;width:260px;">${infoGeneral.informe}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">PERÍODO</td>
									<td style="background-color:#d7d7d9;width:260px;mso-number-format:'\@';">${infoGeneral.periodo}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">EJERCICIO</td>
									<td style="background-color:#d7d7d9;width:260px;mso-number-format:'\@'">${infoGeneral.ejercicio}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">USUARIO</td>
									<td style="background-color:#d7d7d9;width:260px;">${infoGeneral.usuario}</td>
								</tr>
								<tr>
									<td style="background-color:#f8f8f8;width:195px;">ENTIDAD</td>
									<td style="background-color:#d7d7d9;width:260px;">${infoGeneral.entidad}</td>
								</tr>
								<tr style="height: 11px;">
									<td style="background-color:#f8f8f8;width:195px;"></td>
									<td style="background-color:#d7d7d9;width:260px;"></td>
								</tr>
							</tbody>
						</table>
						<input type="hidden" id="idFile" value="${infoGeneral.idFileIp}"/></input>
					</td>
				</tr>
				<tr></tr>


				<tr style="background-color:#0066b8;color:#fff;text-align:left; font: normal 12px Arial;">
					<td>Mostrar/Ocultar Columnas: </td>
				</tr>

				<tr>
					<td style="width:100%">
						<table id="grpChkBox" style="font: normal 12px Arial; border-collapse: collapse; width:1270px;">
							<tr style="background-color: #d7d7d9;">
					        	<td><input type="checkbox" name="8y9" /><strong>"Código BIP" y "Denominación Proyecto"</strong></td>
						        <td><input type="checkbox" name="deuda" /><strong>"Deuda"</strong></td>
						        <td><input type="checkbox" name="pc" /><strong>"Pago Contable"</strong></td>
						        <td><input type="checkbox" name="pp" /><strong>"Pago Presupuestario"</strong></td>
						        <td><input type="checkbox" name="dh" /><strong>"Debe y Haber (USD)"</strong></td>
						    </tr>
						</table>
					</td>
        		</tr>


				<c:out escapeXml="false" value="${htmlRV}" />

			</table>

			<div style="text-align:center;width:1270px">
				<div id="contBotones">
					<hr class="separador" ></hr>
				<!--  	<button id="pdf" class="boton">PDF</button>
					<button id="excel" class="boton">Excel</button> -->
					<button id="cerrar" class="boton" onClick = "window.close()">Salir</button>
				</div>
				<div id="pie" class="Pauta_texto">
					<span>Teatinos 56 , Santiago de Chile, Tel&eacutefono 56-2 24021100 -&nbsp;C&oacutedigo Postal: 8340521</span></br>
					<span id="reqmin">Sitio web optimizado para ser visualizado en una resolución de pantalla de 1024 x 768 píxeles, en los navegadores iExplorer 10 o superior, Firefox 3.6 o superior y Chrome 8 o superior</span>
				</div>

			</div>

		 </div>

		</form:form>
	</body>
	
</html>
