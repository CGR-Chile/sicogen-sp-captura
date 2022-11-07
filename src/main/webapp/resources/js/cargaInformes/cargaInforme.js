var progressbar, progressLabel, dialogButtons, dialog, ajaxReq, rowInforme, dialogValidacion, validacionButtons;

$(document).ready(function() {
	progressbar = $( "#progressbar" ),
	progressLabel = $( ".progress-label" ),
	dialogButtons = [{
		text: "Cancelar carga",
		click: cancelarSubida
	}],
	dialog = $( "#dialogoCarga" ).dialog({
		autoOpen: false,
		closeOnEscape: false,
		resizable: true,
		buttons: dialogButtons
	});

	progressbar.progressbar({
		value: false
	});

	/* Dialogo validacion */
	validacionButtons = [{
		text: "OK",
		click: cierraDialogo
	}],
	dialogValidacion = $("#dialogoValidacion").dialog({
		autoOpen: false,
		buttons: validacionButtons
	});
});

function cierraDialogo() {
	dialogValidacion.dialog("close");
}

function cierraDialogoCarga() {
	dialog
		.dialog( "option", "buttons", dialogButtons )
		.dialog( "close" );
	progressbar.progressbar( "value", false );
	progressLabel
		.text( "Comenzando carga..." );
}

function cancelarSubida() {
	$("#tablaCarga tbody").empty();
	$("#tablaCarga tbody").append(rowInforme);
	ajaxReq.abort();
	dialog
		.dialog( "option", "buttons", dialogButtons )
		.dialog( "close" );
	progressbar.progressbar( "value", false );
	progressLabel
		.text( "Comenzando carga..." );
}

