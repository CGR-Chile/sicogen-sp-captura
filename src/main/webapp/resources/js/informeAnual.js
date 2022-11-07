var sessTpEntidad=0;
var sessEntidad=0;
//var revColor='#0066b8';
var revColor='#464749';

$(document).ready(function(){

    $(document).ajaxStart(function () {
        $("#loading-spinner").addClass("is-active");
    });

	$(document).ajaxStop(function () {
		$("#loading-spinner").removeClass("is-active");
	});

	$("#links-informe").dialog({
		autoOpen: false,
		show: {
			effect: "blind",
			duration: 500
		},
		hide: {
			effect: "blind",
			duration: 500
		}
	});

	var cont='<div class="Acceso" id="dialog" title="Informe de balance de comprobaci�n y de saldo" align="justify" style="width:auto;z-index:2001;height:auto; display:none; left: 0px !important;" class="TextoNombre">'+
		'<div id="popUpInfoPI" class="TextoPopupPrincipal" ></div>'+
		'<div style="width:490px; margin:auto 0;"><div style="clear: both;display: block; margin: 10px 0 0 25px;"><div style="clear: both;width:460px;float:left;"><label id="estadoSendCGR" style="display:inline;"></label> por <label id="userSendCGR" style="display:inline;"> </label> el d&iacutea <label id="dateSendCGR" style="display:inline;">19/12/12 a las 14:23</label></div></div><div id="contEnvio" style="float:left;margin:5px 0 0 25px;">'+
		'<div style="width:80px;float:left;">N&deg Env&iacuteo: </div><div id="corrEnvio" style="float:left;">0</div></div><div id="popupVerMas" style="clear: both;display: block; margin: 40px 0 20px 155px;">'+
		'<ul><li id="liVerInforme"><a id="linkVerInforme" class="linkMouse">Ver Informe</a></li>'+
		'<li id="liVerRepValidacion"><a id="linkVerRepValidacion" class="linkMouse">Ver Reporte de Validaci&oacuten</a></li>' +
		'<li id="liVerRepCuadratura"><a id="linkVerRepCuadratura" class="linkMouse">Ver Reportes de Cuadraturas</a></li>'+
		'<li id="liVerArchivo"><a id="linkVerArchivo" class="linkMouse" onclick="obtenerDescarga()" idfile="" idfileupload="">Descargar Archivo </a></li>'+
		'<li id="liVerCertEnvio"><a id="linkVerCertEnvio" class="linkMouse">Ver Certificado de Env&iacuteo</a></li>'+
		'<li id="liVerBitacora"><a id="linkVerBitacora" class="linkMouse">Ver Bit&aacutecora</a></li>'+
		'<li id="liVerMas"><a id="linkVerInfoError" class="linkMouse">Ver Resumen de Errores</a></li></ul></div></div></div>';
	cont=cont+'<div class="Acceso" id="dialogErrorCGF" title="Prop" align="justify" style="width:600px; height:auto;max-height:400;z-index:2001; display:none;" class="TextoNombre"><div id="popUpInfoPI" class="TextoPopupPrincipal"></div><div style="width:660px;max-height:400px; margin:auto 0;overflow-y:scroll ;"><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 10px 0 0 15px;"><div style="clear: both;width:620px;float:left;"><label id="estadoSendCGRError" style="display:inline;"></label> por <label id="userSendCGRError" style="display:inline;">Contralor&iacutea</label> el d&iacutea<label id="dateSendCGRError" style="display:inline;">19/12/12 a las 14:23</label></div></div><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 40px 0 20px 15px;"><div style="clear: both;" class="grillaInformes"><div style="clear: both;" class="rwEncInf"><div class="tituloInfColError">Tipo</div><div class="tituloInfColError">L&iacutenea</div><div class="tituloInfColErrorFinal">Error</div></div><div class="contEstInfAnual" id="divResumenError"></div></div></div></div></div>';

	$('body').append(cont);

	$.fx.speeds._default = 650;
	$(function() {
		var opt = {
			autoOpen: false,
			modal: true,
			width: 505,
			show: "blind"
		};
		//$( "#dialog" ).dialog({ autoOpen: false,show: "blind", width: 505});
		//$("#links-informe").dialog(opt);
		//$("#divDialog").dialog("open");
	});

	$(document).on("click","#btnPdfCuaDisponibilidades",function(){
		var dataUrl,dataFile,dataReporte;
		var pop,mensaje;
		
		dataUrl	="downPDFCuaDisponibilidades?fileUploadID={0}";
		dataFile=$("#fileUpload").val();
		
		dataUrl	=dataUrl.replace("{0}",dataFile);	
		dataReporte=$("#cboCuaReportes").val();		
		
		if(Number(dataReporte)==-1){
			
			mensaje="";		
			mensaje=mensaje+'<div>Es necesario seleccionar el reporte.</div>';
			
			var $dialog = $('<div></div>')
	    	.dialog({height: 200,width: 400,zIndex:2008,
	    		id: "erroresSelEnvio",
	    		title: 'Errores en Reporte de Cuadratura',
	    		buttons:{
	    			Aceptar:function(){
	    				$(this).dialog('close');
	    			}
	    		},
	    		close: function(event, ui){	
	    			$(this).remove();	    		
	    		},
	    		dialogClass:'alert'
	    	});
			$dialog.css({'zIndex': 2008});
			$dialog.dialog('open');
			$dialog.html(mensaje);	
			
		}else{			
		
			pop='<div id="popDownloadPdf">'+
					'<div id="dlgModalPdfReporte" title="Preparando Reporte en Formato PDF" style="display: none;position: relative;z-index: 2010;">'+
						'	Se esta generando el reporte en formato PDF, por favor espere...'+
						'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 200px; height:32px; margin-top: 20px;"></div>'+
					'</div>'+
					'<div id="error-modal" title="Error" style="display: none;">'+
						'	A ocurrido un error al intentar de generar el reporte en formato PDF, por favor reintente si el error persiste contacte al administrador del sistema.'+
					'</div>'+
				'</div>';
	
			if($('#popDownloadPdf').length==0){
					$('body').append(pop);		
			}
			
			var $dlgReportePdf = $("#dlgModalPdfReporte");
			$dlgReportePdf.dialog({ modal: true,position: ['30%',38],zIndex:2010 });
			
			$(".ui-icon-closethick").css({'left':'0','top':'0'});
			$('.ui-dialog-title').css({width: 'auto'});
			$('.ui-widget-content').css({width:'auto'});
	
			$.fileDownload(dataUrl,{
				 successCallback:function(){
					 setTimeout(function(){$dlgReportePdf.dialog('close');}, 2500);	
				 },
				 failCallback: function (url) {
					 $dlgReportePdf.dialog('close');				
					 $("#error-modal").dialog({ modal: true,position: ['30%',28], });
	             }
			})
		}
	})
	
	$(document).on("click","#btnExcelCuaDisponibilidades",function(){
		var dataUrl,dataFile,dataReporte;
		
		dataUrl		= "downExcelCuaDisponibilidades?fileUploadID={0}";
		dataFile	= $("#fileUpload").val();		
		dataUrl		= dataUrl.replace("{0}",dataFile);
		dataReporte	= $("#cboCuaReportes").val();
		
	if(Number(dataReporte)==-1){
			
			mensaje="";		
			mensaje=mensaje+'<div>Es necesario seleccionar el reporte.</div>';
			
			var $dialog = $('<div></div>')
	    	.dialog({height: 200,width: 400,zIndex:2008,
	    		id: "erroresSelEnvio",
	    		title: 'Errores en Reporte de Cuadratura',
	    		buttons:{
	    			Aceptar:function(){
	    				$(this).dialog('close');
	    			}
	    		},
	    		close: function(event, ui){	
	    			$(this).remove();	    		
	    		},
	    		dialogClass:'alert'
	    	});
			$dialog.css({'zIndex': 2008});
			$dialog.dialog('open');
			$dialog.html(mensaje);	
			
		}else{			
			var pop='<div id="popDownloadXLS">'+
					'<div id="dlgModalXLSReporte" title="Preparando Reporte en Formato XLS" style="display: none;">'+
						'	Se esta generando el reporte en formato XLS, por favor espere...'+
						'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 200px; height:32px; margin-top: 20px;"></div>'+
					'</div>'+
					'<div id="error-modal" title="Error" style="display: none;">'+
						'	A ocurrido un error al intentar de generar el reporte en formato XLS, por favor reintente si el error persiste contacte al administrador del sistema.'+
					'</div>'+
					'</div>';
	
			if($('#popDownloadXLS').length==0){
					$('body').append(pop);		
			}
			
			var $dlgReportePdf = $("#dlgModalXLSReporte");
			$dlgReportePdf.dialog({ modal: true,position: ['30%',38],zIndex:2010 });
			
			$(".ui-icon-closethick").css({'left':'0','top':'0'});
			$('.ui-dialog-title').css({width: 'auto'});
			$('.ui-widget-content').css({width:'auto'});
			
			$.fileDownload(dataUrl,{
				 successCallback:function(){
					 setTimeout(function(){$dlgReportePdf.dialog('close');}, 2500);	
				 },
				 failCallback: function (url) {
					 $dlgReportePdf.dialog('close');				
					 $("#error-modal").dialog({ modal: true,position: ['30%',28], });
	             }
			});
		}
		
	});
///////////////////////////////////////////////////////////////
	$(document).on("click",'#liVerMas',function()  
			{ 				
				
				if(informe==3)
				{
					loadResumenErroresIC(idFileUpload);
				}
				
				
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
				$("span.ui-dialog-title").text($('#inf'+informe).text().toUpperCase());
				return false; 
			});
	////////////////////////////////////////////////////////////////
});

