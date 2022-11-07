$(document).ready(function(){
	$('#btnCancelar').click(function (){
		jConfirm('&iquest;Est&aacute; seguro que desea cancelar la correcci&oacute;n?', 'Cancelar', function(r) {
			if(r){
				$(':checkbox').each(function() {
					$(this).attr("data-type", "uncheck");
				});
				$('#txtAreaComentarios').val('');
				$('#dateDesde').val('');
				$('#dateHasta').val('');
				$('#formID').get(0).reset();
			}
		});
	});
	
	
});
function selCorreccion(action){
	$('#cbFuncionRealizar').val(action);
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "html",
	    contentType: "text/html;charset=windows-1252"
	    ,beforeSend: function (xhr){
	    	xhr.setRequestHeader('Accept', "text/html; charset=windows-1252");
	    	$('body').append('<div id="fadeFunEspecial" class="overlay" style="display:block"></div>'+
					'<div id="waitFunEspecial" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando '+$("#cbFuncionRealizar option:selected").text()+'</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeFunEspecial').remove();
			$('#waitFunEspecial').remove();
		},error: function(data){	
			
		},success: function(data){
	    	$('#contFrame').remove();
	    	$('#contCorrecciones').append('<div id="contFrame" style="clear:both;width: 930px;height:400px;"></div>');
	    	
	    	$('#contFrame').html(data);
	    }
	});
}
function cancelar(){
	$('#cbEjercicioAnoCorrec').val(-1);
}
function cargaAdministracion(opc){
	$('body').append('<div id="fadeChangeTab" class="overlay" style="display:block"></div>'+
			 '<div id="popEspera" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
			 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
			 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
			 '</div>');
	
	$('body').css('cursor','wait');
	$('#fadeChangeTab').show();
	$('#popEspera').show();
	
	$("#ui-datepicker-div").remove();
	var action='';
	if (opc==0){
		$('#administracion').html('');
		$('<iframe>', {src: 'inicioCGR',id:'CgrHome',frameborder: 0,scrolling: 'no', style:'width:990px'}).appendTo('#administracion');
		
		$('li').each(function(i, itm) {
			if (i!=opc){
				$('#'+itm.id).removeClass('TabbedPanelsTabSelected');
			}else{
				$('#'+itm.id).addClass('TabbedPanelsTabSelected');
			}
	    });
		
		$('body').css('cursor','default');
		$('#fadeChangeTab').remove();
		$('#popEspera').remove();
		return;
	}
	switch(opc){
		case -1:action='inicioCGR';break;
		case 1:action='segimiento';break;
		case 2:action='reportes'; break;
		case 3:	action='funcionesEspeciales'; break;
		case 4:action='administracion'; break;
		//default: action='inicioCGR';break;
	}
	$.ajax( {url: action,type: "POST",dataType: "html",cache: false,async:true,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('Error ' + textStatus);
			alert(errorThrown);
			alert(XMLHttpRequest.responseText);
		},
		success: function(data,textStatus, request){
			$('#administracion').html(data);
			var id=opc;
			$('li').each(function(i, itm) {
				if (i!=id){
					$('#'+itm.id).removeClass('TabbedPanelsTabSelected');
				}else{
					$('#'+itm.id).addClass('TabbedPanelsTabSelected');
				}
		    });
			$('body').css('cursor','default');
			$('#fadeChangeTab').remove();
			$('#popEspera').remove();
		}
	});
}
function seleccionado(form){
	console.log('funcionesEspeciales.js :seleccionado() realizaReglasCarga');
   var action = 'uploadFileRespaldo.action';	
	//$.ajaxSetup({ scriptCharset: "windows-1252" , contentType: "application/json; charset=windows-1252"});
	
	$("#" + form).ajaxSubmit({
		cache : false,
		type: "POST",
		url: action,
		//scriptCharset: 'windows-1252',
		//contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		jsonpCallback: 'jsonpCallback',
		data: $(this).serialize(),
		dataType:'json',
		sizeLimit: (15000 * 1024),
		complete:function( XMLHttpRequest ) {
			$("body").css("cursor", "default");
		},		
		success: function(data){
			$('#fileUploadHidden').val(data.fileUploadName);
			$("body").css("cursor", "default");
		},
		onError: function (a) {
			console.log('ERROR');
			console.log(a);
			
        }
	 });	
	}

function cargasubtipoInforme(selectId,cbtipoInforme){
	$.ajax({
		url: 'getSubtipoInforme.action',
		type: "POST",
		dataType: "json",
		data:{
			tipoInforme:cbtipoInforme
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeLoadTipoInf" class="overlay" style="display:block"></div>'+
					'<div id="waitTipoInf" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Periodos</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeLoadTipoInf').remove();
			$('#waitTipoInf').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);

		},success: function(data){
			$('#'+selectId).removeAttr('disabled');
			$('#'+selectId).empty();
			$("#"+selectId).get(0).options[$("#"+selectId).get(0).options.length] = new Option( 'Selec. Informe',-1);
			$.each(data.listaSubtipoInformes, function(i, item) {			                	
				$("#"+selectId).get(0).options[$("#"+selectId).get(0).options.length] = new Option(item.nombre, item.subTipoID);
			});	
		}
	});
}

function cargasubtipoInforme2(selectId,value){
	$.ajax({
		url: 'getSubtipoInforme.action',
	    type: "POST",
	    dataType: "json",
	    data:{
	    	tipoInforme:1
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeLoadTipoInf" class="overlay" style="display:block"></div>'+
					'<div id="waitTipoInf" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Periodos</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeLoadTipoInf').remove();
			$('#waitTipoInf').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
	    	console.log('Error ' + textStatus);
	    	console.log(errorThrown);
	    	console.log(XMLHttpRequest.responseText);
	    },success: function(data){
	    	$('#'+selectId).removeAttr('disabled');
	    	$('#'+selectId).empty();
	    	$("#"+selectId).get(0).options[$("#"+selectId).get(0).options.length] = new Option( 'Selec. Informe',-1);
            $.each(data.listaSubtipoInformes, function(i, item) {	
            	if(value != item.subTipoID){
                $("#"+selectId).get(0).options[$("#"+selectId).get(0).options.length] = new Option(item.nombre, item.subTipoID);
            	}
                
            });	
	    }
	});
}

function selFuncionRealizar(opcion){
	$('#cbFuncionRealizar').html('');
	
		if(opcion=='municipal' || opcion=='publico'){

			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'-1')
		       .text('Elija una opción'));
			   
			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'reversar')
		       .text('Reversar Períodos'));
			   
			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'correcciones')
		       .text('Ver/Deshabilitar Corrección'));
			   
			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'complemento')
		       .text('Habilitar Corrección'));
		}
		else if(opcion=='empresasPublicas' || opcion=='universidadesEstado'){

			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'-1')
		       .text('Elija una opción'));
			   
			   $('#cbFuncionRealizar')
		       .append($("<option></option>")
		       .attr("value",'reemplazarInformes')
		       .text('Reemplazar Informes'));
		}
}