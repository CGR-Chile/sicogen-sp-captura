var general=0;
var per_general=0;
var intervalo;
var intervaloCarga;
var ventana=1;

function validaInfPendientesPopup()
{ 
	//loadEstadosInformeAnual($("#cbEjercicio option:selected").val(), $("#cbTipoInformes option:selected").val());
	var ejercicio = $("#cbEjercicio option:selected").val();
	var tipoInforme = $("#cbTipoInformesPopup option:selected").val();
	
	if ($.isNumeric(ejercicio)==false){ejercicio=0;}
	
	var action = 'getStateInfAnualUsers.action?ejercicioId=' + ejercicio+'&tipoInformeId='+tipoInforme; 
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function (data) {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				//Session ha caducado
				$(".cuerpo").html("<html><head><link href='css/error/errorPageStyles.css' rel='stylesheet' media='all'><link href='css/error/bootstrap.min.css' rel='stylesheet' type='text/css'><link href='css/error/brain-theme.css' rel='stylesheet' type='text/css'><link href='css/error/errorPageStyles.css' rel='stylesheet' type='text/css'><link href='css/error/cuprum.css' rel='stylesheet' type='text/css'><link href='css/mensaje/jquery.alerts.css' rel='stylesheet' type='text/css' ></link></head><body><div class='page-content'><div class='page-title'><h5><i class='fa fa-warning'></i>Información</h5><div class='btn-group'><a href='#' class='btn btn-link btn-lg btn-icon dropdown-toggle' data-toggle='dropdown'><i class='fa fa-cogs'></i><span class='caret'></span></a><ul class='dropdown-menu dropdown-menu-right'><li><a href='#'>Action</a></li></ul></div></div><div class='error-wrapper text-center'><h2>El tiempo de sesión ha caducado</h2></div></div></body></html>");				
		    },
		    success: function(data){
		    	console.log("estados de informes anual : "+data);
		    	actualizarGrillaInformesJSON(data, $("#cbEjercicio option:selected").val() );
		    }
		});
	
	
//	var tipoInforme = $("#cbTipoInformesPopup option:selected").val();
//	var ejercicio = $("#cbEjercicio option:selected").val();
//	var pPeriodo = 0;
//	var tipoArchivo = -1;
//	
//	console.log(tipoInforme);
//	console.log(ejercicio);
//	console.log("tipoArchivo:" + tipoArchivo);
//
//	var estado=0;
//	clearInterval(intervalo);
//	clearInterval(intervaloCarga);
//	
//	$.ajax({
//		url:'getValidandoseAnual.action?periodo='+pPeriodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tipoArchivo, 
//		type: "GET", 
//		dataType:'json',
//		async: false,
//		cache: false,
//		success: function(data)
//		{
//			var popUpInf="";
//			
//			if(data.informesValidandose.informesEstados.length>0){
//				for (var i=0;i<data.informesValidandose.informesEstados.length;i++)
//				{
//					$('.pi'+data.informesValidandose.informesEstados[i].periodoInforme).attr('src',data.informesValidandose.informesEstados[i].imgValid);
//				}
//			}
//			if(data.informesValidandose.informesPendientes.length>0){
//				for (var i=0;i<data.informesValidandose.informesPendientes.length;i++){
//					
//					$('.pi'+data.informesValidandose.informesPendientes[i].periodoInforme).attr('src','images/loader.gif');
//				}
//				jAlert('En este momento se encuentran Informes en proceso de validaci&oacute;n.');
//				
//				estado=1;
//				general=1;
//				$('#formEnvio').hide();
//			}else{
//				cierraPopUpPendientes();
//			}
//			
//		},
//		error: function(XMLHttpRequest, textStatus, errorThrown){console.log('error');}
//	});
//	return estado;	
	
}

