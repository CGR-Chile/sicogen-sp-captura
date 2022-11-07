function habilitaCMB(reporte){
	$("#carga").html('');
	$.ajax({
		url: 'loadReportesByAccion.action',
		type: "GET",
		data:{
				accion:$("#cbTitulo option:selected").val()
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeCargaReporte" class="overlay" style="display:block"></div>'+
					'<div id="waitCargaReporte" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando opciones del reporte</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeCargaReporte').remove();
			$('#waitCargaReporte').remove();
		},error:function (event, jqXHR, ajaxSettings, thrownError){
			jAlert(jqXHR.status);
		},
		success: function(data){
			$.each(data.listaReportes, function(i, item) {
				console.log('accion: '+item.accionPdf);
				$("#btnPdf").unbind('click');
				$("#btnPdf").click(function (){reporteGestionPDF(item.accionPdf);});
			});
		}
	});
	
	$.ajax({
		url: 'getEjercicios.action',
		type: "GET",
		beforeSend: function (xhr){
			$('body').append('<div id="fadeCargaReporte" class="overlay" style="display:block"></div>'+
					'<div id="waitCargaReporte" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Informaci�n</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeCargaReporte').remove();
			$('#waitCargaReporte').remove();
		},error:function (event, jqXHR, ajaxSettings, thrownError){
			jAlert(jqXHR.status);
		},
		success: function(data){
			$("#cbEjercicio").get(0).options.length = 0;
	        $("#cbEjercicio").get(0).options[0] = new Option("Selec. Ejercicio", "-1"); 
			
			$.each(data.listaEjercicios, function(i, item) {			                	
                $("#cbEjercicio").get(0).options[$("#cbEjercicio").get(0).options.length] = new Option(item.ejercicioCodigo, item.ejercicioId);
            });
		}
	});
	$.ajax({
		url: 'loadRegion.action',
		type: "GET",
		data:{
				accion:$("#cbTitulo option:selected").val()
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeCargaReporte" class="overlay" style="display:block"></div>'+
					'<div id="waitCargaReporte" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Informaci�n</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeCargaReporte').remove();
			$('#waitCargaReporte').remove();
		},error:function (event, jqXHR, ajaxSettings, thrownError){
			jAlert(jqXHR.status);
		},
		success: function(data){
			$("#cbRegion").get(0).options.length = 0;
	        $("#cbRegion").get(0).options[0] = new Option("Selec. Region", "-1"); 
			
			$.each(data.listaRegiones, function(i, item) {			                	
                $("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.regId);
            });
		}
	});
	//Variales para determinar el valor por defecto (todo) si es todos en caso de ser 1 y seleccione en caso de ser 0
	var vEjr=0;
	var vInf=0;
	var vPer=0;
	var vReg=0;
	var vCom=0;
	
	var reporte=$("#cbReporte option:selected").val();
	switch(reporte){
	case 'buscaCumplimientoMunicipal':
		vEjr=0; vInf=1;	vPer=0;	vReg=1;	vCom=1;
		break;
	case 'buscaEnvioPorEntidad':
		vEjr=0; vInf=1;	vPer=1;	vReg=0;	vCom=0;
		break;
	case 'buscarInformeCorreccionEnviados':
		vEjr=0; vInf=1;	vPer=1;	vReg=0;	vCom=0;
		break;
	case 'buscarInformesReversados':
		vEjr=0; vInf=1;	vPer=0;	vReg=0;	vCom=0;
		break;
	case 'buscarBitacoraAcciones':
		vEjr=0; vInf=0;	vPer=0;	vReg=0;	vCom=0;
		break;
	case '-1':
		vErr=1;
		break;
	}

	if (vEjr==1){
		$('option:selected','#cbEjercicio').text('Todos');
	}else{
		$('option:selected','#cbEjercicio').text('Selec. Ejercicio');
	}
	if (vInf==1){
		$('option:selected','#cbInformes').text('Todos');
	}else{
		$('option:selected','#cbInformes').text('Selec. Informe');
	}
	if (vPer==1){
		$('option:selected','#cbPeriodos').text('Todos');
	}else{
		$('option:selected','#cbPeriodos').text('Selec. Periodo');
	}
	if (vReg==1){
		$('option:selected','#cbRegion').text('Todos');
	}else{
		$('option:selected','#cbRegion').text('Selec. Region');
	}
	if (vCom==1){
		$('option:selected','#cbComuna').text('Todos');
	}else{
		$('option:selected','#cbComuna').text('Selec. Comuna');
	}

	
	
	$('#carga').attr('src','about:blank');
	$('#fecDesde').val('');
	$('#fecHasta').val('');
	$('#cbEjercicio').attr("disabled",false); 	 	 $('#cbEjercicio').val(-1);
	$('#cbInformesC1').attr("disabled",false);  	 $('#cbInformesC1').val(-1);
	$('#cbPeriodosC1').attr("disabled",false);  	 $('#cbPeriodosC1').val(-1);
	$('#cbRegion').attr("disabled",false);      	 $('#cbRegion').val(-1);
	$('#cbComuna').attr("disabled",false);      	 $('#cbComuna').val(-1);
	var fi=new Date();
	var ff=new Date();
	
	switch(reporte){
	case 'buscaCumplimientoMunicipal':
										var obj_O= [ "contCorr" ];
										var obj_M= [ "contEjer","contInf","contPer","contReg","contCom","contFecI","contFecF"];
										$.each(obj_O,function(i,itm){$('#'+itm).hide();});
										$.each(obj_M,function(i,itm){$('#'+itm).show();});
										$("#cbEjercicio").attr("disabled",false); 	$('#cbEjercicio').val(-1);
										$("#cbInformes").attr("disabled",false); 	$('#cbInformes').val(-1);
										$("#cbPeriodos").attr("disabled",false); 	$('#cbPeriodos').val(-1);
										$('#contFecI').css({'clear':'none'});
										$("#fecDesde").val( ("0"+fi.getDate()).slice(-2)+"/"+ ("0"+(fi.getMonth()+1)).slice(-2)+"/"+fi.getFullYear());
										$("#fecHasta").val( ("0"+ff.getDate()).slice(-2)+"/"+ ("0"+(ff.getMonth()+1)).slice(-2)+"/"+ff.getFullYear());
										break;
	case 'buscaEnvioPorEntidad':
										var obj_O=["contInf","contPer","contCorr","contFecI","contFecF"];
										var obj_M=["contEjer","contReg","contCom"];
										$.each(obj_O,function(i,itm){$('#'+itm).hide();});
										$.each(obj_M,function(i,itm){$('#'+itm).show();});
										$("#cbEjercicio").attr("disabled",false); 	$('#cbEjercicio').val(-1);
										$("#cbRegion").attr("disabled",false); 		$('#cbRegion').val(-1);
										$("#cbComuna").attr("disabled",false); 		$('#cbComuna').val(-1);
										break;
	
	case 'buscarInformeCorreccionEnviados':
	case 'buscarInformesReversados':
										var obj_O=["contCorr","contFecI","contFecF"];
										var obj_M=["contInf","contPer","contEjer","contReg","contCom"];
										$.each(obj_O,function(i,itm){$('#'+itm).hide();});
										$.each(obj_M,function(i,itm){$('#'+itm).show();});
										$("#cbEjercicio").attr("disabled",false); 	$('#cbEjercicio').val(-1);
										$("#cbInformes").attr("disabled",false); 	$('#cbInformes').val(-1);
										$("#cbPeriodos").attr("disabled",false); 	$('#cbPeriodos').val(-1);
										$("#cbRegion").attr("disabled",false); 		$('#cbRegion').val(-1);
										$("#cbComuna").attr("disabled",false); 		$('#cbComuna').val(-1);
										break;
	case 'buscarBitacoraAcciones':
										var obj_O=["contFecI","contFecF"];
										var obj_M=["contInf","contPer","contEjer","contReg","contCom","contCorr"];
										$.each(obj_O,function(i,itm){$('#'+itm).hide();});
										$.each(obj_M,function(i,itm){$('#'+itm).show();});
										$("#cbEjercicio").attr("disabled",false); 	$('#cbEjercicio').val(-1);
										$("#cbInformes").attr("disabled",false); 	$('#cbInformes').val(-1);
										$("#cbPeriodos").attr("disabled",false); 	$('#cbPeriodos').val(-1);
										$("#cbRegion").attr("disabled",false); 		$('#cbRegion').val(-1);
										$("#cbComuna").attr("disabled",false); 		$('#cbComuna').val(-1);
										break;
	case '-1':
										var obj_O=["contCorr","contFecI","contFecF","contInf","contPer","contEjer","contReg","contCom"];
										$.each(obj_O,function(i,itm){$('#'+itm).hide();});
										break;
	}
}
$(document).ready(function () {
	$.datepicker.regional['es'] = {
			closeText: 'Cerrar',
			prevText: '<Ant',
			nextText: 'Sig>',
			currentText: 'Hoy',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi�rcoles', 'Jueves', 'Viernes', 'S�bado'],
			dayNamesShort: ['Dom','Lun','Mar','Mi�','Juv','Vie','S�b'],
			dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
			weekHeader: 'Sm',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	$("#fecDesde").datepicker({
		changeMonth: true,
		changeYear: true
	});
	$("#fecHasta").datepicker({
		changeMonth: true,
		changeYear: true
	});
	$('#cbComuna').change(function (){
		loadCorreciones();
	});
	$('#cbReporte').change(function (){
		habilitaCMB();
	});
	
});
function limpia(){
	$('#carga').attr('src','about:blank');
	$("#cbTipoReporte").get(0).options.length=0;	 $("#cbTipoReporte").get(0).options[0] = new Option("Selec. Tipo Reporte", "-1");
	$("#cbReporte").get(0).options.length=0;         $("#cbReporte").get(0).options[0] = new Option("Selec. Reporte", "-1");
	$('#cbEjercicio').attr("disabled",false); 	 	 $('#cbEjercicio').val(-1);
	$('#cbInformesC1').attr("disabled",false);  	 $('#cbInformesC1').val(-1);
	$('#cbPeriodosC1').attr("disabled",false);  	 $('#cbPeriodosC1').val(-1);
	$('#cbRegion').attr("disabled",false);      	 $('#cbRegion').val(-1);
	$('#cbComuna').attr("disabled",false);      	 $('#cbComuna').val(-1);
}
function loadTipoInformacion(){
	limpia();
	var action='getTipoinfByTpEntidad.action'; 
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			data:{tpEntidad:$("#cbSector option:selected").val()},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				$("#cbTpInf").get(0).options.length=0;
				$("#cbTpInf").get(0).options[0]=new Option("Selec. Tipo Informe", "-1"); 
				$.each(data.lstTipoInforme, function(i, item){
					$("#cbTpInf").get(0).options[$("#cbTpInf").get(0).options.length]=new Option(item.nombre, item.id);
				});
				if(data.lstTipoInforme.length==1){
					$("#cbTpInf").val(data.lstTipoInforme[0].id);
					loadTipoReporte();
				}
			}
	});
}
function loadTipoReporte(){
	limpia();
	var action='getTipoRepByTpInforme.action'; 
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			data:{tpInforme:$("#cbTpInf").val()},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				$("#cbTipoReporte").get(0).options.length=0;
				$("#cbTipoReporte").get(0).options[0]=new Option("Selec. Tipo Reporte", "-1");
				if(data.lstTipoReporte!=null){
					$.each(data.lstTipoReporte, function(i, item){
						$("#cbTipoReporte").get(0).options[$("#cbTipoReporte").get(0).options.length]=new Option(item.reporte, item.id);});
					if(data.lstTipoReporte.length==1){
						$("#cbTipoReporte").val(data.lstTipoReporte[0].id);
						loadReportes();
					}
						
				}
				//
				
			}
	});
}
function loadReportes(){
	console.log('getReportesByTipoReporte');
	var action='getReportesByTipoReporte.action'; 
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			data:{tpReporte:$("#cbTipoReporte").val()},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log("loadReporte.action **");
				jAlert('Error ' + textStatus);
				jAlert(errorThrown);
				jAlert(XMLHttpRequest.responseText);
			},
			success: function(data){
				$("#cbReporte").get(0).options.length = 0;
				$("#cbReporte").get(0).options[0] = new Option("Selec. Reporte", "-1"); 

				$.each(data.lstReporte, function(i, item) {			                	
					$("#cbReporte").get(0).options[$("#cbReporte").get(0).options.length] = new Option(item.nombreReporte, item.nombreMetodo);
				});			                
			}
	});
}

