<%@ page contentType="text/html;charset=UTF-8;" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="s" uri="http://java.sun.com/jsp/jstl/core" %>


<!-- Acciones de Carga de Informes y Pop Up mensajes de error-->
<script src="/SICOGEN2_PUB/resources/js/ajax/libs/1.10.2/jquery-ui.min.js"></script>
<script src="/SICOGEN2_PUB/resources/js/ajax/libs/1.9.1/jquery.min.js"></script>
<script src="/SICOGEN2_PUB/resources/js/a-jquery.form.js"></script>
<script src="/SICOGEN2_PUB/resources/js/jquery-ui.js"></script>




<%String clase = ""; %>
<table id="tblUpInformes" class="adminlist" style="clear:both;border-collapse:collapse ;" width="100%">
	<c:forEach items="${listaInformes}" varStatus="rowInf" var="listaInformes">
		<c:if test="#rowInf.odd==true">
			<%clase = "rwdetInfImp";%>
		</c:if>

		<tr class="<%=clase%>">
			<td><div style="display:none;" class="rwdetInfImp"  id="inf0${listaInformes.informeId}_cel01" cod-inf="${listaInformes.informeCodigo}" style="float:left;display:inline-block;width:0%;vertical-align:top;visibility: hidden;">
					${listaInformes.informeId}-${listaInformes.informeArchivo}

				<c:choose>
					<c:when test="${listaInformes.informeEstadoId=='1' or listaInformes.informeEstadoId=='3' or listaInformes.informeEstadoId=='4' or listaInformes.informeEstadoId=='5'}">
						<label id="idFileUpload">${listaInformes.idFileUpload}</label>
					</c:when>
				</c:choose>
			</div>
			</td>

			<td><div style="float:left;display:inline-block;width:100%;vertical-align:top;">${listaInformes.informeNombre}</div></td>
			<td><div id="inf0${listaInformes.informeId}_cel04"  class="cel04"><input type="text" id="inf0${listaInformes.informeId}_filename"
																					 class="txtFile" value="${listaInformes.informeArchivo}"
																					 disabled="disabled" /></div></td>
			<td><div id="inf0${listaInformes.informeId}_cel03" class="cel03">


				<!-- formulario carga iterado -->
				<c:choose>
					<c:when test="${(listaInformes.informeEstadoId=='6') or (listaInformes.informeEstadoId=='7')}">
						<button id="noCarga" type="button" class="botonFile transparent" disabled>Examinar...</button>
					</c:when>
					<c:otherwise>
						<form id="idForm${listaInformes.informeId}" enctype="multipart/form-data" class="formFile" action="" method="post">
							<input value="d" type="file" class="files" name="fileUpload" onchange="realizaReglasdeCarga(${listaInformes.informeId}" id="fileUpload">
							<button id="valCarga" type="button" class="botonFile transparent">Examinar...</button>
						</form>
					</c:otherwise>
				</c:choose>
			</div>
				<input id="tituloError${listaInformes.informeId}" type="hidden" value="${listaInformes.informeCodigo}-${listaInformes.informeNombre}"></input>
			</td>
			<td colspan="">
			<input class="botonFile transparent" name="examinar" type="file" value="sssss"/>
				<!-- Aqui iba el icono sin movimiento, NA al Sector Publico -->
				<div id="inf0${listaInformes.informeId}_cel10" class="cel10"></div>
			</td>
			<td><div id="inf0${listaInformes.informeId}_cel11"></div></td>

			<td>
				<div id="msgEstado" class="msgEstado">
					<c:choose>
						<c:when test="${listaInformes.informeEstadoId=='4' and fn:containsIgnoreCase(listaInformes.informeCodigo, 'EFS')}">
							<div style="margin-left:50px;margin-top:5px;">Cargado y Validado exitosamente.</div>
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='1' or listaInformes.informeEstadoId=='3'}">
							<div style="margin-left:50px;margin-top:5px;">Cargado exitosamente.</div>
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='-1'}">
							<img style="width:25px;height: 25px; float:left;margin-left:16px;"  src="/SICOGEN2_PUB/resources/img/error_carga.png" onclick="verErroresCarga()" title="errores de carga" />
							<div style="margin-left:50px;margin-top:5px;" onclick="verErroresCarga()">Ver errores de carga</div>
						</c:when>
					</c:choose>
				</div>
			</td>

			<td><div id="inf0${listaInformes.informeId}_cel11" style="width:6px;"></div></td>

			<td>
				<div id='imgEstado_${listaInformes.idFileUpload}' class="cel08">
					<c:choose>
						<c:when test="${listaInformes.informeEstadoId=='3'}">
							<img id="estado_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/error.png" style="width:25px;float:left;margin-left:16px;" title="Informe Con Errores">
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='4'}">
							<img id="estado_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/Validado.png" style="width:25px;float:left;margin-left:16px;" title="Informe Validado">
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='5'}">
							<img id="estado_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/ValidadoOBS.png" style="width:25px;float:left;margin-left:16px;" title="Informe Validado con observaciones">
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='6'}">
							<img id="estado_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/Procesado.png" style="width:25px;float:left;margin-left:16px;" title="Informe Procesado">
						</c:when>
						<c:when test="${listaInformes.informeEstadoId=='7'}">
							<img id="estado_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/ProcesadoOBS.png" style="width:25px;float:left;margin-left:16px;" title="Informe Procesado con observaciones">
						</c:when>
						</c:choose>
				</div>
			</td>
			<c:choose>

				<c:when test="${not fn:containsIgnoreCase(listaInformes.informeCodigo, 'EFS')}">

					<td>
						<div id="inf0${listaInformes.informeId}_cel11"></div>
					</td>
					<td>
						<c:choose>
							<c:when test="${listaInformes.informeEstadoId=='3' or listaInformes.informeEstadoId=='4'
														 or listaInformes.informeEstadoId=='5' or listaInformes.informeEstadoId=='6'
														 or listaInformes.informeEstadoId=='7'}">
								<img id="icon_rv_${listaInformes.idFileUpload}" src="/SICOGEN2_PUB/resources/img/rv.png" cstyle="float:left;margin-left:16px;" title="Reporte de Validación" onclick="obtieneReporteValIC(${listaInformes.idFileUpload})"/>
							</c:when>
							<c:when test="${listaInformes.informeEstadoId=='1'}">

								<img id="icon_rv_${listaInformes.idFileUpload}"/>
							</c:when>
						</c:choose>
					</td>

					<td>
						<div id="inf0${listaInformes.informeId}_cel12" class="cel12"></div>
					</td>
				</c:when>
				<c:otherwise>
					<td><div id="inf0${listaInformes.informeId}_cel11"></div></td>
					<td><div id="inf0${listaInformes.informeId}_cel12" class="cel12"></div></td>
				</c:otherwise>
			</c:choose>
			</tr>
	</c:forEach>
</table>