function realizaReglasdeCarga(idForm, idInforme, rutaImg){

	//alert("realizaReglasdeCarga !!!");
	console.log(">>>>>>>>>>>>>>>>>>> PRUEBA CARGAS INFORME IC: ");

	var idTipInf = $("#cbTipoInformes").val();

	var idPeriodo = $('#cbPeriodos option:selected').val();


	console.log(">>>>>>>>>>>>>>>>>>>  idPeriodo: " + idPeriodo);

	var ejercicioOld = $("#cbEjercicio").text().trim();
	console.log(">>>>>>>>>>>>>>>>>>>  ejercicio Old: " + ejercicioOld);

	var ejercicio = $('#cbEjercicio option:selected').text().trim();
	console.log(">>>>>>>>>>>>>>>>>>>  ejercicio Nuevo OK: " + ejercicio);

	var codPeriodoOld = $('#cbPeriodos option:selected').attr('data-cod');
	console.log(">>>>>>>>>>>>>>>>>>>  codPeriodo Old: " + codPeriodoOld);

	var codPeriodo = $('#cbPeriodos option:selected').val();
	console.log(">>>>>>>>>>>>>>>>>>>  codPeriodo New OK: " + codPeriodo);

	var codInforme = $('#inf0'+idInforme+'_cel01').attr('cod-inf');
	console.log(">>>>>>>>>>>>>>>>>>>  codInforme: " + codInforme);

	//alert('Adelante llega vacion idPeriodo : '+idPeriodo);
	console.log('Adelante llega vacion idPeriodo : '+idPeriodo);


	console.log("CargaInforme - realizaReglasdeCarga - idTipInf: "+idTipInf+" idPeriodo: "+idPeriodo+" ejercicio: "+ejercicio+" codPeriodoOld: "+codPeriodoOld+" codInforme: "+codInforme);

	//alert("CargaInforme - realizaReglasdeCarga - idTipInf: "+idTipInf+" idPeriodo: "+idPeriodo+" ejercicio: "+ejercicio+" codPeriodo: "+codPeriodo+" codInforme: "+codInforme);

	var action = 'InformeUpload?inf='+idInforme+'&codPeriodo='+codPeriodoOld+'&codEjercicio='+ejercicio;

	var form = $("#idForm"+idForm);

	ajaxReq = $.ajax({
		url : action,
		type : 'POST',
		data : new FormData(form[0]),
		cache : false,
		contentType : false,
		processData : false,
		xhr: function(){

			var xhr = $.ajaxSettings.xhr() ;

			xhr.upload.onprogress = function(event){
				var perc = Math.round((event.loaded / event.total) * 100);

				if (perc == 100) {
					progressbar.progressbar( "value", false );
					progressLabel
						.text( "Cargando datos en el sistema..." );
				} else {
					progressLabel.text("Cargando informe: " + perc + "%");
					progressbar.progressbar("value", perc);
				}
			};
			return xhr ;
		},
		beforeSend: function( xhr ) {
			//Reset alert message and progress bar
			$("#dialogoCarga").dialog("open");

			var spinnerImg = '<img src="' + rutaImg + 'loader.gif" style="width: 20px;"/>';

			$('.obsCarga').empty();
			$('.estadoInf').empty();
			$('.vistaRV').empty();

			$('.obsCarga').append(spinnerImg);
			$('.estadoInf').append(spinnerImg);
			$('.vistaRV').append(spinnerImg);

		}
	});

	ajaxReq.done(function(informe) {
		progressLabel.text( "Carga completada" );
		progressbar.progressbar("value", 100);
		dialog.dialog( "option", "buttons", [{
			text: "Cerrar",
			click: cierraDialogoCarga
		}]);
		$(".ui-dialog button").last().trigger( "focus" );

		$('#idFileUpload').val(informe.idFileUpload);

		var spanCargado = '<span>Cargado exitosamente.</span>';
		var imgConError = '<img class="tiprEstado" src="' + rutaImg + 'publish_x.png" data-tip="Con errores"/>';
		var imgCargado = '<img class="tiprEstado" src="' + rutaImg + 'NotMovProc.png" data-tip="Listo para validar"/>';
		var linkRV = '<a href="../validacion/Reporte?idFileUp=' + informe.idFileUpload + '" target="_blank"><img src="' + rutaImg + 'rv.png" title="Reporte de Validación"/></a>';

		$('.obsCarga').empty();
		$('.estadoInf').empty();
		$('.vistaRV').empty();

		$('.obsCarga').append(spanCargado);

		if (informe.informeEstadoId === '3') {
			$('.estadoInf').append(imgConError);
			$('.vistaRV').append(linkRV);
			$('.fileInput').val('');
		} else {
			$('.estadoInf').append(imgCargado);
		}

		$('.tiprEstado').tipr({
			'alt': false,
			'marginAbove': -65,
			'marginBelow': 7,
			'mode': 'above',
			'space': 70,
			'speed': 300
		});

	});

	ajaxReq.fail(function(jqXHR) {
		progressLabel.text( "Carga fallida: " + jqXHR.responseText + " (" + jqXHR.status + " - " + jqXHR.statusText + ")");
		progressbar.progressbar( "value", 0);
		dialog.dialog( "option", "buttons", [{
			text: "Cerrar",
			click: cierraDialogoCarga
		}]);
		$(".ui-dialog button").last().trigger( "focus" );
		/* Limpia nombre del archivo */
		$('.fileInput').val('');
	});
}