function reporteGestionPDF(accionReporte){
	
	
	var pop='<div id="popDownload">'+
			'<div id="preparing-file-modal" title="Preparing report..." style="display: none;">'+
	    	'	We are preparing your report, please wait...'+
	    	'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 100%; height:22px; margin-top: 20px;"></div>'+
	    	'</div>'+
	    	'<div id="error-modal" title="Error" style="display: none;">'+
	    	'	There was a problem generating your report, please try again.'+
	    	'</div></div>';
	
	console.log('por aca');
	console.log($('#popDownload').length);
	if($('#popDownload').length=0){
		$(body).append(pop);
	}
	
	parametros="?ejercicio="+$("#cbEjercicio option:selected").val()+
				"&periodo="+$("#cbPeriodos option:selected").val()+ 
				"&informe="+$("#cbInformes option:selected").val()+
				"&comuna="+$("#cbComuna option:selected").val()+
				"&fechaDesde="+$("#fecDesde").val()+
				"&fechaHasta="+$("#fecHasta").val()+
				"&tipo="+$("#cbCorr option:selected").val()+
				"&region="+$("#cbRegion option:selected").val();

	var $action=accionReporte+parametros;
	
	var $preparingFileModal = $("#preparing-file-modal");
    $preparingFileModal.dialog({ modal: true });
    $.fileDownload($action, {
        successCallback: function (url) {
            $preparingFileModal.dialog('close');
        },
        failCallback: function (responseHtml, url){
            $preparingFileModal.dialog('close');
            $("#error-modal").dialog({ modal: true });
        }
    });
    return false; //this is critical to stop the click event which will trigger a normal file download!
	/*
	$.ajax({url: accionReporte, type: "GET", dataType:'html',async: false,cache: false,
		data:{	ejercicio: $("#cbEjercicio option:selected").val(),
				periodo:$("#cbEjercicio option:selected").val(),
				informe:$("#cbInformes option:selected").val(),
				comuna:$("#cbComuna option:selected").val(),
				fechaDesde: $("#fecDesde").val(),
				fechaHasta: $("#fecHasta").val(),
				tipo:$("#cbCorr option:selected").val(),
				region:$("#cbRegion option:selected").val()
		},success: function(data){
			if(data == true){
				jAlert('No se pudo generar el reporte.','Exportar PDF');
			}else{
				$.download('/export.php','filename=mySpreadsheet&format=xls&content=' + spreadsheetData );
				window.location=""+$action+"";
			}
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log('error');
		}
	});
	*/
}
function loadComuna(region){
	console.log('loadComuna: '+ region);
	
	var action = 'getComunaById.action?regId=' + region; 
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				$("#cbComuna").get(0).options.length = 1;
				//$("#cbComuna").get(0).options[0] = new Option("Todas", "-1"); 

				$.each(data.listaComunas, function(i, item) {			                	
				$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option(item.nombre, item.entId);
				});			                
			}
	});
}

