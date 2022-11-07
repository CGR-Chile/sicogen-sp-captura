function cargaSinMov(objeto){	
	var message = '';
	titulo = 'Informe Sin Movimiento';
	var estado = $(objeto).attr('src');
	//console.log("2 estado:" + estado);
	//console.log("objeto: "+$(objeto).attr('id'));
	
	var infId = $(objeto).attr('id').substr(3,2);
	//console.log('test: ' +$('#inf'+infId+'_State').text());
	if( ($('#inf'+infId+'_State').text()=='6') || ($('#inf'+infId+'_State').text()=='7') || ($('#inf'+infId+'_State').text()=='10') ){
		jAlert('El informe sin movimiento ya esta procesado', "Sin Movimiento");
		return false;
	}
	if($('#inf'+infId+'_State').text()=='-1'){
		jAlert('No se puede asignar un informe sin movimiento para este periodo', "Sin Movimiento");
		return false;
	}
	var tipoInforme=1;
	var periodo=-1;
	if($("#cbPeriodos").attr('disabled') == 'disabled'){ tipoInforme=2; periodo = $("#cbComplPeriodos option:selected").val();
	}else{ tipoInforme=1; periodo = $("#cbPeriodos option:selected").val(); }
	
	if (periodo < 0){
		jAlert('Debe seleccionar un periodo valido para el informe', "Carga Archivos");
		$("body").css("cursor", "default");
		return false;
	}
	if($(objeto).attr('src').substr(13,3)=='on.')
    {
		//console.log('Informe:'+infId );
		//console.log('Estado html:'+$('#inf' + infId + '_State').html() );
		//console.log('Estado text:'+$('#inf' + infId + '_State').text() );
		if($('#inf' + infId + '_State').text()=="0"){
			message = '¿Está seguro que desea agregar un informe sin movimiento?  ';
		}else{
			message = '¿Está seguro que desea reemplazar el informe?  ';
		}
		jConfirm(message, titulo, function(r) {
			if(r) {
				document.getElementById('fade').style.display='block';
				document.getElementById('formEnvio').style.display='block';
				$('#estadoForm').text('');
				var action = 'enviaSinMovimiento.action?periodo='+periodo+'&inf='+infId+'&tipoInforme='+tipoInforme;
				$.ajax({url: action,
				    type: "POST",
				    dataType: "json",
				    error: function(XMLHttpRequest, textStatus, errorThrown){
						$("body").css("cursor", "default");
						//console.log('b');
						document.getElementById('fade').style.display='none';
						document.getElementById('formEnvio').style.display='none';
				    },
				    success: function(data){
				    	actualizaSinMovimiento(data, infId,periodo);
				    	
				    	$("body").css("cursor", "default");
				    	document.getElementById('fade').style.display='none';
						document.getElementById('formEnvio').style.display='none';
				    }
				});
			} 
		});
    }
	else{
		message = '¿Esta seguro que desea borrar la seleccion sin movimiento, seleccionada anteriormente?';
		jConfirm(message, titulo, function(r){
		    if(r) {
				document.getElementById('fade').style.display='block';
				document.getElementById('formEnvio').style.display='block';
				$('#estadoForm').text('');
		    	var action = 'anulaSinMovimiento.action?periodo='+periodo+'&inf='+infId+'&tipoInforme='+tipoInforme;
				$.ajax({url: action,
				    type: "POST",
				    dataType: "json",
				    error: function(XMLHttpRequest, textStatus, errorThrown){
						$("body").css("cursor", "default");
						document.getElementById('fade').style.display='none';
						document.getElementById('formEnvio').style.display='none';
				    },
				    success: function(data){
				    	$("body").css("cursor", "default");
						document.getElementById('fade').style.display='none';
						document.getElementById('formEnvio').style.display='none';
				    }				    
				});
				borraSinMovimiento(infId);
		    }
		});
		
	}
}
function actualizaSinMovimiento(respuesta, idInf,periodo){
	if(respuesta.infpr.informeEstadoId==99){
		var validandoseAlert = 'Sr. Usuario, actualmente hay informes en proceso de validacion';
		var listaInformeValidandoseHTML = '<ul>';	
		//console.log(respuesta.listaInformeValidandose.length);
		for (var i=0;i<respuesta.listaInformeValidandose.length;i++){
			//console.log(respuesta.listaInformeValidandose.informeEstado);
			var estado='';
			if(respuesta.listaInformeValidandose[i].informeEstado == 2){
				estado = '<img id="estado_'+(i+1)+'" src="images/loader.gif" style="width:15px;height:15px;" />';
			}else{
				estado = '<img id="estado_'+(i+1)+'" src="images/ok.jpg" style="width:15px;height:15px;" />';
			}
			
			listaInformeValidandoseHTML = listaInformeValidandoseHTML +'<li>' + estado + ' ' + respuesta.listaInformeValidandose[i].informeNombre + '</li>';
		}
		listaInformeValidandoseHTML = listaInformeValidandoseHTML + '</ul>';
		//console.log(listaInformeValidandoseHTML);
				
		$('#validandoseAlert #textoCargando').css('text-align','left');
		$('#validandoseAlert #textoCargando').html(validandoseAlert+'<br>'+listaInformeValidandoseHTML);
		$('#fade').show();
		$('#validandoseAlert').show();
		
		//bloquear elementos y botones
		for(var i=0; i< 9; i++){
			$('#fileUpload0'+(i+1)).attr('disabled','disabled');
		}
		$('#cbTipoInformes').attr('disabled','disabled');
		$('#cbEjercicio').attr('disabled','disabled');
		$('#cbPeriodos').attr('disabled','disabled');
		//console.log('Bloqueando botones...');		
	}else{
		document.getElementById('formEnvio').style.display='none';
		$("body").css("cursor", "default");
		if ((respuesta.estado==-1)||(respuesta.estado==-2)) { if (respuesta.estado==-1){ url='login';}else{ url='showFormCarga.action?abreCarga=0';} jAlert(respuesta.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url);}} ); }
		document.getElementById('fade').style.display='none';
		
		switch(respuesta.estado){
			case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
			case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
			case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
		}
		//console.log(idInf);
		$('#inf'+idInf+'_filename').val(' ');
		$('#inf'+idInf+'_respCarga').attr( 'src', respuesta.infpr.informeEstado );	
		$('#inf'+idInf+'_State').text(respuesta.infpr.informeEstadoId);
		$('#inf'+idInf+'_smov').attr( 'src','images/check_sel.png');

		$('#inf'+idInf+'_validCarga').attr( 'src', respuesta.infpr.imgNotMov);
		$('#inf'+idInf+'_Reportvalid').attr( 'src', respuesta.infpr.informePeriodoCod );
		$('#inf'+idInf+'_Reportvalid').attr( 'onclick', respuesta.infpr.informeAccion );
		
		
		var texto=respuesta.infpr.informeMensaje;
		console.log(texto);
		texto= texto.split("correcto|").join("");
		texto= texto.split("Correcto|").join("");
		texto= texto.split("|Correcto").join("");
		texto= texto.split("correcto |").join("");
		texto= texto.split("Correcto |").join("");
		var errores=texto.split('|');
		
		var mensaje='';
		$.each( errores, function( i, value ) {
			if (jQuery.trim(value.toUpperCase())!='CORRECTO'){
				if (i%2 == 0){ 
					mensaje=mensaje+'<div class="errorPar">'+value+'</div>'; 
				}else{
					mensaje=mensaje+'<div class="errorImpar">'+value+'</div>'; 
				}
			}
		});
		
		//console.log("Errores: "+mensaje);
		
		$('#inf'+idInf+'_cel12').html( mensaje ); 
		//console.log("#inf"+idInf+"_cel12"+mensaje);
		
		var fila='';
		
		if(parseInt(respuesta.infpr.informeEstadoId)==8){
			fila='<div id="inf'+idInf+'_mensajes">Validado Sin movimiento</div>';
		}else{
			fila='<div id="inf'+idInf+'_mensajes">Errores en la carga</div>';
			/*
			if (parseInt(respuesta.infpr.informeEstadoId)==8){
				fila='<div id="inf'+idInf+'_mensajes">'+respuesta.infpr.informeMensaje+'</div>';
			}else{
				fila='<div id="inf'+idInf+'_mensajes">Errores en la carga</div>';
			}*/
		}
		$('#inf'+idInf+'_cel06').html('');
		$('#inf'+idInf+'_cel06').append(fila);
		
		if((respuesta.infpr.informeEstadoId==3)||(respuesta.infpr.informeEstadoId==2)){
			$('#inf'+idInf+'_mensajes').attr('onclick','verErroresCarga('+idInf+')');	
			$('#inf'+idInf+'_mensajes').css('cursor','pointer');
		}
	}
	
}