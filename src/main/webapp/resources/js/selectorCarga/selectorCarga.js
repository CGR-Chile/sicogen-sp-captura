
function verErroresCarga(){
	
	console.log('verErroresCarga');
	var errores='';
	errores=$('#dialogReglaCarga').clone();
	console.log('errores : '+errores);
	var $dialog = $('<div></div>')
    	.dialog({height: 250,width: 600, modal: true,
    		//title: $('#tituloError'+infId).val(),
    		title: 'Errores de Carga',
    		close: function(event, ui){	$(this).remove();}});
	$dialog.dialog('open');
	$dialog.html(errores);
	
	$(".ui-icon-closethick").css('background-position', '-32px -192px');
	$(".ui-icon-closethick").css('background-color', '#F2F2F2');
	$(".ui-icon-closethick").css('top', '0px');
	$(".ui-icon-closethick").css('left', '0px');
	
}

function obtenerDescarga()
{ 
//	alert("descargar");
	var idTipInf = $("#cbTipoInformes").val();
	if (idTipInf == 1 )
	{
//	 	alert("DESCARGA XML");
		var parametros = 'idFileUp=' + idFileUpload;
		dowFil = 'descargaInforme.action?' + parametros;
		location.href = dowFil;
	}else{
//	 	alert("DESCARGA PDF");
		var parametros = 'idFileUp='+idFileUpload;
		dowFil = 'descargarPDF.action?' + parametros;
		location.href=dowFil;	 	
	}

}

function realizaReglasCargaPI(idForm, idInforme ){
	
	//document.getElementById('fade').style.display='none';
	//document.getElementById('idForm'+idInforme).style.display='none';
	//$("body").css("cursor", "wait");
	//$('#textoCargando').text('Subiendo Archivo');
	//$('#estadoForm').text('');
	//document.getElementById('fade').style.display='block';
	//document.getElementById('idForm'+idInforme).style.display='block';
	
	var anio = $('#cbEjercicio option:selected').text();
	var idTipInf = $("#cbTipoInformes").val();
	var idPeriodo = $("#cbPeriodos").val();

	var action = 'uploadFilePI?anio='+anio;	
	console.log("action: "+ action);
	console.log("idForm: "+ idForm);
	
	$("#idFormPI").ajaxSubmit({
		cache : false,
		type: "POST",
		url: action,
		scriptCharset: 'windows-1252',
		contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		jsonpCallback: 'jsonpCallback',
		data: $(this).serialize(),
		dataType:'html',
		//sizeLimit: (15000 * 1024), no funciona
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeCargaXML" class="overlay" style="display:block"></div>'+
				 '<div id="waitCargaXML" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando archivo</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},
		complete:function( XMLHttpRequest ) {
			console.log("realizaReglasCarga: complete");
			
			$('#waitCargaXML').remove();
			$('#fadeCargaXML').remove();
		},
		success: function(data){
			console.log("realizaReglasCarga: success");
			$("body").css("cursor", "default");
			$('#tablaDocumentosCarga').html(data);
		}/* No se ha probado, quizas sirba para manejar la excepcion de Error en conexion con WS Carga PI*/ /*,
		onError: function (a, b, c, d) {
			console.log("realizaReglasCarga: onError");
			jAlert('Ocurrio un problema al subir el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
        },
        error: function (xhr, ajaxOptions, thrownError, exception) {
			console.log("realizaReglasCarga: error");
            alert(xhr.status);
            alert(ajaxOptions);
            alert(thrownError);
            alert(exception);
            alert(xhr.responseText);
            jAlert('Ocurrio un problema al subir el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
            
         }*/
	 });	
	
	/*$("#"+idForm +" input[type=file]").each(function (index) {
		
		console.log("index: "+ index);		
			
		$.ajaxSetup({ scriptCharset: "windows-1252",contentType:"application/json;charset=windows-1252"});
		$("#"+form).ajaxSubmit({
			cache : false,
			type: "POST",
			url: action,
			scriptCharset: 'windows-1252',
			contentType: "application/x-www-form-urlencoded;charset=windows-1252",
			jsonpCallback: 'jsonpCallback',
			data: $(this).serialize(),
			dataType:'json',
			sizeLimit: (15000 * 1024),
			complete:function( XMLHttpRequest ) {
				console.log("complete");
				$("body").css("cursor", "default");
			},
			success: function(data){
				console.log("success");
				console.log(data);
				$("body").css("cursor", "default");
			},
			onError: function (a, b, c, d) {
				console.log("onError");
				jAlert('Ocurrio un problema al subir el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
	        }
		 });	
	});*/
}


