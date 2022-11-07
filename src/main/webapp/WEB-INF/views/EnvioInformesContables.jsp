<%--
  Created by IntelliJ IDEA.
  User: kibernum
  Date: 2020-11-16
  Time: 16:34
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${!empty salidaEnvioCgrError}">
    <div class="row mt-2">
        <div class="col-md-12">
            <h6><strong>INFORMES QUE NO CUMPLEN CON CONDICIONES PARA SER ENVIADOS A CGR</strong></h6>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="adminlist">
                <thead>
                <tr class="title-grid">
                    <td class="title-grid" width="50%">INFORME</td>
                    <td class="title-grid" width="30%">PERÍODO</td>
                    <td class="title-grid" width="20%">EJERCICIO</td>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="inf" items="${salidaEnvioCgrError}" varStatus="status">
                    <c:choose>
                        <c:when test="${status.index % 2 == 0}">
                            <c:set var="rowClass" value="row0"/>
                        </c:when>
                        <c:otherwise>
                            <c:set var="rowClass" value="row1"/>
                        </c:otherwise>
                    </c:choose>
                    <tr class="<c:out value="${rowClass}"/>">
                        <td>${inf.informeNombre}</td>
                        <td style="text-align: center;">${inf.informePeriodo}</td>
                        <td style="text-align: center;">${inf.informeEjercicio}</td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</c:if>
<div class="row mt-4">
    <div class="col-md-12">
        <h6><strong>SELECCIÓN DE INFORMES A ENVIAR</strong></h6>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <table class="adminlist" id="tblEnvInformes">
            <thead>
            <tr class="title-grid">
                <td class="title-grid" width="5%"></td>
                <td class="title-grid" width="45%">INFORME</td>
                <td class="title-grid" width="30%">PERÍODO</td>
                <td class="title-grid" width="20%">EJERCICIO</td>
            </tr>
            </thead>
            <tbody>
            <c:choose>
                <c:when test="${!empty salidaEnvioCgr}">
                    <c:forEach var="inf" items="${salidaEnvioCgr}" varStatus="status">
                        <c:choose>
                            <c:when test="${status.index % 2 == 0}">
                                <c:set var="rowClass" value="row0"/>
                            </c:when>
                            <c:otherwise>
                                <c:set var="rowClass" value="row1"/>
                            </c:otherwise>
                        </c:choose>
                        <tr class="<c:out value="${rowClass}"/>">
                            <td style="text-align: center;"><input type="checkbox" id="chk_envInf_${inf.informeId}" name="${inf.informeId}/${inf.informeNombre}/${inf.informeEstado}/${inf.informeCodigo}/${inf.informePeriodo}/${inf.informeEjercicioCod}/${inf.informeEjercicio}/${inf.tipoInformeNombre}/${inf.informePeriodoCod}/${inf.informeMensaje}/"></td>
                            <td>${inf.informeNombre}</td>
                            <td style="text-align: center;">${inf.informePeriodo}</td>
                            <td style="text-align: center;">${inf.informeEjercicio}</td>
                        </tr>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <tr class="row0">
                        <td style="text-align: center;" colspan="4">No hay informes para enviar</td>
                    </tr>
                </c:otherwise>
            </c:choose>
            </tbody>
        </table>
    </div>
</div>
<div class="row mt-4">
    <div class="col-md-6 justify-content-end d-flex">
        <button type="button" class="btn btn-primary" onclick="closeDialogEnvioInforme();">Volver</button>
    </div>
    <div class="col-md-6">
        <c:choose>
            <c:when test="${!empty salidaEnvioCgr}">
                <button type="button" class="btn btn-primary" onclick="enviaInformesDos();">Enviar Informes</button>
            </c:when>
            <c:otherwise>
                <button type="button" class="btn btn-primary" onclick="enviaInformesDos();" disabled>Enviar Informes</button>
            </c:otherwise>
        </c:choose>
    </div>
</div>
