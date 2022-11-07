var erroresDesplegados='';

$(document).ready(function() {
	
	erroresDesplegados=$('#dialogReglaCarga').clone();
	
	/*for (var i=0;i<8;i++){
		$('#fileUpload0'+(i+1)).click(function(){
			if($("#cbPeriodos").attr('disabled') == 'disabled'){ tipoInforme = 2; periodo = $("#cbComplPeriodos option:selected").val(); }
			else{  tipoInforme = 1; periodo = $("#cbPeriodos option:selected").val(); }
			
			var estado=validaInfPendientes(periodo);
			if (estado==1){
				intervalo=setInterval(function(){reconsultaPendientes();},5000);
				return false;
			}
		});
	}*/
});


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

function cierraValidandoseAlert(){
	
	$('#validandoseAlert').hide();
	$('#fade').hide();
	$("body").css("cursor", "default");
	console.log('Cerrando');
}


function cierraCargaPopup(){
	
	$('#formEnvio').hide();
	$('#fade').hide();
	$("body").css("cursor", "default");
	console.log('Cerrando');
}


function validaCarga(objeto, id){
	
	titulo="Carga de Informe";
	message = ' \u00BFEst\u00E1 seguro que desea reemplazar el informe sin movimiento?  ';
	
	if($('#inf0' + id + '_State').text()=="8"){
		jConfirm(message, titulo, function(r) {
			if(r==false) {
				return false;
			}else{
				$(objeto).parent().each( function (i, el){	$( this ).find('#fileUpload').click();	});
			}
		});
	}else{
		$(objeto).parent().each( function (i, el){	$( this ).find('#fileUpload').click();	});
	}
	
}


