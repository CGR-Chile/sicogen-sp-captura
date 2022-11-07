<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"%>

<table class="adminlist" width="100%">
	<thead><tr>
<div style="float:right;margin-right: 10px;">
	<div id="contTipoInformes" class="filTpInforme" style="float:left;margin: 15px 10px 0 0;">
		<div style="color: #464749;">Tipo de Informe</div>
		<div style="font: bold 12px sans-serif;">
			<form:select id="contTipoInformes" path="tipoInforme" onchange="cargaEstadosInformes();">
				<form:options items="${tipoInforme}"  itemValue="codigo" itemLabel="nombre"/>
			</form:select>
		</div>
	</div>
	<div id="contFiltroEjercicio" class="filEjercicio" style="float:left;margin: 15px 10px 0 5px;">
		<div style="color: #464749;">Ejercicio</div>
		<div>
			<form:select id="cbEjercicio" path="ejercicios" onchange="loadPeriodoEjercicio();">
				<form:options items="${ejercicios}" itemValue="ejercicioId" itemLabel="ejercicioNombre"/>
			</form:select>
		</div>
	</div>
	<div id="contFiltroEjercicioCorr" class="filEjercicio" style="float:left;margin: 15px 10px 0 5px;">			
		<div style="color: #464749;">Proceso de Corrección</div>
		<div>
			<select id="cbPeriodos" 
					class="Selectano"
					onchange="cargaEstadosInformesCorreccion()"							
					style="width:150px">
				<option data-cod="-1" value="-1">Seleccione corrección</option>
				<c:forEach var="lista" items="${correccionesPendientes}">
					<option aux-ejer="${lista.ejercicioID}"
							aux-peri="${lista.idPeriodoEjercicio}"
							aux-info="${lista.informeID}"
							data-cod="${lista.periodoCodigo}"
							value="${lista.idPeriodoEjercicio}">
							${lista.periodoNombre}
					</option>
				</c:forEach>
			</select>
		</div>
	</div>
</div>
	</tr>
	</thead>
</table>