function loadInformes2(ejercicio){
	var action = 'loadInformes2.action?ejercicio=' + ejercicio; 
	$.ajax({
		 url: action,type: "POST",dataType: "json",
			error: function(XMLHttpRequest, textStatus, errorThrown){console.log('Error ' + textStatus);console.log(errorThrown);console.log(XMLHttpRequest.responseText);},
			success: function(data){
				$("#cbInformes").get(0).options.length=1;
				//$("#cbInformes").get(0).options[0]=new Option("Todos", "-1"); 
				$("#cbPeriodos").get(0).options.length=1;
				//$("#cbPeriodos").get(0).options[0]=new Option("Selec. Periodo", "-1");
				
				$.each(data.listaInformes, function(i, item) {$("#cbInformes").get(0).options[$("#cbInformes").get(0).options.length] = new Option(item.informeNombre, item.informeId);});
				$.each(data.listaPeriodos, function(i, item) {$("#cbPeriodos").get(0).options[$("#cbPeriodos").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);});
			}
	});
}
function muestraReportes(){
	console.log("muestra Reportes.");
	var vEjr=0;
	var vInf=0;
	var vPer=0;
	var vReg=0;
	var vCom=0;
	var vFec=0;
	
	if($("#cbSector option:selected").val()=="-1"){
		jAlert("Debe seleccionar Sector", "Reportes");
		return;
	}
	if($("#cbTpInf option:selected").val()=="-1"){
		jAlert("Debe seleccionar Tipo de Informacion a Consultar","Reportes");
		return;
	}
	if($("#cbTipoReporte option:selected").val()=="-1"){
		jAlert("Debe seleccionar Tipo de Reporte a Seleccionar","Reportes");
		return;
	}
	if($("#cbReporte option:selected").val()=="-1"){
		jAlert("Debe seleccionar Reporte","Reportes");
		return;
	}
	
	switch($("#cbReporte option:selected").val()){
	case 'buscaCumplimientoMunicipal':
		vEjr=1; vInf=0;	vPer=1;	vReg=0;	vCom=0; vFec=1;
		break;
	case 'buscaEnvioPorEntidad':
		vEjr=1; vInf=0;	vPer=0;	vReg=1;	vCom=1; vFec=0;
		break;
	case 'buscarInformeCorreccionEnviados':
		vEjr=1; vInf=0;	vPer=0;	vReg=1;	vCom=1; vFec=0;
		break;
	case 'buscarInformesReversados':
		vEjr=1; vInf=0;	vPer=1;	vReg=1;	vCom=1; vFec=0;
		break;
	case 'buscarBitacoraAcciones':
		vEjr=1; vInf=1;	vPer=1;	vReg=1;	vCom=1; vFec=0;
		break;
	case '-1':
		vErr=1;
		break;
	}
	if(vEjr==1 && $("#cbEjercicio option:selected").val()=="-1"){
		jAlert("Debe seleccionar un ejercicio valido","Reportes");
		return;
	}
	if(vInf==1 && $("#cbInformes option:selected").val()=="-1"){
		jAlert("Debe seleccionar un informe valido","Reportes");
		return;
	}
	if(vPer==1 && $("#cbPeriodos option:selected").val()=="-1"){
		jAlert("Debe seleccionar un periodo valido","Reportes");
		return;
	}
	
	if(vReg==1 && $("#cbRegion option:selected").val()=="-1"){
		jAlert("Debe seleccionar Region","Reportes");
		return;
	}
	if(vCom==1 && $("#cbComuna option:selected").val()=="-1"){
		jAlert("Debe seleccionar Comuna","Reportes");
		return;
	}
	if(vFec==1 && $("#fecDesde").val()==""){
		jAlert("Debe seleccionar el rango de fechas para el reporte.","Reportes");
		return;
	}
	if(vFec==1 && $("#fecHasta").val()==""){
		jAlert("Debe seleccionar el rango de fechas para el reporte.","Reportes");
		return;
	}
	
	if(vFec==1 && ($("#fecDesde").val()>$("#fecHasta").val())){
		jAlert("Fecha fesde debe ser menor a fecha hasta","Reportes");
		return;
	}
	console.log('Periodo:'+$("#cbPeriodos option:selected").val());
	$.ajax({
		 url: $("#cbReporte option:selected").val(),
			type: 'POST',
			dataType: 'html',
			data:{	ejercicio: $("#cbEjercicio option:selected").val(),
					periodo:$("#cbPeriodos option:selected").val(),
					informe:$("#cbInformes option:selected").val(),
					comuna:$("#cbComuna option:selected").val(),
					fechaDesde: $("#fecDesde").val(),
					fechaHasta: $("#fecHasta").val(),
					tipo:$("#cbCorr option:selected").val(),
					region:$("#cbRegion option:selected").val()
			},beforeSend: function (xhr){
				$('body').append('<div id="fadeRepGestion" class="overlay" style="display:block"></div>'+
						'<div id="waitRepGestion" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
						' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Reporte</div>'+
						' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
						'</div>');
			},complete: function (data) {
				
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},success: function(data){
				$("#carga").html(data);
				$('#scrollbar1').tinyscrollbar({});	
				$('#scrollbar1').tinyscrollbar({});
				$('#fadeRepGestion').remove();
				$('#waitRepGestion').remove();
			}
	});
}
function printIframe(){
	var doc = document.getElementById('carga').contentDocument || document.getElementById('carga').contentWindow.document ;
	var table= doc.getElementById(tabla);
	//$('#' + "carga")[0].focus();
	//table.focus();
	//$('#' + "carga")[0].contentWindow.print();
	table.contentWindow.print();
}