function realizaReglasCargaTDR(nroDoc){
	
	// Se debe rescartar los combobox para traer info de Sistradoc !!
	var ejercicio = $('#cbEjercicioTDR option:selected').text();
	var informe = $('#cbInforme option:selected').text();
	var tipoInforme = $('#cbTipoInforme option:selected').text();

	var periodo = $('#cbPeriodosTDR option:selected').val();
	//alert("cbPeriodosTDR: "+periodo);
	
	var action = 'uploadFileTDR?nroSistradoc='+nroDoc+'&ejercicio='+ejercicio+'&informe='+informe+'&tipoInforme='+tipoInforme+'&periodo='+periodo;	
	console.log("action: "+ action);
	
	$("#idFormTDR").ajaxSubmit({
		cache : false,
		type: "POST",
		url: action,
		scriptCharset: 'windows-1252',
		contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		jsonpCallback: 'jsonpCallback',
		data: $(this).serialize(),
		dataType:'html',
		//sizeLimit: (15000 * 1024), no funciona
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeCargaXML" class="overlay" style="display:block"></div>'+
				 '<div id="waitCargaXML" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando archivo</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},
		complete:function( XMLHttpRequest ) {
			console.log("realizaReglasCarga: complete");
			
			$('#waitCargaXML').remove();
			$('#fadeCargaXML').remove();
		},
		success: function(data){
			console.log("realizaReglasCarga: success");
			$("body").css("cursor", "default");
			$('#tablaDocumentosCarga').html(data);
		}
		/* No se ha probado, quizas sirva para manejar la excepcion de Error en conexion con WS Carga PI*/ /*,
		onError: function (a, b, c, d) {
			console.log("realizaReglasCarga: onError");
			jAlert('Ocurrio un problema al subir el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
        },
        error: function (xhr, ajaxOptions, thrownError, exception) {
			console.log("realizaReglasCarga: error");
            alert(xhr.status);
            alert(ajaxOptions);
            alert(thrownError);
            alert(exception);
            alert(xhr.responseText);
            jAlert('Ocurrio un problema al subir el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
         }*/
	 });	
	
}


function obtenerArchivoPI(idEjercicio){

	var action = 'obtenerArchivoPI.action?idEjercicio='+idEjercicio; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",cache: false,async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
				
				//Nose porque hay q ponerlo, pero funciona
				//document.getElementById('fade').style.display='none';
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){

				//Bueno pero borrra lo posterior
				console.log("success");
				//console.log(data);
				$('#tablaDocumentosCarga').html(data);
				
				//Bueno pero al usar tag Struts, jquery se cae :/
				//$(data).insertBefore($("#footerCarga"));
		    }
		});
}

/**
function obtenerArchivoTDR(nroDoc){

	var ejercicio = $('#cbEjercicioTDR option:selected').text();
	var informe = $('#cbInforme option:selected').text();
	var tipoInforme = $('#cbTipoInforme option:selected').text();
	
	if (ejercicio == 'Seleccione'){
		alert("Debe Seleccionar un Ejercicio para realizar la búsqueda !!");
		return;
	}
	
	var action = 'obtenerArchivoTDR.action?nroSistradoc='+nroDoc+'&ejercicio='+ejercicio+'&informe='+informe+'&tipoInforme='+tipoInforme; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",cache: false,async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				console.log("success");
				$('#tablaDocumentosCarga').html(data);
		    }
		});
}
*/


function obtenerTablaTDR(){

	var action = 'obtenerTablaTDR.action'; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",cache: false,async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
				
				//Nose porque hay q ponerlo, pero funciona
				//document.getElementById('fade').style.display='none';
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				//Bueno pero borrra lo posterior
				console.log("success");
				//console.log(data);
				$('#tablaDocumentosCarga').html(data);
				//Bueno pero al usar tag Struts, jquery se cae :/
				//$(data).insertBefore($("#footerCarga"));
		    }
		});
}

function obtenerTablaVacia(){

	var action = 'obtenerTablaVacia.action'; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",cache: false,async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				//Bueno pero borrra lo posterior
				console.log("success");
				//console.log(data);
				$('#tablaDocumentosCarga').html(data);
				//Bueno pero al usar tag Struts, jquery se cae :/
				//$(data).insertBefore($("#footerCarga"));
		    }
		});
}