$(document).ready(function() {
	
	console.log("document.ready.function...");
	
	var cont='<div class="Acceso" id="dialog" title="Informe de balance de comprobaci�n y de saldo" align="justify" style="width:auto;z-index:2001;height:auto; display:none; left: 0px !important;" class="TextoNombre">'+
		'<div id="popUpInfoPI" class="TextoPopupPrincipal" ></div>'+
		'<div style="width:490px; margin:auto 0;"><div style="clear: both;display: block; margin: 10px 0 0 25px;"><div style="clear: both;width:460px;float:left;"><label id="estadoSendCGR" style="display:inline;"></label> por <label id="userSendCGR" style="display:inline;"> </label> el d&iacutea <label id="dateSendCGR" style="display:inline;">19/12/12 a las 14:23</label></div></div><div id="contEnvio" style="float:left;margin:5px 0 0 25px;">'+ 
		'<div style="width:80px;float:left;">N&deg Env&iacuteo: </div><div id="corrEnvio" style="float:left;">0</div></div><div id="popupVerMas" style="clear: both;display: block; margin: 40px 0 20px 155px;">'+
		'<ul><li id="liVerInforme"><a id="linkVerInforme" class="linkMouse">Ver Informe</a></li>'+ 
		'<li id="liVerRepValidacion"><a id="linkVerRepValidacion" class="linkMouse">Ver Reporte de Validaci&oacuten</a></li>' + 
		'<li id="liVerRepCuadratura"><a id="linkVerRepCuadratura" class="linkMouse">Ver Reportes de Cuadraturas</a></li>'+ 
		'<li id="liVerArchivo"><a id="linkVerArchivo" class="linkMouse" onclick="obtenerDescarga()" idfile="" idfileupload="">Descargar Archivo </a></li>'+
		'<li id="liVerCertEnvio"><a id="linkVerCertEnvio" class="linkMouse">Ver Certificado de Env&iacuteo</a></li>'+
		'<li id="liVerBitacora"><a id="linkVerBitacora" class="linkMouse">Ver Bit&aacutecora</a></li>'+
		'<li id="liVerMas"><a id="linkVerInfoError" class="linkMouse">Ver Resumen de Errores</a></li></ul></div></div></div>';
	cont=cont+'<div class="Acceso" id="dialogErrorCGF" title="Prop" align="justify" style="width:600px; height:auto;max-height:400;z-index:2001; display:none;" class="TextoNombre"><div id="popUpInfoPI" class="TextoPopupPrincipal"></div><div style="width:660px;max-height:400px; margin:auto 0;overflow-y:scroll ;"><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 10px 0 0 15px;"><div style="clear: both;width:620px;float:left;"><label id="estadoSendCGRError" style="display:inline;"></label> por <label id="userSendCGRError" style="display:inline;">Contralor&iacutea</label> el d&iacutea<label id="dateSendCGRError" style="display:inline;">19/12/12 a las 14:23</label></div></div><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 40px 0 20px 15px;"><div style="clear: both;" class="grillaInformes"><div style="clear: both;" class="rwEncInf"><div class="tituloInfColError">Tipo</div><div class="tituloInfColError">L&iacutenea</div><div class="tituloInfColErrorFinal">Error</div></div><div class="contEstInfAnual" id="divResumenError"></div></div></div></div></div>';

	$('body').append(cont);
	
	$(".popUpInf").live({
		
		mouseenter: function(){
			
			if ($(this).attr('onclick')) {
				
				$(this).css({'cursor':'pointer'});
				var datos=$(this).attr('onclick').split(",");
				estado=datos[7].split(")")[0];
				
				tooltip="<div class='ui-tooltip-content' style='width:450px;position:absolute; '>"+ 
							"<div class='tooltip-title'>" +$('#inf0'+datos[0].split("(")[1]).text()+"</div>"+
							"<div class='tooltip-content'>"+
								"<p style='margin:0;padding:0;'>"+getState(datos[7].split(")")[0])+" por "+datos[3].replace("'","").replace("'","")+" el "+datos[4].split(" ")[0].replace("'","").replace("'","")+" a las "+datos[4].split(" ")[1].replace("'","").replace("'","")+"</p>"; 
				
				if((estado=="6")||(estado=="7")||(estado=="10")){
					tooltip=tooltip+"<br><p style='margin:0;padding:0;'>N&deg; de Env&iacuteo: "+datos[6].replace("'","").replace("'","").replace(")","")+"</p>";
				}
				tooltip=tooltip+"<br><p style='margin:0;padding:0;' class='tooltip-message'>Para Acceder a m&aacutes Informacion Haga Click sobre el Icono del Estado del Informe</p></div></div>";
				
				$('body').append(tooltip);
				
				izq=0;
				if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
				else{							izq=$(this).offset().left-450;}
				$('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});
			}
		},
		mouseleave: function(){if ($(this).attr('onclick')){$('div').remove('.ui-tooltip-content');}}
	});
	
	
	$.fx.speeds._default = 650;
	$(function() {
		var opt = {
		        autoOpen: false,
		        modal: true,
		        width: 505,
		        show: "blind"
		};
		//$( "#dialog" ).dialog({ autoOpen: false,show: "blind", width: 505});
		$("#dialog").dialog(opt);
	    //$("#divDialog").dialog("open");
	});
});


function closeBitacora(){
	
	$('#fadeBitacora').remove();
	$('#contBitacora').remove();
}


function initWindows(){
	
	var cont='<div class="Acceso" id="dialog" title="Informe de balance de comprobaci�n y de saldo" align="justify" style="width:auto; height:auto; display:none; left: 0px !important;z-index:2001;" class="TextoNombre"><div id="popUpInfoPI" class="TextoPopupPrincipal" ></div><div style="width:490px; margin:auto 0;"><div style="float:left;margin:5px 0 0 25px;"><div style="width:80px;float:left;">N&deg Env&iacuteo: </div><div id="corrEnvio" style="float:left;">0</div></div><div style="clear: both;display: block; margin: 10px 0 0 25px;"><div style="clear: both;width:460px;float:left;"><label id="estadoSendCGR" style="display:inline;"></label> por <label id="userSendCGR" style="display:inline;"> </label> el d&iacutea <label id="dateSendCGR" style="display:inline;">19/12/12 a las 14:23</label></div></div><div id="popupVerMas" style="clear: both;display: block; margin: 40px 0 20px 155px;"><ul><li id="liVerInforme"><a id="linkVerInforme" class="linkMouse">Ver Informe</a></li><li id="liVerRepValidacion"><a id="linkVerRepValidacion" class="linkMouse">Ver Reporte de Validaci&oacuten</a></li><li id="liVerRepCuadratura"><a id="linkVerRepCuadratura" class="linkMouse">Ver Reportes de Cuadraturas</a></li><li id="liVerArchivo"><a id="linkVerArchivo" class="linkMouse" >Descargar Archivo</a></li><li id="liVerCertEnvio"><a id="linkVerCertEnvio" class="linkMouse">Ver Certificado de Env&iacuteo</a></li><li id="liVerMas"><a id="linkVerInfoError" class="linkMouse">Ver Resumen de Errores</a></li></ul></div></div></div>';
	cont=cont+'<div class="Acceso" id="dialogErrorCGF" title="Prop" align="justify" style="width:600px; height:auto;max-height:400; display:none;z-index:2001;" class="TextoNombre"><div id="popUpInfoPI" class="TextoPopupPrincipal"></div><div style="width:660px;max-height:400px; margin:auto 0;overflow-y:scroll ;"><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 10px 0 0 15px;"><div style="clear: both;width:620px;float:left;"><label id="estadoSendCGRError" style="display:inline;"></label> por <label id="userSendCGRError" style="display:inline;">Contralor&iacutea</label> el d&iacutea<label id="dateSendCGRError" style="display:inline;">19/12/12 a las 14:23</label></div></div><div style="float:left;margin:5px 0 0 15px;"></div><div style="clear: both;display: block; margin: 40px 0 20px 15px;"><div style="clear: both;" class="grillaInformes"><div style="clear: both;" class="rwEncInf"><div class="tituloInfColError">Tipo</div><div class="tituloInfColError">L&iacutenea</div><div class="tituloInfColErrorFinal">Error</div></div><div class="contEstInfAnual" id="divResumenError"></div></div></div></div></div>';

	$('body').append(cont);
	
	$(".popUpInf").live({
		mouseenter: function(){
			if ($(this).attr('onclick')) {
				$(this).css({'cursor':'pointer'});
				var datos=$(this).attr('onclick').split(",");
				estado=datos[7].split(")")[0];
				tooltip="<div class='ui-tooltip-content' style='width:450px;position:absolute; '>"+ 
							"<div class='tooltip-title'>" +$('#inf0'+datos[0].split("(")[1]).text()+"</div>"+
							"<div class='tooltip-content'>"+
								"<p style='margin:0;padding:0;'>"+getState(datos[7].split(")")[0])+" por "+datos[3].replace("'","").replace("'","")+" el "+datos[4].split(" ")[0].replace("'","").replace("'","")+" a las "+datos[4].split(" ")[1].replace("'","").replace("'","")+"</p>"; 
				
				if((estado=="6")||(estado=="7")||(estado=="10")){
					tooltip=tooltip+"<br><p style='margin:0;padding:0;'>N&deg; de Env&iacuteo: "+datos[6].replace("'","").replace("'","").replace(")","")+"</p>";
				}
				tooltip=tooltip+"<br><p style='margin:0;padding:0;' class='tooltip-message'>Para Acceder a m&aacutes Informacion Haga Click sobre el Icono del Estado del Informe</p></div></div>";
				
				$('body').append(tooltip);
				izq=0;
				if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
				else{							izq=$(this).offset().left-450;}
				$('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});
			}
			
		},
		mouseleave: function(){
			if ($(this).attr('onclick')){$('div').remove('.ui-tooltip-content');}
		}
	});
	
	
	$.fx.speeds._default = 650;
	$(function() { $( "#dialog" ).dialog({ autoOpen: false,show: "blind", width: 505});});
}


function loadPeriodo(){
		
	console.log('loadPeriodo() - cbEjercicio: '+$("#cbEjercicio option:selected").val());
	$.ajax({
		url: 'getStateInfAnualUsers.action',
		type: "POST",
		dataType:"json",
		data: { tipoInfId: $("#listaTipoInformes option:selected").val(), 
				ejercicioId: $("#cbEjercicio option:selected").val()},
		beforeSend: function (xhr){
			$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
				 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#fadePeriodos').remove();
			$('#waitPeriodos').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			
			jAlert("Ha ocurrido un error al intentar de actualizar el seguimiento de informes", "Seguimiento de Informe", 
					function(r){
						if(r){
							$(location).attr('href',url='homeMun.action');
						}
					});
			/**/
		},
	    success: function(data){
	    	switch(data.estado){
	    	case -2:jAlert(data.mensaje, "Seguimiento de Informe", function(r){if(r){$(location).attr('href',url='homeMun.action?abreCarga=0');}} );break;
	    	case -1:jAlert(data.mensaje, "Seguimiento de Informe", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	actualizarGrillaInformes(data, $("#cbEjercicio option:selected").val() );
	    }
	});
}


function loadReporteInformeAnual(){
	
	console.log("Llama a getStateInfAnualCGR");
	var accion = 'getStateInfAnualUsersCGR.action?sector='+$("#cbTpEntidad option:selected").val()+
					'&tipoInf='+$("#cbTipoInformes option:selected").val() + 
					'&entd='+$("#cbComuna option:selected").val()+
					'&ejer='+$("#cbEjercicio option:selected").val();
	$.ajax({
		url: accion,
		type: "POST",
		dataType:"json",
		error: function(XMLHttpRequest, textStatus, errorThrown){
			
		},
	    success: function(data){
	    	sessTpEntidad=data.session.user.tipoEntidadId;
	    	
	    	//alert($.session.get("user.tipoEntidadId"));
	    	switch(data.estado){
	    	case -2:jAlert(data.mensaje, "Seguimiento", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
	    	case -1:jAlert(data.mensaje, "Seguimiento", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	actualizarGrillaInformes(data, $("#cbEjercicio option:selected").val() );
	    }
	});
}


function actualizarGrillaInformes(xml, idEjercicio){
	
	//if(xml.hayComplementos>0){
	//	alert("actualizarGrillaInformes : hayComplementos > 0");
		$("#titCorr").text("COR"); 
		$("#titCorr").css("width","37px");
		//}else{
		//alert("actualizarGrillaInformes : hayComplementos <= 0");
		//$("#titCorr").text("");
		//$("#titCorr").css("width","0px");
		//}
	
	//limpia contenedor
	$('#contEstInfAnual').text('');
	
	var periodosNom = [ 'Ape','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Cor','Cie' ];
	var periodosCod = [ '00','01','02','03','04','05','06','07','08','09','10','11','12','Cor','13' ];
	
	$.each(xml.informesEstadosAnualBO.infomes, function(i, itm) {
		//crea contenedor de informe  informeNombre
		var row='rw_inf0'+(itm.informeId);
		var clase='';
		if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp";}
		jQuery('<div/>', {id:row,class:clase}).appendTo('.contEstInfAnual');
		
		//imprime contenedor con el nombre del informe
		var rowcol = 'inf' + (itm.informeId);
		clase = 'detalleInfCol01';
		jQuery('<div/>', { 
				id: rowcol, 
				class: clase, 
				html:  "<div style='display:inline-block;width:6%;vertical-align:top;'>"+itm.informeCodigo+"</div>"+"<div style='display:inline-block;width:2%;vertical-align:top;'>"+" - </div>"+"<div id='envio_"+itm.informeId+"' style='display:inline-block;width:92%;'> "+itm.informeNombre+"</div> "
		}).appendTo('#'+row);
		
		clase = 'detalleInfColPer';
		$.each(periodosCod, function(p, pitm){
			var rowcol='inf'+(itm.informeId)+'_'+pitm;
			jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
			var objeto=	"<img id='inf"+(itm.informeId)+'_'+pitm+"' src='/SICOGEN2_PUB/resources/img/blanco.png' class='img18 popUpInf pi"+itm.informeId+" cod"+pitm+"' aria-describedby='ui-tooltip-8' />";
			$('#' + rowcol).append(objeto);
			if(pitm=='Cor'){
				$('#inf'+(itm.informeId)+'_'+pitm).hide();
			}
		});
		
		/*$.each(xml.informesEstadosAnualBO.pendientes, function(p, pitm){
				if(xml.informesEstadosAnualBO.pendientes.length > 0){
					clearInterval(intervalo);
					intervalo=setInterval(function(){
						reconsultaPendientesAnual(0,$("#cbEjercicio option:selected").val(),-1)
						},15000);
					$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').attr('src','images/loader.gif');
				}
				
		});*/
		$.each(xml.informesEstadosAnualBO.estados, function(p, pitm){
			switch(pitm.archivoEstadoId){
				case  3:	imagen='images/error.png';break;
				case  4:	imagen='images/Validado.png';break;
				case  5:	imagen='images/ValidadoOBS.png';break;
				case  6:	imagen='images/Procesado.png';break;
				case  7:	imagen='images/ProcesadoOBS.png';break;
				case  8:	imagen='images/NotMov.png';break;
				case 10:	imagen='images/NotMovProc.png';break;
				default:	imagen='images/blanco.png';break;
			}
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').attr('src',imagen);
			
			var fechas=pitm.archivoFecha.split(' ');
			var menEstado="";
			switch(pitm.archivoEstadoId){
				case  3:	menEstado="Informe con error bloqueante cargado ";break;
				case  4:	menEstado="Validado en CGR ";break;
				case  5:	menEstado="Validado con observaciones en CGR ";break;
				case  6:	menEstado="Enviado a CGR ";break;
				case  7:	menEstado="Enviado con observaciones a CGR ";break;
				case  8:	menEstado="Validado sin movimiento en CGR ";break;
				case 10:	menEstado="Enviado sin movimiento a CGR ";break;
			}
			
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').live({
				mouseenter: function(){
					//if ($(this).attr('onclick')) {
						$(this).css({'cursor':'pointer'});
						
						tooltip="<div class='ui-tooltip-content' style='width:450px;position:absolute; '>"+ 
									"<div class='tooltip-title'>"+ $('#inf'+pitm.informeId).text() +"</div>"+
									"<div class='tooltip-content'>"+
										"<p style='margin:0;padding:0;'>"+menEstado+" por "+pitm.archivoUsuario+" el "+fechas[0]+" a las "+fechas[1]+
										"</p>"; 
						
						if((pitm.archivoEstadoId=="6")||(pitm.archivoEstadoId=="7")||(pitm.archivoEstadoId=="10")){
							tooltip=tooltip+"<br><p style='margin:0;padding:0;'>N&deg; de Env&iacuteo: "+pitm.certificadoId+"</p>";
						}
						tooltip=tooltip+"<br><p style='margin:0;padding:0;' class='tooltip-message'>Para Acceder a m&aacutes Informacion Haga Click sobre el Icono del Estado del Informe</p></div></div>";
						
						$('body').append(tooltip);
						
						izq=0;
						if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
						else{							izq=$(this).offset().left-450;}
						$('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});
					//}
				},
				mouseleave: function(){
					//if ($(this).attr('onclick')){
						$('div').remove('.ui-tooltip-content');}
					//}
			});
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').click({
				informe: 	pitm.informeId, 			//3
				periodo: 	pitm.periodoInformeId,		//90
				ejercicio:	pitm.ejercicioId,			//2
				usuario:	pitm.archivoUsuario,		//smoke
				fecha:		pitm.archivoFecha,			//'01/10/2015 16:57:20'			
				periodo2:	pitm.periodoEjercicioId,	//
				certificado:pitm.certificadoId,			//certificadoId
				estado:		pitm.archivoEstadoId		//archivoEstadoId
			}, abrePopUpEvent);
		});
	});
	
	// ESTO ESTABA COMENTADO
	$.each(xml.informesEstadosAnualBO.correcciones, function(i, itm) {
		var param=$("#cbEjercicio option:selected").val()+','+itm.informeId+',"'+$('#inf0'+itm.informeId).text()+'","'+
				  $("#cbEjercicio option:selected").text()+'"';
		
		var objeto="<a class='gbgt gbes' id='gbg"+i+"' onclick='verComplementosEnviados("+param+")'><div id='gbgs"+i+"'><span id='gbi"+i+"'>Ver</span></div></a>";
		$(objeto).appendTo('#inf0'+itm.informeId+'_Cor');
		$('#gbgs'+i).css({'cursor':'pointer'});
	});
	
	/*if ($("#cbComuna").length > 0){
		ent=$("#cbComuna option:selected").val();
	}else{
		ent=0;
	}
	
	if ($("#listaTipoInformes").length > 0){
		tpInforme=$("#listaTipoInformes option:selected").val();
	}else{
		tpInforme=$("#cbTipoInformes option:selected").val();
	}
	$.ajax({
		url: 'getInformesReversadosByEjer.action',
		type: "POST",
		dataType:"json",
		async:false,
		data: { entidad:ent,
				tipoArchivo: 0,
				ejercicio: $("#cbEjercicio option:selected").val(),
				tipoInforme: tpInforme
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeInformesReversados" class="overlay" style="display:block"></div>'+
				 '<div id="waitInformesReversados" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#fadeInformesReversados').remove();
			$('#waitInformesReversados').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){},
	    success: function(data){
	    	switch(data.estado){
	    	case -2:jAlert(data.mensaje, "Busqueda de Reversos", function(r){if(r){$(location).attr('href',url='homeMun.action?abreCarga=0');}} );break;
	    	case -1:jAlert(data.mensaje, "Busqueda de Reversos", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	$.each(data.listReversas, function(i, itm) {
	    		$("img[id*='inf0"+itm.informeId+"_p"+itm.periodoId+"']").each(
	    			function (i, el){	
	    				$(this).parent().css('background-color',revColor); 
	    			});
	    	});
	    }
	});*/
	
}


//***************************************abrePopUpEvent****************************************************
function abrePopUpEvent(event){
	
	console.log("informeAnual.js - abrePopUpEvent");
	
	informe = event.data.informe;
	periodo = event.data.periodo;
	ejercicio = event.data.ejercicio;
	usuario = event.data.usuario;
	fecha = event.data.fecha;
	periodo2 = event.data.periodo2;
	idFileUpload =  event.data.idFileUpload; // variable
	certificado = event.data.certificado;
	estado = event.data.estado;
	var fec=fecha.substr(0, 10);
	var hor=fecha.substr(11, 8);
	//var  fec,hor;
	//alert(idFileUpload);
	console.log("informeAnual.js - informe: "+informe);
	
	$("#userModal").text(usuario);
	$("#fechaModal").text( fec.substr(8, 2)+"-"+fec.substr(5, 2)+"-"+fec.substr(0, 4) + ' a las ' + hor.substr(0, 5));
	$('#estadoModal').text( getState(''+estado) );
	$('#idFileUpload_rv').text( idFileUpload );
	$("#idInforme_form").text(informe);
	$("#periodo").text(periodo);
	
	//var fec, hor;
	
	if(fecha != null){
		fec=fecha.substr(0, 10);
		hor=fecha.substr(11, 8);		
	}
	
	if(sessTpEntidad==1){
		$("#liVerBitacora").show();
	}else{
		$("#liVerBitacora").hide();
	}
	
	
//	if((estado=="6")||(estado=="7")||(estado=="10")){
//		$("#contEnvio").show();
//	}else{
//		$("#contEnvio").hide();
//	}
	$("#dialog").css({'left':'0px'});
	$("#ui-id-1").text($("#inf0"+informe).text());
	$("#corrEnvio").text(certificado);
	$("#userSendCGR").text(usuario);
	$("#dateSendCGR").text(fec + ' a las ' + hor);
	$('#estadoSendCGR').text( getState(''+estado) );
	$("#dateSendCGRError").text(fec + ' a las ' + hor);
	$('#estadoSendCGRError').text( getState(''+estado) );
	var glosaEjercicio = $('#cbEjercicio :selected').text();
	var ejercicioId=$('#cbEjercicio :selected').val();
	var url="";
	var ent="";
	
	/**
	if ($("#cbComuna").length > 0){
		ent=$("#cbComuna option:selected").val();
	}else{
		ent=0;
	}
	*/
	
	sessEntidad=ent;
	var parametros='idFileUp='+idFileUpload+'&periodo='+periodo2+'&tpInforme=0'+'&glosaEjercicio='+glosaEjercicio+'&informe='+informe+'&entidad='+ent+'&ejrId='+ejercicioId;

//	if(informe > 4 && informe < 11)
//	{
//		//alert("Estados Financieros");
//		dowFil='downloadPDF?'+parametros;
//	}else{
////		alert("Presup Contable");
//		dowFil='download?'+parametros;
//	}

	var verInf='';
	
	/**
	switch(informe){
		case 1:	repVal='getValidacionInformePI?'+parametros; break;
		case 2:	repVal='getValidacionInformeAP?'+parametros; break;
		case 3:	repVal='getValidacionInformeII?'+parametros; break;
		case 4: repVal='getValidacionInformeIP?'+parametros; break;
		case 5:	repVal='getValidacionInformeAG?'+parametros; break;
		case 6: repVal='getValidacionInformeAN?'+parametros; break;
		case 7:	repVal='getValidacionInformeDP?'+parametros; break;
		case 8: repVal='getValidacionInformeAI?'+parametros; break;
	}
	*/
	
	verInf='./cargaInformes/validacionIC?idFileUp='+idFileUpload;
	repVal='getValidacionInforme?'+parametros;
	
	console.log("-->>");
	console.log(estado);
  
	switch(estado){
	
		case 3: // Para el estado="Rechazado con errores en "
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').show();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').hide();
				$('#liVerMas').show();
				$("#liVerBitacora").show();
				break;
		case 4:// Habilita todas la opciones menos ver errores
				if(informe > 4 && informe < 11)
				{					
					console.log("informeAnual.js - case 4: ");					
					$('#liVerInforme').hide();// ver informe
					$('#liVerRepValidacion').hide();// Reporte de validaci�n
					
					$('#liVerRepCuadratura').hide();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show();
					$('#liVerMas').hide();//oculta Ver archivos errores
					$("#liVerBitacora").show();
				}else{
					$('#liVerRepCuadratura').show();
					$('#liVerInforme').show();// ver informe
					$('#liVerRepValidacion').show();// Reporte de validaci�n
					//$('#liVerRepCuadratura').hide();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show(); 
					$('#liVerMas').hide();//oculta Ver archivos errores
					//Original: $('#liVerMas').show();
					$("#liVerBitacora").show();
				};
				break;
		case 5:// Habilita todas la opciones 
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').hide();
				$('#liVerMas').show();
				$("#liVerBitacora").show();
				break;
		case 6:// Habilita todas la opciones menos ver errores
				if(informe > 4 && informe < 11){
					
					console.log("informeAnual.js - case 6: ");
					
					$('#liVerInforme').hide();// ver informe
					$('#liVerRepValidacion').hide();// Reporte de validaci�n
					$('#liVerRepCuadratura').hide();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show();
					$('#liVerMas').hide();//oculta Ver archivos errores
					$("#liVerBitacora").show();
				}else{
					$('#liVerInforme').show();// ver informe
					$('#liVerRepValidacion').show();// Reporte de validaci�n
					$('#liVerRepCuadratura').hide();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show();
					$('#liVerMas').hide();//oculta Ver archivos errores
					$("#liVerBitacora").show();
				};
				break;
		case 7:// Habilita todas la opciones menos ver errores
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').show();
				$('#liVerMas').show();
				$("#liVerBitacora").show();
				break;
		case 8: // para el estado="Validado sin movimiento en
				$('#liVerInforme').hide();// ver informe
				$('#liVerRepValidacion').hide();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').hide();// Ver archivos
				$('#liVerMas').hide();//oculta Ver archivos errores
				$('#liVerCertEnvio').hide();
				break;
		case 10:// para el estado="Enviado sin movimiento a "
				// Ocultar Opciones
				$('#liVerInforme').hide();// Ocultar ver informe
				$('#liVerRepValidacion').hide();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').hide();// Ver archivos
				$('#liVerCertEnvio').show();
				$('#liVerMas').hide();//oculta Ver archivos errores
				break;
		default:
			$('#popupVerMas').show();// Habilita todas las opciones del popup
			$('#liVerMas').hide();// Oculta resumen errores
			break;
	}

 
	
	//$('#linkVerInfoError').click(function (){popUpInformes(informe,periodo2,0);});
	//$('#liVerMas').click(function (){popUpInformes(informe,periodo2,0);});
	
	
	
	
	$("#liVerBitacora").click
	(
			function ()
			{
				var parametros = idFileUpload;
				popUpBitacora(parametros);
				}
			);
	
	$('#linkVerInforme').click(function (){
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(verInf, windowName, windowSize);
	});
	
	$('#linkVerRepCuadratura').click({par:parametros},function (e){	popRepCuadratura(e);	});
	
	$('#linkVerRepValidacion').click(function (){
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(repVal, windowName, windowSize);
    });
	
	$('#linkVerCertEnvio').click(function ()
	{
//		alert("corrEnvio" + corrEnvio);
//		alert("certificado" + certificado);	
		
//		if ('0'!=$('#corrEnvio').text()){	
//			jAlert('No se ha enviado el informe a Contraloria', "Certificados");			
//		}else{
		
		
 		var parametros= 'certificado='+certificado;
 		if ('0' == $('#corrEnvio').text()) {	
			console.log('entre a mostrar alerta');
			jAlert('No se ha enviado el informe a Contraloria', "Certificados");			
		} else {		
			//url='certificadoEnvio.action?certificado='+ certificado;
			url='certificadoEnvio.action?'+parametros;
			var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
			var windowName = "popUp";
			var windowSize = windowSizeArray[  $(this).attr("rel")  ];
			window.open(url, windowName, windowSize);
			//window.open('certificadoEnvio.action', windowName, windowSize);
		}
    });
	
	$("#dialog").dialog("open");
	$("span.ui-dialog-title").text(		$('#inf'+informe).text()	);
	
	//$(".ui-icon-closethick").css({ "background-position": "-32px -192px;"});
	$(".ui-icon-closethick").css('background-position', '-32px -192px');
	$(".ui-icon-closethick").css('background-color', '#F2F2F2');
	$(".ui-icon-closethick").css('top', '0px');
	$(".ui-icon-closethick").css('left', '0px');
	
	//images/ui-icons_222222_256x240.png
	

}	
	
 
function abrePopUp(informe, periodo, ejercicio, usuario, fecha, periodo2, certificado, estado){
	
	var fec=fecha.substr(0, 10);
	var hor=fecha.substr(11, 8);
	
	if(sessTpEntidad==1){
		$("#liVerBitacora").show();
	}else{
		$("#liVerBitacora").hide();
	}
	
	
	if((estado=="6")||(estado=="7")||(estado=="10")){
		$("#contEnvio").show();
	}else{
		$("#contEnvio").hide();
	}
	$("#dialog").css({'left':'0px'});
	$("#ui-id-1").text($("#inf0"+informe).text());
	$("#corrEnvio").text(certificado);
	$("#userSendCGR").text(usuario);
	$("#dateSendCGR").text(fec + ' a las ' + hor);
	$('#estadoSendCGR').text( getState(''+estado) );
	$("#dateSendCGRError").text(fec + ' a las ' + hor);
	$('#estadoSendCGRError').text( getState(''+estado) );
	var glosaEjercicio = $('#cbEjercicio :selected').text();
	var ejercicioId=$('#cbEjercicio :selected').val();
	var url="";
	var ent="";
	
	/**
	if ($("#cbComuna").length > 0){
		ent=$("#cbComuna option:selected").val();
	}else{
		ent=0;
	}
	*/
	
	sessEntidad=ent;
	var parametros='periodo='+periodo2+'&tpInforme=0'+'&glosaEjercicio='+glosaEjercicio+'&informe='+informe+'&entidad='+ent+'&ejrId='+ejercicioId;
	
	
	if(informe > 4 && informe < 11){
		dowFil='downloadPDF?'+parametros;
	}else{
		dowFil='download?'+parametros;
	}
	
	var verInf='';
	
	/**
	switch(informe){
		case 1:	repVal='getValidacionInformePI?'+parametros; break;
		case 2:	repVal='getValidacionInformeAP?'+parametros; break;
		case 3:	repVal='getValidacionInformeII?'+parametros; break;
		case 4: repVal='getValidacionInformeIP?'+parametros; break;
		case 5:	repVal='getValidacionInformeAG?'+parametros; break;
		case 6: repVal='getValidacionInformeAN?'+parametros; break;
		case 7:	repVal='getValidacionInformeDP?'+parametros; break;
		case 8: repVal='getValidacionInformeAI?'+parametros; break;
	}
	*/
	
	verInf='./cargaInformes/validacionIC?idFileUp='+idFileUpload;
	repVal='getValidacionInforme?'+parametros;
	
	switch(estado){
		case 3: // Para el estado="Rechazado con errores en "
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').show();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').hide();
				$('#liVerMas').show();
				break;
		case 4:// Habilita todas la opciones menos ver errores
				if(informe > 4 && informe < 11){
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').hide();//oculta certificado de envio
				}else{	
					$('#liVerInforme').show();// ver informe
					$('#liVerRepValidacion').show();// Reporte de validaci�n
					$('#liVerRepCuadratura').hide();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').hide();//oculta certificado de envio
					$('#liVerMas').show();//oculta Ver archivos errores
				};
				break;
		case 5:// Habilita todas la opciones 
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').show();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').hide();
				$('#liVerMas').hide();
				break;
		case 6:// Habilita todas la opciones menos ver errores
				if(informe > 4 && informe < 11){
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show();
				}else{
					$('#liVerInforme').show();// ver informe
					$('#liVerRepValidacion').show();// Reporte de validaci�n
					$('#liVerRepCuadratura').show();// Reportes de cuadratura
					$('#liVerArchivo').show();// Ver archivos
					$('#liVerCertEnvio').show();
					$('#liVerMas').hide();//oculta Ver archivos errores
				};
				break;
		case 7:// Habilita todas la opciones menos ver errores
				$('#liVerInforme').show();// Ocultar ver informe
				$('#liVerRepValidacion').show();// Reporte de validaci�n
				$('#liVerRepCuadratura').show();// Reportes de cuadratura
				$('#liVerArchivo').show();// Ver archivos
				$('#liVerCertEnvio').show();
				$('#liVerMas').hide();
				break;
		case 8: // para el estado="Validado sin movimiento en
				$('#liVerInforme').hide();// ver informe
				$('#liVerRepValidacion').hide();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').hide();// Ver archivos
				$('#liVerMas').hide();//oculta Ver archivos errores
				$('#liVerCertEnvio').hide();
				break;
		case 10:// para el estado="Enviado sin movimiento a "
				// Ocultar Opciones
				$('#liVerInforme').hide();// Ocultar ver informe
				$('#liVerRepValidacion').hide();// Reporte de validaci�n
				$('#liVerRepCuadratura').hide();// Reportes de cuadratura
				$('#liVerArchivo').hide();// Ver archivos
				$('#liVerCertEnvio').show();
				$('#liVerMas').hide();//oculta Ver archivos errores
				break;
		default:
			$('#popupVerMas').show();// Habilita todas las opciones del popup
			$('#liVerMas').hide();// Oculta resumen errores
			break;
	}
 
	$('#linkVerInfoError').click(function (){
		popUpInformes(informe,periodo2,0);
	});
	
	//$("#liVerBitacora").unbind('click');
	
//	$("#liVerBitacora").click
//	(
//			function ()
//			{
//				var parametros = idFileUpload;
//				popUpBitacora(parametros);
//				}
//			);
//	
	$('#linkVerInforme').click(function (){
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(verInf, windowName, windowSize);
	});
	
	$('#linkVerRepCuadratura').click({par:parametros},function (e){	popRepCuadratura(e);	});
	
	$('#linkVerRepValidacion').click(function (){
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(repVal, windowName, windowSize);
    });
	
	$('#linkVerCertEnvio').click(function (){
//		if ('0'==$('#corrEnvio').text()){	
//			jAlert('No se ha enviado el informe a Contraloria', "Certificados");			
//		}else{
			url='certificadoEnvio.action?certificado='+ certificado;
			var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
			var windowName = "popUp";
			var windowSize = windowSizeArray[  $(this).attr("rel")  ];
			//window.open(url, windowName, windowSize);
			window.open('certificadoEnvio.action', windowName, windowSize); //DATO DURO
//		}
    });
	$("#dialog").dialog("open");
	$("span.ui-dialog-title").text($("#ui-id-1").text());
	
	//$(".ui-icon-closethick").css({ "background-position": "-32px -192px;"});
	$(".ui-icon-closethick").css('background-position', '-32px -192px');
	$(".ui-icon-closethick").css('background-color', '#F2F2F2');
	
	//images/ui-icons_222222_256x240.png
	
}


function popRepCuadratura(event){
	
	$(".ui-dialog-content").dialog("close");
	$('#fadeRC').remove();
	$('#popup1').remove();
	$('body').append('<div id="fadeRC" class="overlay" style="display:block"></div>'+
					 '<div id="popup1" class = "contenedorEnvioArchivo modalCarga" style="display:none;left:5%;position:absolute;width:1076px;height:550px;z-index:2005;padding:15px !important">'+ 
					 '    <div id="cerrar" style="float:rigth;">'+
					 '		 <img src="/SICOGEN2_PUB/resources/img/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="cierraReporteCuadratura()"></img>'+
					 '	  </div>'+
					 '	  <div id ="popRepCuadr" style="width:1005px;height:550px;border:0px none;float:left;"></div>'+
					 '</div>');
	
	$("body").css("cursor", "wait");
	
	$.ajax({url: 'verReporteCuadratura.action?'+event.data.par,
    	type: "POST",
    	dataType: "html",
    	async: true,
    	error: function(XMLHttpRequest, textStatus, errorThrown){
			$("body").css("cursor", "default");
	    },
	    success: function(data){
	    	$('#popRepCuadr').html(data);
	    	
	    	$("body").css("cursor", "default");
	    }
	});
	$('#fadeRC').show();
	$('#fade').show();
	$('#popup1').show();
}


function popUpBitacora(parametros){
	
	console.log("popUpBitacora - parametros: " +parametros);
	action='verBitacoraInforme?parametros='+parametros;
	$.ajax({
		url:action,
		type:'POST',
		dataType:'json',
		error: function(XMLHttpRequest, textStatus, errorThrown){},
	    success: function(data){
	    	
	    	console.log("popUpBitacora - success - data: " +data.listaReporteBitacora);
	    	
	    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Ver Complementos", function(r){if(r){$(location).attr('href',url='homeCgr.action?abreCarga=0');}} );break;
		    	case -1:jAlert(data.mensaje, "Ver Complementos", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	
	    	/**
	    	$('body').append(	'<div id="fadeBitacora" class="overlay">'+
	    						'</div><div id="contBitacora" class="contBitacora modalCarga" style="display: none;position:absolute;height:500px;left: 25%;z-index:2005;width:600px;padding:15px !important">'
					    			+ '    <div id="cerrar" style="float:rigth;">'
									+ '		 <img src="images/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="closeBitacora()"></img>'
									+ '	  </div>'
									+'<div id="infBitacora" style="font: bold 14px arial;padding:15px 0 5px;"></div>'
	    							+'<table id="tblBitacora" class="tabla2" style="width:500px;">'
			    					+'<thead class="rw_cabecera">'
			    					+	'<tr class="rw_cabecera">'
			    					+		'<th style="width:30%;">Estado</th><th style="width:15%;">Usuario</th><th style="width:20%;">Fecha Procesamiento</th><th style="width:15%;">N&deg; de Env&iacuteo</th>'
			    					+	'</tr>'
			    					+	'</thead>'
			    					+'<tbody style="font: 10px arial;"></tbody>'
			    					+'</table>'
			    				+'</div>');
	    	*/
	    	
	    	
	    	$('body').append('<div id="fadeBitacora" class="overlay"></div>'+
							 '<div id="contBitacora" class="contBitacora modalCarga" style="display: none;position:absolute;height:500px;left: 25%;z-index:2005;width:600px;padding:15px !important">'
		    			   + '	<div id="cerrar" style="float:rigth;">'
						   + '		<img src="/SICOGEN2_PUB/resources/img/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="closeBitacora()"></img>'
						   + '	</div>'
						   + '	<div id="infBitacora" style="font: bold 14px arial;padding:15px 0 5px;"></div>'
					   + '		<table id="tblBitacora" class="grillaInformes" style="width:600px;">'
					   + '			<thead class="" style="width:600px;">'
					   + '				<tr class="rwEncInf" style="width:600px;">'
					   + '					<th style="width:99px;text-align:center" class="tituloInfColError">Estado</th>'
					   + '                  <th style="width:99px;text-align:center" class="tituloInfColError">Usuario</th>'
					   + '                  <th style="width:189px;text-align:center" class="tituloInfColError">Fecha Procesamiento</th>'
					   + '                  <th sstyle="width:99px;text-align:center"  class="tituloInfColError">N&deg; de Env&iacuteo</th>'
					   + '				</tr>'
					   + '			</thead>'
					   + '			<tbody style="font: 10px arial;"></tbody>'
					   + '		</table>'
    				       + '</div>');
	    	
	    	
	    	
	    	$("#tblBitacora tbody").html('');
	    	$.each(data.listaReporteBitacora, function(i, item) {
	    		
	    		$('#infBitacora').text(item.informe);
	    		clase='';
	    		//if (i%2===0) {clase='rw_DetPar'; }else{ clase='rw_DetImp';}
	    		if (i%2===0) {clase='rwdetInfPar'; }else{ clase='rwdetInfImp';}
	    		
	    		/**
	    		$("#tblBitacora tbody").append('<tr class="'+clase+'">'+							
						'<td style="width:172px;text-align:center;" class="tituloInfColError">'+item.estado+'</td>'+
						'<td style="width:80px;" class="tituloInfColError">'+item.usuario+'</td>'+
						'<td style="width:113px;text-align:center;" class="tituloInfColError">'+item.fechaEnvio+'</td>'+
						'<td style="width:65px;text-align:center;" class="tituloInfColError">'+item.certificado+'</td></tr>');
	    		*/
	    		
	    		
	    		$("#tblBitacora tbody").append('<tr class="'+clase+'">'+							
						'<td style="width:99px;text-align:center;" class="detalleInfColError">'+item.estado+'</td>'+
						'<td style="width:99px;text-align:center;" class="detalleInfColError">'+item.usuario+'</td>'+
						'<td style="width:189px;text-align:center;" class="detalleInfColError">'+item.fechaEnvio+'</td>'+
						'<td style="width:99px;text-align:center;" class="detalleInfColError">'+item.certificado+'</td></tr>');
	    		
	    	});
	    	
	    	$('#fadeBitacora').show();
			$('#contBitacora').show();
			
			
			/**
	    	var row;
	    	$.each(data.listaCorrecciones, function(i, item) {
	    		var clase='';
	    		if(i%4==0){clase='rwdetInfPar';}else{clase='rwdetInfImp';}
	    		row='<div id="rw_Compl'+i+'" class="'+clase+'" style="clear:both;font:10px arial;">';
	    		
	    		row=row+'<div style="float:left;width:70px;">'+item.periodo+'</div>';
	    		row=row+'<div style="float:left;width:260px;">'+item.usuario+'</div>';
	    		row=row+'<div style="float:left;width:50px;">'+item.fecha+'</div>';
	    		row=row+'<div style="float:left;width:80px;margin:0 15px;">'+item.estado+'</div>';
	    		row=row+'<div style="float:left;width:80px;"><a id="showInforme'+i+'">Ver Informe</a></div>';
	    		row=row+'<div style="float:left;width:100px;"><a id="showReporte'+i+'">Ver Validacion</a></div>';
	    		row=row+'<div style="float:left;width:100px;"><a id="showCuadratura'+i+'">Ver Cuadratura</a></div>';
	    		
	    		if (item.certificado>0){ row=row+'<div><a id="showCertificado'+i+'">Ver Certificado</a></div>';}
	    		row=row+'</div>';
	    		$('#contDetalleComplementos').html(row);
	    		
	    		var parametros=item.periodoId+',"'+ item.informe +'",'+item.informeId+','+nomEjer+','+item.correccionId;
	    		$('#showInforme'+i).attr('onclick','muestraInformeCorreccion('+parametros+')');
	    		$('#showInforme'+i).css({'cursor':'pointer'});
	    		$('#showReporte'+i).attr('onclick','muestraValidacionCorreccion('+parametros+')');
	    		$('#showReporte'+i).css({'cursor':'pointer'});
	    		if (item.certificado>0){$('#showCertificado'+i).attr('onclick','muestraCertificadoCorreccion('+item.certificado+')');$('#showCertificado'+i).css({'cursor':'pointer'});}
	    		$('#showCuadratura'+i).css({'cursor':'pointer'});
	    		$('#showCuadratura'+i).click(function (){
	    			$('body').append('<div id="fade" class="overlay" ></div>'+
	    							 '<div id="popup1" class = "contenedorEnvioArchivo modalCarga" style="display: none;position:absolute;height:600px;z-index:2005;padding:15px !important">'+ 
	    							 '    <div id="cerrar" style="float:rigth;">'+
	    							 '		 <img src="images/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="cierraReporteCuadratura()"></img>'+
	    							 '	  </div>'+
	    							 '	  <div id ="popRepCuadr" style="width:1075px;height:580px;border:0px none;float:left;"></div>'+
	    							 '</div>');
	    			
	    			$("body").css("cursor", "wait");
	    			
	    			$.ajax({url: 'repCuadratura',
	    		    	type: "POST",
	    		    	dataType: "html",
	    		    	async: true,
	    		    	error: function(XMLHttpRequest, textStatus, errorThrown){
	    					$("body").css("cursor", "default");
	    			    },
	    			    success: function(data){
	    			    	$('#popRepCuadr').html(data);
	    			    	$("body").css("cursor", "default");
	    			    }
	    			});
	    			$('#fade').show();
	    			$('#popup1').show();
	    		});
	    		
	    		$('#showCuadratura'+i).attr('onclick','muestraReporteCuadraturasComp();');
            });
	    	*/
	    	
	    	
	    	$('body').css('cursor', 'default');
	    }
	});
	
}




function muestraValidacionCorreccion(idFileU,periodo,tpInforme,glosaEjercicio,informeId,entidad,ejrId){

	var parametros = 'idFileUp='+idFileU+'&periodo='+periodo+'&tpInforme='+tpInforme+'&glosaEjercicio='+glosaEjercicio+'&informe='+informeId+'&entidad='+entidad+'&ejrId='+ejrId;

		url= 'getValidacionInforme.action?'+parametros;	
		
		var windowSizeArray = [ "width=200,height=200", "width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		
		window.open(url, windowName, windowSize);
	}

function muestraInformeCorreccion(idFileU,periodo,tpInforme,glosaEjercicio,informeId,entidad,ejrId){
	
	var parametros = 'idFileUp='+idFileU+'&periodo='+periodo+'&tpInforme='+tpInforme+'&glosaEjercicio='+glosaEjercicio+'&informe='+informeId+'&entidad='+entidad+'&ejrId='+ejrId;

	url = './cargaInformes/validacionIC?idFileUp='+idFileUpload;
	
	var windowSizeArray = [ "width=200,height=200", "width=300,height=400,scrollbars=yes" ];
	var windowName = "popUp";
	var windowSize = windowSizeArray[  $(this).attr("rel")  ];
	
	window.open(url, windowName, windowSize);
}


function muestraCertificadoCorreccion(certificado){
	
	url='certificadoEnvio.action?certificado='+ certificado;
	var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
	var windowName = "popUp";
	var windowSize = windowSizeArray[  $(this).attr("rel")  ];
	
	window.open(url, windowName, windowSize);
}


function muestraReporteCuadraturasComp(){
	
	$(".ui-dialog-content").dialog("close");
	$("#popRepCuadr").attr('src','repCuadratura');
	$("#popup1").css('display','block');
}


function popUpInformes(informe, periodo,tpInforme){
	
	loadResumenErrores(informe,periodo,tpInforme);
	$("#dialogErrorCGF").dialog({}).dialog("open");
	$("#dialog").dialog( "close" );
	$("#dialog").css('width','680px');
	$("#dialog").css('left','300px');
	$("#dialogErrorCGF").parent().css('width','680px');
	$("#dialogErrorCGF").parent().css('left','25%');
	$("#dialogErrorCGF").parent().css('top','10%');
	$("#dialogErrorCGF").parent().css('scroll','hidden');
	
	
	$("#ui-id-2").text($("#inf0"+informe).text());
	
	//$(".ui-icon-closethick").css('background-position', '-32px -192px');
	//$(".ui-icon-closethick").css('background-color', '#F2F2F2');
	
	$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
	//ui-dialog-titlebar-close 
	//ui-corner-all
	return false;
	
}


function printResumenCompl(){
	
	//var imagen = document.getElementById("logo").innerHTML;
	var printContentsEnc = document.getElementById("formComplemento").innerHTML;
	var printContents = printContentsEnc;
	 
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	
	if (confirm("¿Imprimir página?"))
	{
		$("#pdf").css({ display: "none"});
		// $('#detalle').css({ width: "1743px"});		
		// document.getElementById('detalle').style.overflow="hidden";
		window.print();
	}
	document.body.innerHTML = originalContents;
	
}


function cierraComplementos(){
	
	$('#fadeComp').remove();
	$('#formComplemento').remove();
}


function verComplementosEnviados(ejercicio, informe, nombreInf, nomEjer,correccion){
	
	console.log("verComplementosEnviados");
	
	
	var usuario=$('#txtEntidad').text()+' - '+$('#txtUsuario').text();
	var capitulo=$('#txtEntidad2').text()+' - '+$('#txtUsuario2').text();
	
	//$('#txtUsuario').text();
	
	$('body').append('<div id="fadeComp" class="overlay" ></div>'+
			 '<div id="formComplemento" class="contenedorEnvio modal" style="left:10%; width:1000px; overflow-y: scroll;">'+
			 '  	<div id="userLog" style="clear: both; font: bold 12px sans-serif; margin-bottom: 10px;">'+usuario+'</div>'+
			 '  	<div id="userLog2" style="clear: both; font: bold 12px sans-serif; margin-bottom: 10px;">'+capitulo+'</div>'+

			 '		<div style="clear: both; font: bold 14px sans-serif;" >INFORMES DE CORRECCI&Oacute;N</div>'+
//			 '		<div id="nombreInforme" style="clear: both; font: bold 14px sans-serif;" ></div>'+
			 '<table id="tblComplemento" style="font:bold 12px arial;width:100%;">'+
			 '<thead style="background-color:#0066b8;color:#fff;"><tr>'+
			 '<th style="width:60px;padding:5px; display:none;">idFileU</th>'+
			 '<th style="width:60px;padding:5px; display:none;">ejercicioNombre</th>'+
			 '<th style="width:60px;padding:5px; display:none;">periodoEjercicioId</th>'+
			 '<th style="width:60px;padding:5px; display:none;">ejercicioId</th>'+
			 '<th style="width:60px;padding:5px; display:none;">informeId</th>'+
			 '<th style="width:60px;padding:5px; display:none;">tipoInformeId</th>'+
			 '<th style="width:60px;padding:5px; display:none;">entidadId</th>'+
			 '<th style="width:60px;padding:5px;">Periodo</th>'+
			 '<th style="width:120px;padding:5px;">Usuario</th>'+
			 '<th style="width:50px;padding:5px;">Fecha</th>'+
			 
			 '<th style="width:90px;padding:5px;">Estado</th>'+
			 '<th style="width:55px;padding:5px;">Informe</th>'+
			 '<th style="width:80px;padding:5px;">Reporte de Validaci&oacuten</th>'+
			 '<th style="width:80px;padding:5px; display:none;">Reporte de Cuadratura</th>'+
			 '<th style="width:60px;padding:5px;">Certificado de Env&iacute;o</th>'+
			 '<th style="width:60px;padding:5px;">Respaldo</th>'+
			 '<th style="width:200px;padding:5px;">Comentario</th>'+
			 '</tr></thead><tbody></tbody></table>'+

			 '<div style="margin: 20px 0; padding:0 auto;float:right" >'+
			 '	<button value="validar_Informe" onclick="printResumenCompl();" style="cursor:pointer;margin:0 15px;float:left;" class="boton" type="button" id="Btn_imprimirCorr">'+ 
			 '		</img>Imprimir</button>'+
//			 '	<button  id="Btn_PdfCorr" value="validar_Informe" style="cursor:pointer;margin:0 15px;float:left;" class="boton" type="button">'+ 
//			 '		Guardar</button>'+
			 '	<button value="cierra_VtnCorrec" onclick="cierraComplementos()" style="cursor:pointer;margin:0;float:left;" class="boton" type="button" id="btn_cerrarVtnCorr">'+ 
			 '		Cerrar</button>'+
			 '</div>'+
			 '</div>');
	
	var ent="";
	/**
	if ($("#cbComuna").length > 0){
		ent=$("#cbComuna option:selected").val();
	}else{
		ent=0;
	}
	*/
	
	$('#Btn_PdfCorr').click({ejr:ejercicio,inf:informe,ent:ent,ninf:nombreInf,nejr:nomEjer },function(e){	getPDFResumenCorreccion(e);	});
	$('#fadeComp').show();
	$('#formComplemento').show();
	$('#nombreInforme').text(nombreInf + " - EJERCICIO " + nomEjer);
	
	//$('#userLogComplemento').text(nombreInf + " - EJERCICIO " + nomEjer);
	
	
	//var action='getCorrecionesEjer.action?ejercicioId='+ejercicio+'&informe='+informe+'&entidad='+ent; 
	
	$('body').css('cursor', 'wait');
	
	$.ajax({
		url:'getCorrecionesEjer.action',
		type:'POST',
		dataType:'json',
		data:{ejercicioId:ejercicio,informe:informe,entidad:ent},
		error: function(XMLHttpRequest, textStatus, errorThrown){},
	    success: function(data){
	    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Ver Complementos", function(r){if(r){$(location).attr('href',url='home.action');}} );break;
		    	case -1:jAlert(data.mensaje, "Ver Complementos", function(r){if(r){$(location).attr('href',url='login');}} );break;
		    	
	    	}
	    
	    	if(data.listaCorrecciones.length>0){
	    		$('#contComplementos').append('<div id="contDetalleComplementos" class="contDetalleComplementos"></div>');
	    	}
	    	
	    	$.each(data.listaCorrecciones, function(i, item) {
	    		var row;
	    		var clase='';
	    		if(i%2==0){clase='rwdetInfPar';}else{clase='rwdetInfImp';}
	    		row='<tr id="rw_Compl'+i+'" class="'+clase+'" style="display: table-row;font:10px arial;">';
	    		
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.archivoId+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.ejercicioNombre+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.periodo+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.ejercicioId+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.informeId+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.tipoInformeId+'</td>';
	    		row=row+'<td style="width:70px;padding:5px; display:none;">'+item.entidadId+'</td>';
	    		row=row+'<td style="width:70px;padding:5px;">'+item.periodoNombre+'</td>';
	    		row=row+'<td style="width:120px;padding:5px;">'+item.usuario+'</td>';
	    		row=row+'<td style="width:50px;padding:5px;">'+item.fecha+'</td>';
	    		row=row+'<td style="width:90px;padding:5px;">'+item.estadoDescripcion+'</td>';
	    		if(item.archivoId!=0){
		    		row=row+'<td style="width:80px;padding:5px;"><a style="text-decoration: underline;" id="showInforme'+i+'">Ver Informeszzz</a></td>';
		    		row=row+'<td style="width:100px;padding:5px;"><a style="text-decoration: underline;" id="showReporte'+i+'">Ver Validacion</a></td>';
		    		row=row+'<td style="width:100px;padding:5px; display:none;"><a id="showCuadratura'+i+'">Ver Cuadratura</a></td>';
		    		
		    		if (item.certificado>0){ row=row+'<td style="padding:5px;"><a style="text-decoration: underline;" id="showCertificado'+i+'">Ver Certificado</a></td>';}
		    		else{row=row+'<td></td>';}
	    		}else{
	    			row=row+'<td></td><td></td><td></td><td></td>';
	    		}
	    		
	    		if(item.urlFile !== null && item.urlFile !== undefined){
	    			row=row+'<td style="cursor:pointer;padding:5px;"><a style="text-decoration: underline;" id="showRespaldo'+i+'">Ver Respaldo</a></td>';
	    		}else{
	    			row=row+'<td></td>';
	    		}
	    		
	    		row=row+'<td style="width:200px;padding:5px;">'+item.comentario+'</td>';
	    		row=row+'</tr>';
	    		$('#tblComplemento tbody').append(row);
	    		
	    		if(item.urlFile !== null && item.urlFile !== undefined){
	    			$('#showRespaldo'+i).click({corr:item.correccionId },function(e){
		    			document.location.href='descargaArchivoRespaldo.action?idFileUp='+item.archivoId;
		    		});
	    		}
	    		
	    		if(item.archivoId!=0){
//		    		var parametros=item.corrInfId+',"'+ item.informe +'",'+item.informeId+','+nomEjer+','+item.corrInfId;
	    			var parametros=item.archivoId+','+item.periodo+','+item.tipoInformeId+','+item.ejercicioNombre+','+item.informeId+','+item.entidadId+','+item.ejercicioId;
		    		console.log(parametros+" cristianParametros");
//		    		var parametros2=item.correccionId+',"'+ item.informe +'",'+item.informeId+','+nomEjer+','+item.correccionId;
		    		
		    		$('#showInforme'+i).attr('onclick','muestraInformeCorreccion('+parametros+')');
		    		$('#showInforme'+i).css({'cursor':'pointer'});
		    		$('#showReporte'+i).attr('onclick','muestraValidacionCorreccion('+parametros+')');
		    		$('#showReporte'+i).css({'cursor':'pointer'});
		    		if (item.certificado>0){$('#showCertificado'+i).attr('onclick','muestraCertificadoCorreccion('+item.certificado+')');$('#showCertificado'+i).css({'cursor':'pointer'});}
		    		
		    		$('#showCuadratura'+i).css({'cursor':'pointer'});
		    		
		    		$('#Btn_PdfCorr').click({ejr:ejercicio,inf:informe,ent:ent,ninf:nombreInf,nejr:nomEjer },function(e){	getPDFResumenCorreccion(e);	});
		    		$('#showCuadratura'+i).click({ejr:ejercicio,inf:informe,ent:ent,ninf:nombreInf,nejr:nomEjer,per:item.periodoId, tpInf:item.correccionId },function (e){showReportCuadrCompl(e);});
	    		}
            });
	    	$('body').css('cursor', 'default');
	    }
	});
	
}


function showReportCuadrCompl(event){
	
	$("body").css("cursor", "wait");

	$.ajax({url: 'repCuadratura',
		type: "POST",
		dataType: "html",
		//async: true,
		 data:{	ejrId: 		event.data.ejr,
			 	informe: 	event.data.inf,
			 	entidad:	event.data.ent,
			 	periodo: 	event.data.tpInf,
			 	tpInforme:	2
		},beforeSend: function (xhr){
			 $('body').append('<div id="fadeWaitRCComp" class="overlay" style="display:block"></div>'+
			 '<div id="waitWaitRCComp" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+
			 ' <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
			 ' <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
			 '</div>');
		},complete: function (data) {
			$('#fadeWaitRCComp').remove();
			$('#waitWaitRCComp').remove();
			
			
			$('#fade').show();
			$('#popup1').show();
			$("body").css("cursor", "default");
		},success: function(data){
			$('body').append('<div id="fade" class="overlay" ></div>'+
					 '<div id="popup1" class = "contenedorEnvioArchivo modalCarga" style="display: block;position:absolute;height:600px;z-index:2005;padding:15px !important">'+ 
					 '    <div id="cerrar" style="float:rigth;">'+
					 '		 <img src="/SICOGEN2_PUB/resources/img/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="cierraReporteCuadratura()"></img>'+
					 '	  </div>'+
					 '	  <div id ="popRepCuadr" style="width:1075px;height:580px;border:0px none;float:left;"></div>'+
					 '</div>');
			
			$('#popRepCuadr').html(data);
			$("body").css("cursor", "default");
			$('#fade').show();
			$('#popup1').show();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			$("body").css("cursor", "default");
		}
	});
	
}


function getPDFResumenCorreccion(event){
	
	location.href='downPDFResumenCorreccion.action?ejr='+event.data.ejr+'&inf='+event.data.inf+
		'&ent='+event.data.ent+'&ninf='+event.data.ninf+'&nejr='+event.data.nejr;
}


function getState(state){
	
	var estado='';	
	switch(state){
		case '3' :	estado="Informe con error bloqueante cargado ";break;
		case '4' :	estado="Validado en CGR ";break;
		case '5' :	estado="Validado con observaciones en CGR ";break;
		case '6' :	estado="Enviado a CGR ";break;
		case '7' :	estado="Enviado con observaciones a CGR ";break;
		case '8' :	estado="Validado sin movimiento en CGR ";break;
		case '10':	estado="Enviado sin movimiento a CGR ";break;
	}	
	return estado;
}


function cierraReporteCuadratura(){
	
	$('#fade').remove();
	$('#fadeRC').remove();
	$('#popup1').remove();
}

function loadPeriodoRefresh(){
	
	console.log('loadPeriodoRefresh() - cbEjercicio: '+$("#cbEjercicio option:selected").val());
	
	$.ajax({
		url: 'getStateInfAnualUsers.action',
		type: "POST",
		dataType:"json",
		data: { tipoInfId: $("#listaTipoInformes option:selected").val(), 
				ejercicioId: $("#cbEjercicio option:selected").val()},
	    success: function(data){
	    	switch(data.estado){
	    	case -2:jAlert(data.mensaje, "Seguimiento de Informe", function(r){if(r){$(location).attr('href',url='homeMun.action?abreCarga=0');}} );break;
	    	case -1:jAlert(data.mensaje, "Seguimiento de Informe", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	actualizarGrillaInformes(data, $("#cbEjercicio option:selected").val() );
	    }
	});
	
 }

 function openDialog(idArchivo,
					 codigoInforme,
					 nombreInforme,
					 idEstado,
					 usuario,
					 fecha,
					 idCert,
					 idInforme,
					 idPeriodo,
					 idEjercicio) {
	 var splitFecha = fecha.split(" ");
	 var mensajeErrore = '';
	 $("#links-informe").dialog("option", "title", codigoInforme + " " + nombreInforme);

	 switch (idEstado) {
		 case 3:
			 $("#links-informe .desc-informe").text("Informe con error(es) bloqueante(s) cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 4:
			 $("#links-informe .desc-informe").text("Informe validado cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 5:
			 $("#links-informe .desc-informe").text("Informe validado con observación cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 6:
			 $("#links-informe .desc-informe").text("Informe procesado cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 7:
			 $("#links-informe .desc-informe").text("Informe procesado con observación cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 8:
			 $("#links-informe .desc-informe").text("Informe sin movimiento cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
		 case 10:
			 $("#links-informe .desc-informe").text("Informe procesado sin movimiento cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
			 break;
	 }

	 if (idEstado == 3) {
		 $("#links-informe .desc-informe").text("Informe con error(es) bloqueante(s) cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1]);
		 mensajeErrore = "Informe con error(es) bloqueante(s) cargado por " + usuario + " el día " + splitFecha[0] + " a las " + splitFecha[1];
	 }

	 $("#links-informe .num-envio").text("N° Envío: " + idCert);
	 $("#links-informe .link-ver-informe").attr("href","listadogeneral/verInformeIC?idFileUp=" + idArchivo);
	 $("#links-informe .link-reporte-val").attr("href","validacion/obtenerValidacionIC?idFileUp=" + idArchivo);
	 $("#links-informe .link-ver-reporteCuadraturas").attr("onclick","verReporteCuadraturas(" + idArchivo + ", " + idInforme + ", " + idPeriodo + ", " + idEjercicio + ");");
     $("#links-informe .link-descarga-archivo").attr("href","listadogeneral/descargaDoc?idArchivo=" + idArchivo);
     $("#links-informe .link-cert-env").attr("onclick","verCertEnvio(" + idCert + ");");
	 $("#links-informe .link-ver-bitacora").attr("onclick","popUpBitacora(" + idArchivo + ");");
	 $("#links-informe .link-resumen-errore").attr("onclick","loadResumenErroresIC(" + idArchivo + ", '" + mensajeErrore + "');");

     if (idEstado === 6 || idEstado === 7 || idEstado === 4 || idEstado === 5) {
         $('#link-rep-cuad').hide();
         $('#link-res-err').hide();

         if (idEstado === 6 || idEstado === 7) {
			 $('#link-cert-env').show();
			 $('#divNumEnvio').show();
		 } else {
			 $('#link-cert-env').hide();
			 $('#divNumEnvio').hide();
		 }
     } else {
         $('#link-cert-env').hide();
         $('#divNumEnvio').hide();
         $('#link-rep-cuad').show();
         $('#link-res-err').show();
     }

	 $("#links-informe").dialog("open");
 }

 function busquedaListado(ejercicio, tipoInforme, rutaImagenes, entidadId) {

    var periodosHeader = '';
    var bodyInformes = '';
    var printCelda = false;
    var imagenEstado;

	$.ajax({
		type : "GET",
		url : "listadogeneral/list?ejercicioId=" + ejercicio + "&tipoInforme=" + tipoInforme + "&entidadId=" + entidadId,
		dataType : "json",
		success : function (data) {
			data.periodosEjercicio.forEach(function (value, index, array) {
                periodosHeader = periodosHeader +
                                 '<td width="5%" background="' + rutaImagenes + 'fondo1.jpg" class="periodo-header">' +
                                    '<div align="center"><span class="Estilo11"><b>' + value.periodoAbrev + '</b></span></div>' +
                                 '</td>';

            });

            data.informes.forEach(function (informe, index, array) {
                bodyInformes = bodyInformes + '<tr class="fila-informe ' + informe.rowClass + '">' +
'                                                  <td style="text-align: center;">' + informe.informeNombre + '</td>';
                data.periodosEjercicio.forEach(function (periodo, index, array) {
                    data.estados.forEach(function (archivo, index, array) {
                        if (periodo.periodoCodigo == archivo.periodoCodigo) {

							switch (archivo.archivoEstadoId) {
								case 3:
									imagenEstado = 'publish_x.png';
									break;
								case 4:
									imagenEstado = 'Validado.png';
									break;
								case 5:
									imagenEstado = 'ValidadoOBS.png';
									break;
								case 6:
									imagenEstado = 'Procesado.png';
									break;
								case 7:
									imagenEstado = 'ProcesadoOBS.png';
									break;
								case 8:
									imagenEstado = 'NotMov.png';
									break;
								case 10:
									imagenEstado = 'NotMovProc.png';
									break;
								case -1:
									imagenEstado = 'refresh.png';
									break;
								case 1:
									imagenEstado = 'NotMovProc.png';
									break;
							}

                            bodyInformes = bodyInformes + '<td style="text-align: center;"><a href="javascript:void(0)"><img src="' + rutaImagenes + imagenEstado + '" title="Reporte de Validación.." onclick="openDialog(' + archivo.archivoId + ', \'' + informe.informeCodigo + '\', \'' + informe.informeNombre + '\', ' + archivo.archivoEstadoId + ', \'' + archivo.archivoUsuario + '\', \'' + archivo.archivoFecha + '\', ' + archivo.certificadoId + ')"/></a></td>';
                            printCelda = true;
                        }
                    });

                    if (printCelda == false) {
                        bodyInformes = bodyInformes + '<td></td>';
                    }

                    printCelda = false;
                });

                bodyInformes = bodyInformes + '<td></td></tr>';
            });

           // console.log(bodyInformes);
            $(".fila-informe").remove();
            $(".periodo-header").remove();
            $(".table-body-informes").append(bodyInformes);
			$(periodosHeader).insertAfter(".informes-header");
            $("#loading-spinner").removeClass("is-active");
		}
	});
 }

function verReporteCuadraturas(idFile, informe, periodo, ejercicio) {
	window.parent.CargarReporteDeCuadratura("#diaResumenCuadratura", idFile, informe, periodo, ejercicio );
}

function CargarReporteDeCuadratura(contenedorCapa, idFile, informe, periodo, ejercicio){
	var $dataDiv,$dataCont;

	$dataDiv=$(contenedorCapa).dialog({title:'Reporte de Cuadraturas - Informe Contable'}).dialog("open");
	$(contenedorCapa).parent().css('width','1000px');
	$(contenedorCapa).parent().css('height','650px');
	$(contenedorCapa).parent().css('zIndex','8888');
	$(contenedorCapa).parent().css('position','absolute');
	$(contenedorCapa).parent().css('left','15%');
	$(contenedorCapa).parent().css('top','13%');
	$(contenedorCapa).parent().css('scroll','hidden');
	$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
	$dataCont=$("#contResumenCuadratura",contenedorCapa);

	$('#divResumenError').html('');

	$('#fadeChangeTab').show();
	$('#popEspera').show();
	$("#ui-datepicker-div").remove();

	$.ajax({
		url: './listadogeneral/reporteCuadratura?fileUploadID='+idFile+"&reporteID="+0+"&periodoID="+periodo+"&ejercicioID="+ejercicio+"&informeID="+informe,
		type: "POST",
		dataType:"html",
		async: true
		,error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			stop();
			$("#loading-spinner").removeClass("is-active");
			$(contenedorCapa).dialog({}).dialog("close");

			$.confirm({
				title: 'Reporte de Cuadraturas',
				content: 'No existen registros para mostrar',
				type: 'blue',
				typeAnimated: true,
				buttons: {
					tryAgain:{
						text:'Aceptar',
						btnClass: 'btn-blue',
						action: function () {
						}
					},

				}
			});
		}
		,success: function(data) {
			$("#loading-spinner").removeClass("is-active");
			$dataCont.html(data);
			$("#repCuadratura").html("");
		}
	});


	$dataCont=$("#contResumenCuadratura",$dataDiv);

}

function verCertEnvio(certId) {
    window.open('./listadogeneral/certificadoEnvio?certificado=' + certId);
}

function popUpBitacora(idFileUpload){


	mostrarDiv("divColFechaEnvio");
	ocultarDiv("divColFechaTramitacion");

	$('#contBitacora').html('');

	$.ajax({
		url:'./listadogeneral/getBitacoras?idFileUpload=' + idFileUpload,
		type: "POST",
		dataType:"json",
		async: false,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log('popUpBitacora - error');
			$("#dialogBitacora").dialog({}).dialog("close");

			$.confirm({
				title: 'Bitácora Informe',
				content: 'No existen registros para mostrar',
				type: 'blue',
				typeAnimated: true,
				buttons: {
					tryAgain:{
						text:'Aceptar',
						btnClass: 'btn-blue',
						action: function () {
						}
					},

				}
			});
		},
		success: function(data){
			console.log("popUpBitacora - success");
			var fila='';


			var fechaBit;

			$.each(data, function(i, item){

				if($("#divColFechaTramitacion"	,"#dialogBitacora").css('display')!='none'){
					fechaBit=item.fechaTramitacion;

				}else if( $("#divColFechaEnvio"		,"#dialogBitacora").css('display')!='none'){
					fechaBit=item.certificado;
				}

				if(i%2==0){
					fila='';
					fila= '<div class="rwdetInfImp">'+
						'<div style="width:99px" class="detalleInfColError">'+item.estado+'</div>'+
						'<div style="width:99px"  class="detalleInfColErrorFinal">'+item.usuario +'</div>'+
						'<div style="width:189px;text-align:center"  class="detalleInfColError">'+item.fechaEnvio+'</div>'+
						'<div style="width:99px" class="detalleInfColErrorFinal">'+fechaBit +'</div>'+
						'</div>';
					$('#contBitacora').append(fila);
				}else{
					fila='';
					fila ='<div class="rwdetInfPar">'+
						'<div style="width:99px" class="detalleInfColError">'+item.estado+'</div>'+
						'<div style="width:99px"  class="detalleInfColErrorFinal">'+item.usuario +'</div>'+
						'<div style="width:189px;text-align:center"  class="detalleInfColError">'+item.fechaEnvio+'</div>'+
						'<div style="width:99px" class="detalleInfColErrorFinal">'+fechaBit +'</div>'+
						'</div>';
					$('#contBitacora').append(fila);
				}
			});


			$("#contBitacora").show();

			$("#dialogBitacora").dialog({
				maxWidth:680,
				maxHeight: 400,
				width:680,
				height:400,
				title: 'Bitácora'
			});

			$("#dialogBitacora").parent().css('zIndex','8887');
			$("#dialogBitacora").parent().css('position','absolute');
			$("#dialogBitacora").parent().css('width','680px');
			$("#dialogBitacora").parent().css('left','25%');
			$("#dialogBitacora").parent().css('top','8%');
			$("#dialogBitacora").parent().css('scroll','hidden');
			$("#dialogBitacora").css('overflow','hidden');
			$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');

		}
	});

	return true;
}

function mostrarDiv(div){

	document.getElementById(div).style.display = "block";
	document.getElementById(div).style.visibility = "visible";

}

function ocultarDiv(div){

	document.getElementById(div).style.display = "none";
	document.getElementById(div).style.visibility = "hidden";
}

function loadResumenErroresIC(idFileUpload, mensajeErrores)
{
	$('#divResumenError').html('');

	$.ajax({
		url: './listadogeneral/getResumenErrores?idFileUpload='+idFileUpload,
		type: "POST",
		dataType:"json",
		async: false
		,error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			console.log('error');
			$("#dialogErrorCGF").dialog({}).dialog("close");

			$.confirm({
				title: 'Resumen errores',
				content: 'No existen registros para mostrar',
				type: 'blue',
				typeAnimated: true,
				buttons: {
					tryAgain:{
						text:'Aceptar',
						btnClass: 'btn-blue',
						action: function () {
						}
					},

				}
			});
		}
		,success: function(data) {

			$('#divResumenError').text("");
			$('#divResumenError').empty();
			$('#inforErrores').html(mensajeErrores);
			console.log("1");
			var fila='';
			$.each(data, function(i, item) {


				if(i%2==0){
					fila='';
					fila= '<div class="rwdetInfImp">'+
						'<div class="detalleInfColError">'+item.tipoError+'</div>'+
						'<div class="detalleInfColErrorFinal">'+item.mensajeError +'</div>'+
						'</div>';
					$('#divResumenError').append(fila);
				}else{
					fila='';
					fila ='<div class="rwdetInfPar">'+
						'<div class="detalleInfColError" id="inf02_Dic">'+item.tipoError+'</div>'+
						'<div class="detalleInfColErrorFinal">'+item.mensajeError+' </div>'+
						'</div>';
					$('#divResumenError').append(fila);
				}
			});

			$("#dialogErrorCGF").dialog({
				width:760
			});

			$("#dialogErrorCGF").parent().css('left','25%');
			$("#dialogErrorCGF").parent().css('top','10%');
			$("#dialogErrorCGF").parent().css('scroll','hidden');
			$("#dialogErrorCGF").css('overflow','hidden');
			$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
		}
	});
}