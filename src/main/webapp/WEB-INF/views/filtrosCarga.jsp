<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"%>

	<td colspan="4"><b>Tipo de Informe</b>
		<form:select id="cbTipoInformes" cssClass="Selectano" path="tipoInforme" onchange="busqueda('${images}');">
				<form:options items="${tipoInforme}"  itemValue="codigo" itemLabel="nombre"/>
		</form:select>


		<b>Ejercicio</b>
		<form:select id="cbEjercicio"  cssClass="Selectano" path="ejercicios" onchange="loadPeriodoEjercicio();">
				<form:options items="${ejercicios}" itemValue="ejercicioId" itemLabel="ejercicioNombre"/>
		</form:select>


		<b>Periodo</b>
		<select id="cbPeriodos" class="Selectano" onchange="busqueda('${images}')">
              <option data-cod="-1" value="-1">Seleccione Periodos</option>
				<c:forEach var="lista" items="${listaPeriodos}">
					<c:if test="${lista.periodoCodigo != '00'}">
						<option data-cod="${lista.periodoCodigo}" value="${lista.periodoId}">
								${lista.periodoNombre}
						</option>
					</c:if>
				</c:forEach>
			</select>
		</td>
