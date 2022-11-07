function selCorreccion(action){
	$.ajax({url: action,
	    type: "POST",
	    dataType: "html",
	    contentType: "text/html;charset=windows-1252",
	    beforeSend : function(xhr) {
            xhr.setRequestHeader('Accept', "text/html; charset=windows-1252");
        },
	    error: function(data){	},
	    success: function(data){
	    	$('#contFrame').remove();
	    	$('#contCorrecciones').append('<div id="contFrame" style="clear:both;width: 930px;height:400px;"></div>');
	    	
	    	$('#contFrame').html(data);
	    }
	});
}
function saveReversarPeriodos(){
	var flag = true;
	aTitulo='Reversar';
	aRegion='Debe seleccionar Regi&oacute;n';
	aComuna='Debe seleccionar Comuna';
	aInforme='Debe seleccionar al menos un informe.';
	aEjercicio1='Debe seleccionar ejercicio para el informe '+$('#cbinformePre1 option:selected').text();
	aPeriodo='Debe seleccionar per&iacute;odo para el informe '+$('#cbinformePre1 option:selected').text();
	aEjercicio2='Debe seleccionar ejercicio para el informe '+$('#cbinformePre2 option:selected').text();
	aPeriodo2='Debe seleccionar per&iacute;odo para el informe '+$('#cbinformePre2 option:selected').text();
	aCometario='Debe agregar comentario';
	aSeguro='    &iquest;Est&aacute; seguro que desea reversar?       ';
 	
	console.log("saveReversarPeriodos..");
	
 	if($("#cbRegion option:selected").val()=="-1"){
		jAlert(aRegion,aTitulo);
		return;
	}
	if($("#cbComuna option:selected").val()=="-1"){
		jAlert(aComuna,aTitulo);
		return;
	}
	if($("#cbinformePre1 option:selected").val()== -1 && $("#cbinformePre2 option:selected").val()==-1){
		jAlert(aInforme,aTitulo);
		return;
	}
	if($("#cbinformePre1 option:selected").val()!= -1){
	  if( $("#cbEjercicioAno1 option:selected").val() == -1){
		  jAlert(aEjercicio,aTitulo);
		  return;
	  	}	
	  if( $("#cbPeriodos1 option:selected").val() == -1){
		  jAlert(aPeriodo,aTitulo);
		  return;
	  	}	
	}
	if($("#cbinformePre2 option:selected").val()!= -1)
	{
	  if( $("#cbEjercicioAno2 option:selected").val() == -1){
		  jAlert(aEjercicio2,aTitulo);
		  return;
	  	}	
	  else if( $("#cbPeriodos2 option:selected").val() == -1){
		  jAlert(aPeriodo2,aTitulo);
		  return;
	  	}	
	}
	if($("#txtAreaComentarios").val().length== 0)
	{
		jAlert(aCometario, aTitulo);
		return;
	}
	var region = $("#cbRegion option:selected").val();
	var comuna = $("#cbComuna option:selected").val();	
    var informe = $("#cbtipoInforme option:selected").val();
    
    var mensaje = $("#txtAreaComentarios").val();
    var informePre1 = $("#cbinformePre1 option:selected").val();
    var ejercicioAno1 = $("#cbEjercicioAno1 option:selected").val();
    var periodos1 = $("#cbPeriodos1 option:selected").val();
    var informePre2 = $("#cbinformePre2 option:selected").val();
    var ejercicioAno2 = $("#cbEjercicioAno2 option:selected").val();
    var periodos2 = $("#cbPeriodos2 option:selected").val();
    var fileName = $("#fileUploadHidden").val();
    console.log("***** FILE name:"+fileName);
	
	var action= "reversarInformes.action";

	 if(flag){
	 
	action= action+"?region=" + region + "&comuna=" + comuna + "&informe=" + informe 
	+ "&informePre1="+informePre1 + "&ejercicioAno1="+ejercicioAno1 + "&periodos1="+periodos1
	+ "&informePre2="+informePre2 + "&ejercicioAno2="+ejercicioAno2 + "&periodos2="+periodos2
	+ "&fileName="+fileName+"&comentario="+mensaje;

	jConfirm(aSeguro, aTitulo, function(r) {
		if(r){
			if($('#fileUpload').val() == ''){
				console.log('con archivo');
				$.ajax({
					 url: action,
						type: "POST",
						dataType: "json",
						error: function(XMLHttpRequest, textStatus, errorThrown){
							
						},
						success: function(data){
					       jAlert(data.respuestaPl,'Reversar');
					       console.log("OK.");
						}
				});
			}else{
				console.log('con archivo');
				$.ajaxSetup({ scriptCharset: "windows-1252",contentType:"application/json;charset=windows-1252"});
				$("#formReversa").ajaxSubmit({
					cache : false,
					type: "POST",
					url: action,
					scriptCharset: 'windows-1252',
					contentType: "application/x-www-form-urlencoded;charset=windows-1252",
					jsonpCallback: 'jsonpCallback',
					data: $(this).serialize(),
					dataType:'json',
					complete:function( XMLHttpRequest ) {
						$("body").css("cursor", "default");
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						jAlert('Error ' + textStatus);
					},
					success: function(data){
						if(data.error==-1){
							jAlert(data.respuestaPl, aTitulo, function(r){if(r){$(location).attr('href',url='login');return false;}} );
						}else{
							jAlert(data.respuestaPl, aTitulo);
							if (data.error>0){
								limpia();
							}
						}
					}
				});
			}
		}
	});
	 }
}
function cargasubtipoInforme2(selectId,value){
	console.log("getSubtipoInforme");
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
function limpia(){
	$('#cbRegion').val(0);
	$('#cbComuna').empty();
	$('#cbComuna').get(0).options[$('#cbComuna').get(0).options.length] = new Option( 'Selec. Comuna',-1);
	$('#cbComuna').attr('disabled','disabled');
	
	$('#cbinformePre1').val(0);
	$('#cbEjercicioAno1').val(0);
	$('#cbPeriodos1').val(0);
	$('#cbPeriodos1').attr('disabled','disabled');
	
	$('#cbinformePre2').val(0);
	$('#cbEjercicioAno2').val(0);
	$('#cbPeriodos2').val(0);
	$('#cbPeriodos2').attr('disabled','disabled');
	
	$('#txtAreaComentarios').val('');
	$('#fileUpload').val('');
}