function informeCargaSelected(idInformeSelected){
	
	var informeName = $('#cbInforme option:selected').text();
	console.log("informeCargaSelected : "+ idInformeSelected);
	
	var action = 'informeCargaSelected.action?cbInforme='+idInformeSelected+'&informeName='+informeName; 
	
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",cache: false,async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				//alert("data: "+data);
				//alert("textStatus: "+textStatus);
				//alert("request: "+request);
				
				//console.log(data);
				/*var tableDocument = '<table id="tblUpInformes" class="tblUpInformes" style="clear:both;border-collapse:collapse;width:100%;">'+
											'<thead style="background-color:#3F87C1;color:#FFFFFF;font: bold 10px arial;height:2px;">'+
										  '<tr style="height: 10px;text-align:left;">'+
						  				'<th style="background: #0066B8" colspan="1"></th>'+
											'<th style="background: #0066B8" colspan="10"><div style="margin-left:5px;">Carga de Documentos</div></th>'+
										   '</tr>'+
											'<tr style="height: 20px;text-align:left;">'+
												'<td style="" colspan="11"></td>'+
											'</tr>'+
										'</thead>'+
										'<tbody>'+
												'<tr style="height: 10px;text-align:left;">'+
													'<td  colspan="1"></td>'+
													'<td  colspan="10"><div style="margin-left:5px;">Seleccione Informe</div></td>'+
											   '</tr>'+
										'</tbody>'+
									 '</table>';
				
				$('#tblUpInformes').html(tableDocument);*/
				
				$('#administracionFiltros').html(data);
				//alert('idInformeSelected: '+idInformeSelected);
				
				// Aca se debe discriminar y llamar a obtener Tabla de Carga Segun Corresponda (PI o TDR) !!
				if (idInformeSelected == -1) {
					obtenerTablaVacia();
				}else if (idInformeSelected == 1){
					//obtenerArchivoPI(0); 
					obtenerTablaVacia();
				}else{	
					obtenerTablaTDR();
				}
				
		    }
		});
}


	function obtenerInforme()
	{
		//alert("OBTENER INFORME");
		var glosaEjercicio = $('#cbEjercicio :selected').text();
		var ejercicioId=$('#cbEjercicio :selected').val();
		var parametros = 'periodo='+periodo2+'&tpArchivo=0'+'&glosaEjercicio='+glosaEjercicio+'&informe='+informe+'&entidad='+ent+'&ejrId='+ejercicioId;
		//alert(parametros);
		verInf='verInforme.action?'+parametros;
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(verInf, windowName, windowSize);
	}
 
	function obtenerReportes()
	{		
	    var idFile = $("#idFileUpload_rv").text();
	    var idInformeLP = $("#idInforme_form").text();

		if (idInformeLP == 1)
		{
			//alert("Ley de Presupuesto");
			obtieneReporteValPI(idFile); 
		} else if (idInformeLP == 3){
			//alert("Informe Contable");
		    var idFile = $("#idFileUpload_rv").text();
			console.log("idFileUpload_rv "+idFile);
			obtieneReporteValIC(idFile); 
		}	
	}

	var idFile = "";
	
	function obtieneReporteValIC(idFileIp){

		idFile = idFileIp;
		$('#dialog').show();
		
	}

	function abreReporte(){
		var action = '../SICOGEN2_PUB/validacion/Reporte?idFileUp='+idFile;
		console.log(action);
		window.open(action,'_blank','scrollbars=1,resizable=1,height=650,width=1050');
	}
	

	
	function obtenerCuadratura(){
		 //alert("obtenerCuadratura");
	}
	
	function obtenerCertificado()
	{
		//alert("obtenerCertificado");
		if ('0' == $('#corrEnvio').text()) {	
			console.log('entre a mostrar alerta');
			jAlert('No se ha enviado el informe a Contraloria', "Certificados");			
		} else {
			console.log('entre a mostrar el certificado');
			var windowSizeArray = ["width=200,height=200","width=300,height=400,scrollbars=yes"];
			var windowName = "popUp";
			var windowSize = windowSizeArray[$(this).attr("rel")];
			window.open('certificadoEnvio.action?certificado='+ $('#corrEnvio').text(), windowName, windowSize);
		}
	}
	
	function obtenerBitacora(){
		//alert("obtenerBitacora");
	}	
	/*
	function obtenerResumen(){
		alert("obtenerResumen");
		loadResumenErrores(informe,periodo,tpInforme); //
		var action = 'loadResumenErrores.action?idFileUp='+informe;
		alert("Informe" + informe+ " Periodo " +periodo+ " Tipo Informe" + tpInforme)
		$("#dialogErrorCGF").dialog({}).dialog("open");
		$("#dialog").dialog( "close" );
		$("#dialog").css('width','680px');
		$("#dialog").css('left','300px');
		$("#dialogErrorCGF").parent().css('width','680px');
		$("#dialogErrorCGF").parent().css('left','25%');
		$("#dialogErrorCGF").parent().css('top','10%');
		
		$("#dialogErrorCGF").parent().css('scroll','hidden');
		$("#ui-id-2").text($("#inf0" + informe).text());
		$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
		alert("Fin obtener Informe");
		return false; 		
	}
*/
	
	function obtieneReporteValPISinParametros(){	
		//alert("obtieneReporteValPISinParametros");
		//var idFile = $(".linkVerRepValidacion").attr( 'idfile' );
	    var idFile = $("#idFileUpload_rv").text();
	    //alert("LEY PRESUPUESTO" +idFile);
		console.log("obtieneReporteValPI "+idFile);
		obtieneReporteValPI(idFile); 	
	}

	function obtieneReporteValPI(idFileIp){	
		//alert("Obtener Reporte validacion para PI: "+idFileIp);
		//var action = 'obtenerValidacionIC.action?idFileUp='+idFileIp;
		var action = 'obtenerValidacionPI.action?idFileUp='+idFileIp;
		//Nueva Ventana para el Reporte !!
		console.log(action);
		window.open(action,'_blank','scrollbars=1,resizable=1,height=650,width=1050');
		
	}
 