function validaInfPendientesPpal(pPeriodo, ejercicio, tipoArchivo)
{
 
	var tipoInforme = $("#cbTipoInformes option:selected").val();
	var ejercicio = $("#cbEjercicio option:selected").val();
 
	console.log('validaInfPendientesPpal');
	console.log(tipoInforme);
	console.log(ejercicio);
	console.log("tipoArchivo: " + tipoArchivo);
	console.log("pPeriodo: " + pPeriodo);
	
	var estado=0;
	clearInterval(intervalo);
	clearInterval(intervaloCarga);
	
	$.ajax({
		url:'getValidandoseAnual.action?periodo='+pPeriodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tipoArchivo, 
		type: "GET", 
		dataType:'json',
		async: false,
		cache: false,
		success: function(data)
		{
			var popUpInf="";
			
			if(data.informesValidandose.informesEstados.length>0){
				for (var i=0;i<data.informesValidandose.informesEstados.length;i++)
				{
					$('.pi'+data.informesValidandose.informesEstados[i].periodoInforme).attr('src',data.informesValidandose.informesEstados[i].imgValid);
				}
			}
			if(data.informesValidandose.informesPendientes.length>0){
				for (var i=0;i<data.informesValidandose.informesPendientes.length;i++){
					
					$('.pi'+data.informesValidandose.informesPendientes[i].periodoInforme).attr('src','images/loader.gif');
				}
				jAlert('En este momento se encuentran Informes en proceso de validaci&oacute;n.');
				
				estado=1;
				general=1;
				$('#formEnvio').hide();
			}else{
				cierraPopUpPendientes();
			}
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){console.log('error');}
	});
	return estado;	
}
function validaInfPendientes(pPeriodo,ejercicio,tipoArchivo){
	console.log('validaInfPendientes');
	var estado=0;
	clearInterval(intervalo);
	clearInterval(intervaloCarga);
	//url:'getValidandose.action?periodo='+pPeriodo,
	$.ajax({
		url:'getValidandoseAnual.action?periodo='+pPeriodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tipoArchivo,
		type: "GET", 
		dataType:'json',
		async: false,
		cache: false,
		success: function(data){
			var popUpInf="";
			
			if(data.informesValidandose.informesEstados.length>0){//Informes Validados o procesados
				for (var i=0;i<data.informesValidandose.informesEstados.length;i++){
					var infId=data.informesValidandose.informesEstados[i].informeId;
					console.log('Accion:'+ data.informesValidandose.informesEstados[i].informeAccion);
					
					$('#inf0'+infId+'_respCarga').attr('src',data.informesValidandose.informesEstados[i].imgCarga);
					$('#inf0'+infId+'_validCarga').attr('src',data.informesValidandose.informesEstados[i].imgValid);
					$('#inf0'+infId+'_Reportvalid').attr('src',data.informesValidandose.informesEstados[i].imgRV);
					$('#inf0'+infId+'_Reportvalid').attr('onclick',data.informesValidandose.informesEstados[i].informeAccion);
					$('#inf0'+infId+'_Reportvalid').css({'cursor':'pointer'});
					$('#inf0'+infId+'_cel06').text(data.informesValidandose.informesEstados[i].informeMensaje);
					$('#inf0'+infId+'_State').text(data.informesValidandose.informesEstados[i].informeEstadoId);
				}
			}
			if(data.informesValidandose.informesPendientes.length>0){
				for (var i=0;i<data.informesValidandose.informesPendientes.length;i++){
					if($("#cbPeriodos").attr('disabled')!==undefined || data.informesValidandose.informesPendientes[i].informePeriodo!==$("#cbPeriodos option:selected").val()){
						return;
					}
					
					var infId=data.informesValidandose.informesPendientes[i].informeId;
					$('#inf0'+infId+'_respCarga').attr('src','images/blanco.png');
					$('#inf0'+infId+'_validCarga').attr('src','images/loader.gif');
					$('#inf0'+infId+'_Reportvalid').attr('src','images/blanco.png');
					$('#inf0'+infId+'_Reportvalid').attr('onclick','').unbind('click').css({'cursor':'default'});
					$('#inf0'+infId+'_Reportvalid').css({'cursor':'default'});
					$('#inf0'+infId+'_cel06').text('');
				}
				jAlert('En este momento se encuentran Informes en proceso de validaci&oacute;n.');
				estado=1;
			}else{
				cierraPopUpPendientes();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){console.log('error');}
	});
	return estado;	
}

function reconsultaPendientes(periodo, ejercicio,tipoArchivo){
	var pend=0;
	$.ajax({url:'getValidandose.action?periodo='+periodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tipoArchivo,
		type: "GET", 
		dataType:'json',
		async: true,
		cache: false,
		success: function(data){
			popUp='';
			if(data.listaInformeValidandose.length > 0){
				for (var i=0;i<data.listaInformeValidandose.length;i++){
					infId=data.listaInformeValidandose[i].informeId;
					if(data.listaInformeValidandose[i].infEstadoFlujo == 2){
						$('#inf0'+infId+'_validCarga').attr('src','images/loader.gif');
						$('#inf0'+infId+'_Reportvalid').attr('src','images/blanco.png');
						$('#inf0'+infId+'_Reportvalid').attr('onclick','').unbind('click').css({'cursor':'default'});
						$('#inf0'+infId+'_cel06').html('');
					}else{
						$('#inf0'+infId+'_respCarga').attr('src',data.listaInformeValidandose[i].imgCarga);
						$('#inf0'+infId+'_validCarga').attr('src',data.listaInformeValidandose[i].imgValid);
						$('#inf0'+infId+'_Reportvalid').attr('src',data.listaInformeValidandose[i].imgRV);
						$('#inf0'+infId+'_Reportvalid').attr('onclick',data.listaInformeValidandose[i].informeAccion);
						$('#inf0'+infId+'_Reportvalid').css({'cursor':'pointer'});
						$('#inf0'+infId+'_cel06').attr('src',data.listaInformeValidandose[i].informeMensaje);
					}
				}
				if (data.estado!=99){
					clearInterval(intervalo);
					clearInterval(intervaloCarga);
				}
					
			}
		}
	});
}
function reconsultaPendientesAnual(periodo, ejercicio,tipoArchivo){
	var pend=0;
	$.ajax({url:'getValidandose.action?periodo='+periodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tipoArchivo,
		type: "GET", 
		dataType:'json',
		async: true,
		cache: false,
		success: function(data){
			popUp='';
			if(data.informesValidandose.informesEstados.length>0){
				for (var i=0;i<data.informesValidandose.informesEstados.length;i++){
					$('.pi'+data.informesValidandose.informesPendientes[i].periodoInforme).attr('src',data.informesValidandose.informesPendientes[i].imgValid);
				}
			}
			if(data.informesValidandose.informesPendientes.length>0){
				for (var i=0;i<data.informesValidandose.informesPendientes.length;i++){
					$('.pi'+data.informesValidandose.informesPendientes[i].periodoInforme).attr('src','images/loader.gif');
				}
			}else{
				 loadPeriodoRefresh();
				clearInterval(intervalo);
				clearInterval(intervaloCarga);

			}
		}
	});
}
function reconsultaPendByPerd(periodo,ejercicio,tpFile){
	console.log('reconsultaPendByPerd');
	var pend=0;
	console.log('reconsultaPendByPerd linea 156 ValidacionesPendientes.js');
	$.ajax({
		url:'getValidandoseAnual.action?periodo='+periodo+'&ejercicio='+ejercicio+'&tipoArchivo='+tpFile,
		//url:'getValidandoseAnual.action',
		type: "POST", 
		dataType:'json',
		//data:{	periodo:periodo,ejercicio:ejercicio,tipoArchivo:tpFile},
		async: true,
		cache: false,
		success: function(data){
			var isValid = (typeof (data) != "undefined"
				&& typeof (data.informesValidandose) != "undefined"
				&& typeof (data.informesValidandose.informesEstados[i]) != "undefined")?(true):(false);			
			if(data.informesValidandose.informesEstados.length>0){//Informes Validados o procesados
				for (var i=0;i<data.informesValidandose.informesEstados.length;i++){
					var infId=data.informesValidandose.informesEstados[i].informeId;
					console.log('Accion:'+ data.informesValidandose.informesEstados[i].informeAccion);
					
					$('#inf0'+infId+'_respCarga').attr('src',data.informesValidandose.informesEstados[i].imgCarga);
					$('#inf0'+infId+'_validCarga').attr('src',data.informesValidandose.informesEstados[i].imgValid);
					$('#inf0'+infId+'_Reportvalid').attr('src',data.informesValidandose.informesEstados[i].imgRV);
					$('#inf0'+infId+'_Reportvalid').attr('onclick',data.informesValidandose.informesEstados[i].informeAccion);
					$('#inf0'+infId+'_Reportvalid').css({'cursor':'pointer'});
					$('#inf0'+infId+'_cel06').text(data.informesValidandose.informesEstados[i].informeMensaje);
					$('#inf0'+infId+'_State').text(data.informesValidandose.informesEstados[i].informeEstadoId);
				}
			}
			if(data.informesValidandose.informesPendientes.length>0){
				for (var i=0;i<data.informesValidandose.informesPendientes.length;i++){
					//console.log(data.informesValidandose.informesEstados[i] !== undefined);
					if(isValid){
						if($("#cbPeriodos").attr('disabled')!== data.informesValidandose.informesEstados[i] && data.informesValidandose.informesEstados[i].informeAccion == $("#cbPeriodos option:selected").val()){
						var infId=data.informesValidandose.informesPendientes[i].informeId;
						$('#inf0'+infId+'_respCarga').attr('src','images/blanco.png');
						$('#inf0'+infId+'_validCarga').attr('src','images/loader.gif');
						$('#inf0'+infId+'_Reportvalid').attr('src','images/blanco.png');
						$('#inf0'+infId+'_Reportvalid').attr('onclick','').unbind('click').css({'cursor':'default'});
						$('#inf0'+infId+'_Reportvalid').css({'cursor':'default'});
						$('#inf0'+infId+'_cel06').text('');
						
						}
					}
				}
				//jAlert('En este momento se encuentran Informes en proceso de validaci&oacute;n.');
				estado=1;
			}else{
				cierraPopUpPendientes();
			}
		}
	});
}
function cierraPopUpPendientes(){
	
	//jAlert('termina la actualizacion automatica del estado los informes ');
	
	clearInterval(intervalo);
	clearInterval(intervaloCarga);
	
	$('.validandoseAlert').remove();
	general=0;	
	$('.overlayCarga').hide();
	$('.overlay').hide();
}