function busqueda(rutaImg) {

	var periodo = document.getElementById("cbPeriodos").value;
	var tipo = document.getElementById("cbTipoInformes").value;
	var url = "../informes/listadoInformes?periodo=" + periodo + "&tipo=" + tipo;

	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		timeout : 30000,
		success : function (data) {

			$("#tablaCarga tbody").empty();

			data.forEach(function (informe, index) {
				var idEstadoInforme = informe.informeEstadoId;
				rowInforme = '<tr class="' + informe.rowClass + '">' +
								 	'<td width="35%" align="center">' +
										'<span>' + informe.informeNombre + '</span>' +
										'<input type="hidden" value="' + informe.idFileUpload +'" id="idFileUpload"/>' +
									'</td>' +
									'<td width="30%" align="center">';

				/* Selección archivos */
				if (idEstadoInforme === '6' || idEstadoInforme === '7') {
					rowInforme = rowInforme + '<button type="button" class="botonFile transparent" disabled title="' + informe.informeArchivo + '">' + informe.informeArchivo + '</button>' +
								 			  '<span class="editlinktip hasTip" title="Examinar...">Examinar...</span>';
				} else {
					rowInforme = rowInforme + '<form id="idForm' + index + '" enctype="multipart/form-data" action="javascript:void(0);">' +
												 '<input type="file" onchange="realizaReglasdeCarga(' + index + ', \'' + informe.informeId + '\', \'' + rutaImg + '\')" name="file" class="fileInput"/>' +
											  '</form>';
				}

				rowInforme = rowInforme + '</td>' +
							 			  '<td width="20%" align="center">' +
										  	'<div class="obsCarga">' +
										  		'<span>';

				/* Observación carga */
				if (idEstadoInforme === '1' ||
					idEstadoInforme === '3' ||
					idEstadoInforme === '4' ||
					idEstadoInforme === '5' ||
					idEstadoInforme === '6' ||
					idEstadoInforme === '7' ||
					idEstadoInforme === '-1') {
					rowInforme = rowInforme + 'Cargado exitosamente.';
				}

				rowInforme = rowInforme + 	'</span>' +
										  '</div>' +
										'</td>' +
										'<td width="10%" align="center">' +
											'<div class="estadoInf">';

				/* Estado informe */
				if (idEstadoInforme === '3') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'error.png" data-tip="Con errores"/>';
				} else if (idEstadoInforme === '4') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'Validado.png" data-tip="Validado"/>';
				} else if (idEstadoInforme === '5') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'ValidadoOBS.png" data-tip="Validado con observación(es)"/>';
				} else if (idEstadoInforme === '6') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'Procesado.png" data-tip="Procesado"/>';
				} else if (idEstadoInforme === '7') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'ProcesadoOBS.png" data-tip="Procesado con observación(es)"/>';
				} else if (idEstadoInforme === '1') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'NotMovProc.png" data-tip="Listo para validar"/>';
				} else if (idEstadoInforme === '-1') {
					rowInforme = rowInforme + '<img class="tiprEstado" src="' + rutaImg + 'loader.gif" data-tip="Validando..." style="width: 20px;"/>';
				}

				rowInforme = rowInforme + 	'</div>' +
										'</td>' +
										'<td width="10%" align="center">' +
											'<div class="vistaRV">';

				/* RV */
				if (idEstadoInforme === '3' ||
					idEstadoInforme === '4' ||
					idEstadoInforme === '5' ||
					idEstadoInforme === '6' ||
					idEstadoInforme === '7') {
					rowInforme = rowInforme + '<a href="../validacion/obtenerValidacionIC?idFileUp=' + informe.idFileUpload + '" target="_blank"><img src="' + rutaImg + 'rv.png" title="Reporte de Validación"/></a>'
				} else if (idEstadoInforme === '-1'){
					rowInforme = rowInforme + '<a href="javascript:actualizaEstadoInformeIC(\'' + rutaImg + '\');"><img src="' + rutaImg + 'refresh.png" style="width: 20px;" data-tip="Check validación"/></a>'
				}

				rowInforme = rowInforme + 	'</div>' +
										'</td>' +
									'</tr>';

				$("#tablaCarga tbody").append(rowInforme);
			});

			$('.tiprEstado').tipr({
				'alt': false,
				'marginAbove': -65,
				'marginBelow': 7,
				'mode': 'above',
				'space': 70,
				'speed': 300
			});

			$("#loading-spinner").removeClass("is-active");
		},
		error : function (jqXHR, textStatus) {
			console.log(jqXHR.responseText);
			var textoError;

			if (textStatus === "timeout") {
				textoError = "La petición ha durado más de lo normal"
			} else {
				textoError = "Ha ocurrido un error interno en el servidor";
			}

			$.confirm({
				title: 'Disculpa las molestias...',
				content: textoError,
				type: 'red',
				typeAnimated: true,
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					tryAgain: {
						text: 'Intentarlo de nuevo',
						btnClass: 'btn-red',
						action: function(){
							busqueda();
						}
					},
					close: {
						text: 'Cerrar',
						action: function(){
						}
					}
				}
			});

			$("#loading-spinner").removeClass("is-active");
		},
		beforeSend: function () {
			$("#loading-spinner").addClass("is-active");
		}
	});
}