function loadCorreciones(){
	$.ajax({url: 'getCorrecionesByPerInf.action',
			type: "POST",
			dataType: "json",
			data:{	periodo:$("#cbPeriodos option:selected").val(), 
					informe:$("#cbInformes option:selected").val(),
					entidad:$("#cbComuna option:selected").val()
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},success: function(data){
				console.log(data);
				$("#cbCorr").get(0).options.length=0; 
				//$("#cbCorr").get(0).options[0]=new Option("Original", "0"); 
				
				$.each(data.listaCorrecciones, function(i, item) {			                	
					$("#cbCorr").get(0).options[$("#cbCorr").get(0).options.length] = new Option(item.correccionNombre, item.correcionInfId);
				});
				console.log('cantidad de correcciones: '+data.listaCorrecciones.length);
				if(data.listaCorrecciones.length==1){
					$("#cbCorr").attr("disabled","disabled");
				}else{
					$('#cbCorr').removeAttr("disabled");
				}
			}
	});
}


function generate_excel() {
	var doc=document.getElementById('carga').contentDocument || document.getElementById('carga').contentWindow.document ;
	var table= doc.getElementById(tabla);
	var html = table.outerHTML;
	window.open('data:application/vnd.ms-excel;base64,' + base64_encode(html));
}

function base64_encode (data) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Tyler Akins (http://rumkin.com)
	  // +   improved by: Bayron Guevara
	  // +   improved by: Thunder.m
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Pellentesque Malesuada
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Rafal Kukawski (http://kukawski.pl)
	  // *     example 1: base64_encode('Kevin van Zonneveld');
	  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	  // mozilla has this native
	  // - but breaks in 2.0.0.12!
	  //if (typeof this.window['btoa'] == 'function') {
	  //    return btoa(data);
	  //}
	  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	    ac = 0,
	    enc = "",
	    tmp_arr = [];

	  if (!data) {
	    return data;
	  }

	  do { // pack three octets into four hexets
	    o1 = data.charCodeAt(i++);
	    o2 = data.charCodeAt(i++);
	    o3 = data.charCodeAt(i++);

	    bits = o1 << 16 | o2 << 8 | o3;

	    h1 = bits >> 18 & 0x3f;
	    h2 = bits >> 12 & 0x3f;
	    h3 = bits >> 6 & 0x3f;
	    h4 = bits & 0x3f;

	    // use hexets to index into b64, and append result to encoded string
	    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	  } while (i < data.length);

	  enc = tmp_arr.join('');

	  var r = data.length % 3;

	  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

	}