function realizaReglasCarga(idForm, idInforme ){

	//jalert("realizaReglasCarga !!!");
			
	var idTipInf = $("#cbTipoInformes").val();
	//var idPeriodo = $('#cbPeriodos option:selected').attr('id');
	var idPeriodo = $('#cbPeriodos option:selected').val();
	var ejercicio = $("#cbEjercicio option:selected").text();
	//var ejercicio = $('#cbEjercicio option:selected').val();
	var codPeriodo = $('#cbPeriodos option:selected').attr('data-cod');
	var codInforme = $('#inf0'+idInforme+'_cel01').attr('cod-inf');
	
	console.log("Carga Archivo - realizaReglasCarga - idTipInf: "+idTipInf+" idPeriodo: "+idPeriodo+" ejercicio: "+ejercicio+" codPeriodo: "+codPeriodo+" codInforme: "+codInforme);
	
	var action = 'uploadFile.action?inf='+idInforme+'&periodo='+idPeriodo+'&tipoArchivo='+idTipInf+'&ejercicio='+ejercicio+'&codPeriodo='+codPeriodo+'&codInforme='+codInforme;

	$("#idForm"+idForm).ajaxSubmit({
		cache : false,
		type: "POST",
		url: action,
		scriptCharset: 'windows-1252',
		contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		jsonpCallback: 'jsonpCallback',
		data: $(this).serialize(),
		dataType:'html',
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeCargaXML" class="overlay" style="display:block"></div>'+
				 '<div id="waitCargaXML" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando archivo</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},
		complete:function( XMLHttpRequest ) {
			console.log("realizaReglasCarga: complete");
			$("body").css("cursor", "default");
			
			$('#waitCargaXML').remove();
			$('#fadeCargaXML').remove();
		},
		success: function(data){
			console.log("realizaReglasCarga: success");

			$('#tblUpInformes').html(data);
			$("body").css("cursor", "default");
		},
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
            
         }
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


function actualizaObjetosPorCarga(respuesta, idInf,periodo){
	
	console.log("Estado Carga: "+respuesta.estado);
	if(respuesta.informeProceso.informeEstadoId==99){
		var listInfVal="<ul id='liPendientes' style='margin:15px;list-style:none;'>";
		for (var i=0;i<respuesta.listaInformeValidandose.length;i++){
			console.log(respuesta.listaInformeValidandose.informeEstado);
			var estado='';
			if(respuesta.listaInformeValidandose[i].informeEstadoId== 2){
				estado = '<img id="estado_'+(i+1)+'" src="images/loader.gif" style="width:15px;height:15px;" />';
			}else{
				estado = '<img id="estado_'+(i+1)+'" src="images/ok.jpg" style="width:15px;height:15px;" />';
			}
			listInfVal=listInfVal+'<li>'+estado+' '+respuesta.listaInformeValidandose[i].informeNombre + '</li>';
		}
		popUpCarga= "<div class='validandoseAlert contenedorEnvioArchivo modalCarga'" +
		"style='font:normal 12px arial,sans-serif;width:450px;height:auto;left:35%;position:absolute;display:block;'>"+
		"<div id='cargando' style='text-align: center;margin:0 0 20px 0;'><img class='icoImage75' src='images/cargando2.gif'></div>"+
		"<div id='infPendiente' style='text-align: left;'>Sr. Usuario los siguientes informes est&aacuten en proceso de validaci&oacuten</div>";

		popUpCarga=popUpCarga+listInfVal;
		popUpCarga=popUpCarga+"</ul>";
		popUpCarga=popUpCarga+"<p style='text-align:center;'>Este proceso puede tardar varios minutos, favor vuelva a consultar el resultado de la validacion posteriormente </p>";
		popUpCarga=popUpCarga+"<p style='text-align:center;margin:20px 0 0 0;font:normal 10px arial,sans-serif;'>Esta ventana se cerrar&aacute automaticamente en 90 segundos </p> ";
		popUpCarga=popUpCarga+"<button title='Cerrar' class='boton' style='margin:10px 0 0 0;' onclick='cierraPopUpPendientes()' id='btn_pendiente'>Cerrar</button> ";

		$('#fade').show();
		$('.validandoseAlert').remove();
		$('body').append(popUpCarga);
		$('#validandoseAlert').show();
		
		//bloquear elementos y botones
		for(var i=0; i< 9; i++){
			$('#fileUpload0'+(i+1)).attr('disabled','disabled');
		}
		$('#cbTipoInformes').attr('disabled','disabled');
		$('#cbEjercicio').attr('disabled','disabled');
		$('#cbPeriodos').attr('disabled','disabled');
		console.log('Bloqueando botones...');		
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
		
		$('#inf0'+idInf+'_filename').val( respuesta.informeProceso.informeArchivo );
		$('#inf0'+idInf+'_respCarga').attr( 'src', respuesta.informeProceso.informeEstado );	
		$('#inf0'+idInf+'_State').text(respuesta.informeProceso.informeEstadoId);
		
		$('#inf0'+idInf+'_smov').attr('src','images/check_on.png');
		
		$('#inf0'+idInf+'_validCarga').attr( 'src', respuesta.informeProceso.informePeriodoCod );
		$('#inf0'+idInf+'_Reportvalid').attr( 'src', respuesta.informeProceso.informePeriodoCod );
		$('#inf0'+idInf+'_Reportvalid').attr( 'onclick', respuesta.informeProceso.informeAccion );
		
		
		var texto=respuesta.informeProceso.informeMensaje;
		texto= texto.split($.trim("correcto|")).join("");
		texto= texto.split($.trim("Correcto|")).join("");
		texto= texto.split($.trim("|Correcto")).join("");
		texto= texto.split($.trim("| Correcto")).join("");
		texto= texto.split($.trim("| correcto")).join("");
		texto= texto.split($.trim("correcto |")).join("");
		texto= texto.split($.trim("Correcto |")).join("");
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
		//$.each( errores, function( i, value ) { if (i%2 == 0){ mensaje=mensaje+'<div class="errorPar">'+value+'</div>'; } else{mensaje=mensaje+'<div class="errorImpar">'+value+'</div>'; } });
		
		console.log("Errores: "+mensaje);
		
		$('#inf0'+idInf+'_cel12').html( mensaje ); 
		console.log("#inf0"+idInf+"_cel12"+mensaje);
		
		var fila='';
		
		if((respuesta.informeProceso.informeEstadoId==1)||(respuesta.informeProceso.informeEstadoId==2)){
			fila='<div id="inf0'+idInf+'_mensajes">Carga Exitosa</div>';
		}else{
			fila='<div id="inf0'+idInf+'_mensajes">Ver errores de carga</div>';
		}
		$('#inf0'+idInf+'_cel06').html('');
		$('#inf0'+idInf+'_cel06').append(fila);
		
		if((respuesta.informeProceso.informeEstadoId==3)||(respuesta.informeProceso.informeEstadoId==2)){
			$('#inf0'+idInf+'_mensajes').attr('onclick','verErroresCarga('+idInf+')');	
			$('#inf0'+idInf+'_mensajes').css('cursor','pointer');
		}
	}
	
}

function cierraErroresCarga(){
	$('#contErroresCarga').css('display','none');
}

function elimnaError(){
	//alert('OK 2');
	$('#visorErrores').remove();
}