function obtenerListaTDR(){
	
	var analista = $('#cbAnalistaTDR option:selected').val();
	var estado = $('#cbEstadoSicogenTDR option:selected').val();
	var ejercicio = $('#cbEjercicioTDR option:selected').text();
	
	if (ejercicio == 'Seleccione'){
		alert("Debe Seleccionar un Ejercicio para realizar la búsqueda !!");
		return;
	}
	
	var action = 'obtenerListaTDR.action?analista='+analista+'&ejercicio='+ejercicio+'&estadoSicogen='+estado; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",
		    cache: false,
		    async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				$('#tablaDocumentosCarga').html(data);
		    }
		});
	
}



function cargaValidacionTDR(nroDoc){
	 
	var ejercicio = $('#cbEjercicioTDR option:selected').text();
	var informe = $('#cbInforme option:selected').text();
	var tipoInforme = $('#cbTipoInforme option:selected').text();
	
	// Agregar el campo Periodo a los parametros !!!
	
	var action = 'obtenerCargaTDR.action?nroSistradoc='+nroDoc+'&ejercicio='+ejercicio+'&informe='+informe+'&tipoInforme='+tipoInforme; 
	console.log("action : "+action);
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "html",
		    cache: false,
		    async:true,
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function () {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
		    },
			success: function(data,textStatus, request){
				$('#tablaDocumentosCarga').html(data);
		    }
	});
	
};


function cargaPeriodosEjercicio(){
	
	var ejercicio = $('#cbEjercicioTDR option:selected').val();
	//alert("Obtener Periodos/Ejercicio para TDR: "+ejercicio);

	var action = 'getPeriodos.action?ejercicioId=' + ejercicio; 
	$.ajax({
		 	url: action,
		    type: "POST",
		    dataType: "json",
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodosTDR" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodosTDR" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function (data) {
				$('#fadePeriodosTDR').remove();
				$('#waitPeriodosTDR').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
		        alert('Error: ' + textStatus);
		        alert(XMLHttpRequest.responseText);
		    },
		    success: function(data){
		    	console.log("estamos buscando los periodos");
		    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
		    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
		    	}
		    	// $('#tblUpInformes > tbody').empty();  
	    	    $("#cbPeriodosTDR").get(0).options.length = 0;
                $("#cbPeriodosTDR").get(0).options[0] = new Option("Selec. Periodo", "-1"); 

                $.each(data.listaPeriodos, function(i, item) {			                	
                    $("#cbPeriodosTDR").get(0).options[$("#cbPeriodosTDR").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
                });
		    }
		});
	
}


