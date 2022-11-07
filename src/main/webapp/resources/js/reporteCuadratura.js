function loadInformes(ejercicio){
	var action='chargeEjercicio?ejercicio='+$("#cbCuadrEjercicio option:selected").val();
	console.log('accion: "'+action+'"');
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			async: true,
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				switch(data.estado){
				case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
				case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
				case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
				}
				
				$("#cbInforme").get(0).options.length = 0;
				$("#cbInforme").get(0).options[0] = new Option("Selec. Informe", "-1"); 
				$.each(data.listaInformes, function(i, item){$("#cbInforme").get(0).options[$("#cbInforme").get(0).options.length] = new Option(item.nombre, item.id);});
				
				if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
			}
	});
}
function loadReportes(informe){
	informe=$("#cbInforme option:selected").val();
	console.log('loadReportes: '+ informe);
	var action='loadReportes.action?ejercicio='+$("#cbCuadrEjercicio option:selected").val()+
									'&informe='+$("#cbInforme option:selected").val(); 
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
				console.log(data);
				$("#cbReportes").get(0).options.length = 0;
				$("#cbReportes").get(0).options[0] = new Option("Selec. Reporte", "-1");
				
				$.each(data.listaReportes, function(i, item) {
					$('#cbReportes').removeAttr("cbReportes");
					document.getElementById('cbReportes').disabled = false;
					$("#cbReportes").get(0).options[$("#cbReportes").get(0).options.length] = new Option(item.nombreReporte, item.accionNombre);
				});
				
				$("#cbPeriodoInf").get(0).options.length = 0;
				$("#cbPeriodoInf").get(0).options[0] = new Option("Selec. Periodo", "-1");
				$.each(data.listaPeriodos, function(i, item) {
					$('#cbPeriodoInf').removeAttr("cbReportes");
					document.getElementById('cbReportes').disabled = false;
					$("#cbPeriodoInf").get(0).options[$("#cbPeriodoInf").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
				});
				
				if(data.listaReportes.length>0){ 
					$('#cbReportes').removeAttr("cbReportes"); 
				}else{ $('#cbReportes').attr("disabled", "disabled");}
				
			}
		});
}
function loadPeriodosInforme(ejercicio, informe){
	informe=$("#cbInforme option:selected").val();
	ejercicio=$("#cbCuadrEjercicio option:selected").val();
	
	var action='loadPeriodos2.action?ejercicio='+ejercicio+'&informe='+informe; 
	$.ajax({
		url: action,
		type: "POST",
		dataType: "json",
		error:function (event, jqXHR, ajaxSettings, thrownError){
			jAlert(jqXHR.status);
		},
		success: function(data){
			$("#cbPeriodoInf").get(0).options.length = 0;
			$("#cbPeriodoInf").get(0).options[0] = new Option("Selec. Periodo", "-1"); 

			$.each(data.listaPeriodos, function(i, item) {
				$('#cbPeriodoInf').removeAttr("cbPeriodoInf");
				document.getElementById('cbPeriodoInf').disabled = false;
				$("#cbPeriodoInf").get(0).options[$("#cbPeriodoInf").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
			});			                
		}
	});
	console.log($("#cbReportes option:selected").val());
	var action='loadReportesByAccion.action?accion='+$("#cbReportes option:selected").val(); 
	$.ajax({
		url: action,
		type: "POST",
		dataType: "json",
		error:function (event, jqXHR, ajaxSettings, thrownError){
			jAlert(jqXHR.status);
		},
		success: function(data){
			$.each(data.listaReportes, function(i, item) {
				console.log(item);
				console.log(item.accionPdf);
				//$("#Btn_Excel_repC").unbind('click');
				$("#Btn_Excel_repC").click(function (){
					reporteExcelCuadratura(item.accionPdf,"Excel");
				});
				//$("#Btn_Pdf_repC").unbind('click');
				console.log("COnsole 1:"+item.accionPdf);
				$("#Btn_Pdf_repC").click(function (){
					reportePDFNew(item.accionPdf);
				});
			});
		}
	});
	
	
}
function reportePDF(reporte){
	console.log(reporte);
	/*
	var informe = $("#cbInforme option:selected").val();
	var periodo = $("#cbPeriodoInf option:selected").val();
	
	if($("#cbCorreciones option:selected").val()>0){
		tipoInforme=$("#cbCorreciones option:selected").val();
	}else{
		tipoInforme=0;
	}
	console.log(tipoInforme);
	var metodo = $("#cbReportes option:selected").val();	
	var action= null;
	action= metodo+"?periodo=" + periodo +"&informe="+informe+"&tipoInforme="+tipoInforme+"&entidad="+vEntidad;
	console.log('reporteCuadratura.js accion: '+action);
	
	*/
	
	var vEntidad=0;
	console.log(typeof sessEntidad);
	if (typeof sessEntidad != 'undefined'){	vEntidad=sessEntidad;	}
	var tipoInforme=0;
	var informe = $("#cbInforme option:selected").val();
	var periodo = $("#cbPeriodoInf option:selected").val();
	
	if($("#cbCorreciones option:selected").val()>0){
		tipoInforme=$("#cbCorreciones option:selected").val();
	}else{
		tipoInforme=0;
	}
	var parametros="?periodo="+periodo+"&informe="+informe+"&tipoInforme="+tipoInforme+"&entidad="+vEntidad;
	console.log(reporte+parametros);
	location.href=reporte+parametros;
}
function loadCorreciones(periodo, informe){
	var vEntidad=0;
	if (typeof sessEntidad != 'undefined' ){	vEntidad=sessEntidad;	}
	informe=$("#cbInforme option:selected").val();
	periodo=$("#cbPeriodoInf option:selected").val();
	$.ajax({
		 url: 'getCorrecionesByPerInf.action',
			type: "POST",
			dataType: "json",
			data:{	periodo:$("#cbPeriodoInf option:selected").val(),
					informe:$("#cbInforme option:selected").val(),
					entidad:vEntidad
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},success: function(data){
				console.log(data);
				$("#cbCorreciones").get(0).options.length = 0;
				$('#cbCorreciones').removeAttr("cbCorreciones");
				document.getElementById('cbCorreciones').disabled = false;
				$.each(data.listaCorrecciones, function(i, item) {
					$("#cbCorreciones").get(0).options[$("#cbCorreciones").get(0).options.length] = new Option(item.correccionNombre, item.correcionInfId);
				});			                
			}
	});
}

function showReportesDeCuadraturas(){
	document.getElementById('fade').style.display='block';
	document.getElementById("popup1").style.display="block";
}
function cierraVerReportes(){
	try{
		$("#popup1").hide();
		
		if($('#formComplemento').css('display')=='none'){
			$(".ui-dialog").show();
			document.getElementById("fade").style.display="none";
		}
	}catch(e){
		jAlert('Error al tratar de abrir Reportes de Cuadraturas!','Reporte de Cuadraturas');
	}
}

function muestraReportesCuadraturas(){
	try {
	var vEntidad=0;
	console.log(typeof sessEntidad);
	if (typeof sessEntidad != 'undefined'){	vEntidad=sessEntidad;	}
	
	if($("#cbCuadrEjercicio option:selected").val()=="-1"){
		jAlert('Debe seleccionar Ejercicio','Reporte de Cuadraturas');
		return;
	}else
		if($("#cbInforme option:selected").val()=="-1"){
			jAlert('Debe seleccionar Informe','Reporte de Cuadraturas');
			return;
		}else{
			if($("#cbReportes option:selected").val()=="-1"){
				jAlert('Debe seleccionar Reporte','Reporte de Cuadraturas');
				return;
			}else{
				if($("#cbPeriodoInf option:selected").val()=="-1"){
					jAlert('Debe seleccionar Periodo','Reporte de Cuadraturas');
					return;
				}else{
					var informe = $("#cbInforme option:selected").val();
					var periodo = $("#cbPeriodoInf option:selected").val();
					
					if($("#cbCorreciones option:selected").val()>0){
						tipoInforme=$("#cbCorreciones option:selected").val();
					}else{
						tipoInforme=0;
					}
					console.log(tipoInforme);
					var metodo = $("#cbReportes option:selected").val();	
					var action= null;
					action= metodo+"?periodo="+periodo+"&informe="+informe+"&tipoInforme="+tipoInforme+"&entidad="+vEntidad+"&ejerNombre="+$("#cbCuadrEjercicio option:selected").text()+"&perNombre="+$("#cbPeriodoInf option:selected").text();
					console.log('reporteCuadratura.js accion: '+action);
					
					$('#repCuadratura').html(
							//class="contEspera modalCarga" 
							 '<div id="popEspera" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
							 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
							 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
							 '</div>');
					
					$('body').css('cursor','wait');
					$('#fadeChangeTab').show();
					$('#popEspera').show();
					
					$.ajax({url: action,
				    	type: "POST",
				    	dataType: "html",
				    	async: false,
				    	beforeSend: function (xhr){
							/*$('body').append('<div id="fadeCargaManual" class="overlay" style="display:block"></div>'+
							'<div id="waitCargaManual" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
							' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando las areas y sub areas</div>'+
							' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
							'</div>');*/
						},complete: function (data) {
							$("#scrollbar1").tinyscrollbar_update();
						},error: function(XMLHttpRequest, textStatus, errorThrown){
							$("body").css("cursor", "default");
							console.log('error');
							
							$('body').css('cursor','default');
							$('#fadeChangeTab').remove();
							$('#popEspera').remove();
					    },success: function(data){
					    	$("#repCuadratura").html(data);
					    	
					    	$('body').css('cursor','default');
							$('#fadeChangeTab').remove();
							$('#popEspera').remove();
					    }
					});
					
					var action='loadReportesByAccion.action?accion='+$("#cbReportes option:selected").val(); 
					$.ajax({
						url: action,
						type: "POST",
						dataType: "json",
						complete: function (data) {
							$("#scrollbar1").tinyscrollbar_update();
							$("#scrollbar1").tinyscrollbar_update();
						},error:function (event, jqXHR, ajaxSettings, thrownError){
							jAlert(jqXHR.status);
						},
						success: function(data){
							$.each(data.listaReportes, function(i, item) {
								console.log(item);
								console.log(item.accionPdf);
								$("#Btn_Pdf_repC").unbind('click');
								$("#Btn_Pdf_repC").click(function (){
									reportePDFNew(item.accionPdf);
								});
								$("#Btn_Excel_repC").unbind('click');
								$("#Btn_Excel_repC").click(function (){
									reporteExcelCuadratura(item.accionPdf,"Excel");
								});
							});
						}
					});
					//$("#carga").attr('src',action);
				}
			}
		}
	}
	catch(err) {
	  console.log("Error a intentar mostrar scrool");
	}
}

function printIframe(){
	var tempFrame = $('#carga')[0];
	var tempFrameWindow = tempFrame.contentWindow? tempFrame.contentWindow : tempFrame.contentDocument.defaultView;
	tempFrameWindow.focus();
	tempFrameWindow.print();
}

function printIframeExcel(){
	var html ;
	var titulo="<table><tr><td colspan='8'>"+$('#tituloInforme').html()+"</td></tr>+" +
			"<tr><td colspan='8'>"+$('#subtitulo').html()+"</td></tr>"+
			"<tr></tr></table>";
	var trhtml=titulo+"";
	var tdhtml="";
	
	
	tdhtml=tdhtml+"<table>"+$('#tblContenedor').html()+"<tr></tr></table>";
	
	/*** Recorre tabla Reporte Cuadratura AG/AN ***/
	$('.tblCuadratura').each(function (i,item){
		tdhtml=tdhtml+"<tr><table>"+$(this).html()+"</table></tr><tr></tr>";  
	});
	
	tdhtml=tdhtml+"<tr></tr>"; 
	trhtml=trhtml+tdhtml;
	html="<meta http-equiv='Content-Type' content='text/html;  charset=utf-8'>";
	html+="<table >"+trhtml+"</table>";
	window.open('data:application/vnd.ms-excel,'+encodeURIComponent(html));

	//window.open('data:application/vnd.ms-excel,' + $('#carga').html());
}
function verifica(){
	if($('#abreCarga').val() =="1"){showReportesDeCuadraturas();}
}
function exportToExcel(){
		var style = "<style type='text/css'>.grillaInformes{border:none;font: bold 12px arial;padding: 0px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #7AC142;margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 0px;border-top-width: 1px;border-top-style: solid;border-top-color: #7AC142;}"+
					".grillaInformes tbody{	display: table-row-group;	vertical-align: middle;	border-color: inherit;}" +
					".grillaInformes tfoot{	display: table-row-group;	vertical-align: middle;	border-color: inherit;	font: normal 12px arial;}"+
					".grillaInformes th {	background-color: #7AC142;	padding: 3px;	border-right-width: 1px;	border-bottom-width: 1px;	border-right-style: solid;	border-bottom-style: solid;	border-right-color: #FFFFFF;	border-bottom-color: #FFFFFF;	color: #FFFFFF;	vertical-align: top;	border-top-width: 1px;	border-top-style: solid;	border-top-color: #FFFFFF;} </style>";
		// var currentIFrame  = $('#carga').contents().find('#tabla').html();
		
		var urString = $('#carga').contents().find('body').html();
		//var urString2  = urString.replace("<link rel='stylesheet' type='text/css' href='css/grillas.css' ></link>","");
		//var urlStringRemove = urString.replace('<dd>', '').replace('</dd>', '');
	    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(urString));
}