function enviaValidacionInformeIC(rutaImg) {

	var idFileUpload = $("#idFileUpload").val();
	var tbodyAnterior = $("#tablaCarga tbody").html();

	$.ajax({
		type : "POST",
		url : "enviaValidacion?idArchivo=" + idFileUpload,
		success : function (data) {
			$("#loading-spinner").removeClass("is-active");
			$('.vistaRV').append('<a href="javascript:actualizaEstadoInformeIC(\'' + rutaImg + '\');"><img src="' + rutaImg + 'refresh.png" style="width: 20px;"/></a>');
			dialogValidacion.dialog("open");
		},
		error : function (jqXHR) {

			$("#tablaCarga tbody").empty();
			$("#tablaCarga tbody").append(tbodyAnterior);

			console.log(jqXHR.responseText);

			$.confirm({
				title: 'Disculpa las molestias...',
				content: "Ha ocurrido un error interno en el servidor",
				type: 'red',
				typeAnimated: true,
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					close: {
						text: 'Cerrar',
						action: function(){
						}
					}
				}
			});

			$("#loading-spinner").removeClass("is-active");
		},
		beforeSend: function () {
			$("#loading-spinner").addClass("is-active");

			$('.estadoInf').empty();
			$('.vistaRV').empty();

			$('.estadoInf').append('<img src="' + rutaImg + 'loader.gif" style="width: 20px;"/>');
		}
	});
}

function actualizaEstadoInformeIC(rutaImg) {

	var idFileUpload = $("#idFileUpload").val();
	var tbodyAnterior = $("#tablaCarga tbody").html();

	$.ajax({
		type : "GET",
		url : "estadoId?idArchivo=" + idFileUpload,
		success : function (idEstado) {
			if (idEstado !== -1 && idEstado !== 1) {
				$('.estadoInf').empty();
				$('.vistaRV').empty();
				var imgInforme = '';

				if (idEstado === 3) {
					imgInforme = imgInforme + '<img class="tiprEstado" src="' + rutaImg + 'publish_x.png" data-tip="Con errores"/>';
				} else if (idEstado === 4) {
					imgInforme = imgInforme + '<img class="tiprEstado" src="' + rutaImg + 'Validado.png" data-tip="Validado"/>';
				} else if (idEstado === 5) {
					imgInforme = imgInforme + '<img class="tiprEstado" src="' + rutaImg + 'ValidadoOBS.png" data-tip="Validado con observación(es)"/>';
				}

				$('.estadoInf').append(imgInforme);
				$('.vistaRV').append('<a href="../validacion/Reporte?idFileUp=' + idFileUpload + '" target="_blank"><img src="' + rutaImg + 'rv.png" title="Reporte de Validación"/></a>');
			}
			$("#loading-spinner").removeClass("is-active");
		},
		error : function (jqXHR) {

			$("#tablaCarga tbody").empty();
			$("#tablaCarga tbody").append(tbodyAnterior);

			console.log(jqXHR.responseText);

			$.confirm({
				title: 'Disculpa las molestias...',
				content: "Ha ocurrido un error interno en el servidor",
				type: 'red',
				typeAnimated: true,
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					close: {
						text: 'Cerrar',
						action: function(){
						}
					}
				}
			});

			$("#loading-spinner").removeClass("is-active");
		},
		beforeSend: function () {
			$("#loading-spinner").addClass("is-active");

			$('.estadoInf').empty();

			$('.estadoInf').append('<img src="' + rutaImg + 'loader.gif" style="width: 20px;"/>');
		}
	});

}

function cargaMain() {
	$("#loading-spinner").addClass("is-active");
	$('#formCargaMain').submit();
}