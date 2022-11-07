var dialogEnvioInformes;
var dialogEnvioInformesOK;

$(document).ready(function() {

	dialogEnvioInformes = $( "#dialogEnvioInformes" ).dialog({
		autoOpen: false,
		modal: true,
		with: 1000
	});

	dialogEnvioInformesOK = $( "#dialogEnvioInformesOK" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Cerrar: function() {
				cargaMain();
			}
		},
		close: function( event, ui ) {
			cargaMain();
		}
	});


});


function actualizaObjetosPorValidacionDos(xml){
	
	$('#detInfEnvio1').text('');
	var iNOk=0;
	var mensaje='';
	
	console.log('actualizaObjetosPorValidacionDos');
	console.log(xml);
	
	$.each(xml.salidaEnvioCgr, function(i, item) {
	    clase="";
	    if(item.informeEstado!='3'){
	    	clase="";
			if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp"; }
			row='envInf1_' + item.informeId;
			jQuery('<div/>',{id:row, class:clase }).appendTo('#detInfEnvio1');
			
			jQuery('<div/>',{id:row+'nombreInforme'}).appendTo('#'+row);
			$('#'+row+'nombreInforme').css({width:"505px",float:"left",display:"cell"});
			$('#'+row+'nombreInforme').html( $('#envInf_'+item.informeId+'nombreInforme').html() );
			
			//alert( $('#'+row+'nombreInforme').text() );
			
			jQuery('<div/>', { id: row + 'glsPeriodo', text:item.informePeriodoCod }).appendTo('#'+row);
			$('#'+row+'glsPeriodo').css({width:"80px",float:"left",display:"cell"});
			
			jQuery('<div/>',{ id: row+'glsEjercicio', text:item.informePeriodoCod }).appendTo('#'+row);
			$('#'+row+'glsEjercicio').css({width:"65px",float:"left",display:"cell"});
			
			jQuery('<div/>', { id: row + 'nota', text: item.informeMensaje }).appendTo('#'+row);
			$('#'+row+'nota').css({width:"250px",float:"left",display:"cell"});
			
	    }else{
	    	if (iNOk==0){ mensaje='<div id="erroresEnvio"><div id="TituloErrorEnvio"></div>'; }
	    	mensaje=mensaje+'<div id="errorTitulo">'+ $('#inf0'+ item.informeId).text()+'</div>';
			mensaje=mensaje+'<div id="errorMensaje">'+item.informeMensaje+'</div>';
			iNOk=iNOk+1;
	    }
	});
	if (iNOk>0){
		
		var $dialog = $('<div></div>')
    	.dialog({height: 250,width: 600,zIndex:1005,
    		id: "erroresSelEnvio",
    		title: 'Errores en seleccion de envio',
    		close: function(event, ui){	$(this).remove();}});
		//$dialog.css({'zIndex': 1005});
		$dialog.dialog('open');
		$dialog.html(mensaje);
		
		return;
	}else{
		$("body").css("cursor","default"); $('#fadeComp').css({ display:"block"});informes ='';enviaCertificado();
	}
}
$(document).ready(function() {
	$('#btnValidaInformes_A').click(function(){		
		var estado=enviaInformes();
		if (estado==1){
			return false;
		}
	});	
});



var listaejercicio  = new Array();
var imprime  = new Array();
var informes = '';

function eliminaFormErrores(){ $('#erroresEnvio').remove(); }
function actualizaObjetosPorValidacion(xml){
	console.dirxml(xml);
	$('#detInfEnvioError').text("");
	$('#detInfEnvio').text("");
	var iOk=0;
	var iNOk=0;
	
	$.each(xml.salidaEnvioCgr, function(i, item) {
	    console.log(this);
	    
	    clase="";
	    if(item.informeEstado!='3'){
	    	console.log('ok Estado: ');
	    	if ((iOk+1) %2 == 0){ clase= "rwdetInfPar"; }else{clase= "rwdetInfImp"; }
    	    iOk=iOk+1;
    	    console.log('infOk'+iOk);
    	    		
    	    row='envInf_' + item.informeId;
	
    	    jQuery('<div/>', { id: row, class: clase }).appendTo('#detInfEnvio');		
    	    jQuery('<div/>', { id: row}).appendTo('#'+row);
    	    jQuery('<div/>', { id: row + '_chk' }).appendTo('#'+row);
	
    	    $('#' + row + '_chk').css({ width: "30px", float: "left"});				
    	    $('#' + row + '_chk').append(
			$(document.createElement('input')).attr({  
				id: 'chk_'+row ,value: 'chk_' + row,
				name: item.informeId+"/"+item.informeNombre+"/"+item.informeEstado+"/"+item.informePeriodoCod+"/"+item.informePeriodo+"/"+
				item.informeEjercicioCod+"/"+item.informeEjercicio+"/"+item.informeTipo+"/"+ item.informeMensaje+"/",
				type:  'checkbox'}));
	    }else{
	    	if ((iOk+1) %2 == 0){ clase= "rwdetInfPar"; }else{clase= "rwdetInfImp"; }
	    	iNOk=iNOk+1;
	    	row='envInf_' + $(this).find("idInforme").text();
			jQuery('<div/>', {id: row, class: clase }).appendTo('#detInfEnvioError');
	    }
		jQuery('<div/>', { id:row+'nombreInforme', text: item.informeNombre }).appendTo('#'+row);
		$('#'+row+'nombreInforme').css({width: "480px", float: "left", display: "cell"});
		
		jQuery('<div/>', { id:row+'glsPeriodo', text: item.informePeriodo }).appendTo('#'+row);
		$('#'+row+'glsPeriodo').css({width: "80px", float: "left", display: "cell"});
		
		jQuery('<div/>', { id:row+'glsEjercicio', text: item.informeEjercicioCod }).appendTo('#'+row);
		$('#'+row+'glsEjercicio').css({width: "85px", float: "left", display: "cell"});
		
		jQuery('<div/>', { id:row+'nota', text: item.informeMensaje }).appendTo('#'+row);
		if ( $.browser.mozilla == true && $.browser.version < '3.0' ) {
			console.log("mozilla");
			$('#'+row+'nota').css({width: "245px", float: "left", display: "cell"});
		  }
		else{
			console.log("Other browser");
			$('#'+row+'nota').css({width: "145px", float: "left", display: "cell"});
		}
	});
	if (iOk!=0){$('#notInformForSend').css({ display: "none"}); $('#Btn_enviar').removeAttr("disabled");}
	if (iNOk!=0){$('#fila_no_detalle_error').css({ display: "none"});}
	
	console.log('infOk: '+iOk);
	if(iOk==0){
		$('#notInformForSend').css({display: "block"});
		
		$('#Btn_enviar').attr('disabled','disabled');
	}else{
		$('#Btn_enviar').removeAttr("disabled");
	}
	
	if(iNOk==0){
		jQuery('<div/>', {
		    id: 'fila_no_detalle_error',				    
			class: 'rowEnvInfImp'
		}).appendTo('#detInfEnvioError');
		$('#fila_no_detalle_error').text("No Hay Informes Con errores");
	}
}
function actualizaObjetosPorValidacionCertifica(xml){
	console.log('carga informes');
	console.log(xml);
	$('#detInfEnvioPdf').text('');
	$('.detInfEnvioPdf').text('');
	
	$('#detInfEnvioPdf').html('');
	$('.detInfEnvioPdf').html('');
	var iOk=0;
	var iNOk=0;
	$.each(xml.salidaEnvioCgr, function(i, item){
		console.log('Nombre: '+item.informeNombre);
		console.log('Periodo: '+item.informePeriodo);
		console.log('Ejercicio: '+item.informeEjercicioCod);
		console.log('Ejercicio2: '+item.informeEjercicio);
		console.log('Nota: '+item.msg);
		
		$('#fechaPreEnv').text(xml.fecha);
		if(item.informeEstado!='3'){
			var clase="";
			if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp"; }			
			var row='envInf_' + item.informeId;

			jQuery('<div/>', { id: row, Class: clase+' '+row }).appendTo('.detInfEnvioPdf');			
			jQuery('<div/>', { id: row + 'nombreInforme', Class:row + 'nombreInforme' }).appendTo('.' + row);
			$('.'+row+'nombreInforme').text($('#envio_'+item.informeId).text());
			$('.'+row+'nombreInforme').css({width: "405px", float: "left", display: "cell"});
			
			
			jQuery('<div/>', { id: row + 'glsPeriodo', Class:row + 'glsPeriodo', text: item.informePeriodoCod }).appendTo('.'+row);			
			$('.' + row + 'glsPeriodo').css({width: "80px", float: "left" , display: "cell"});
			
			jQuery('<div/>', { id: row + 'glsEjercicio', Class:row + 'glsEjercicio', text: item.informeEjercicioCod }).appendTo('.'+row);
			$('.' + row + 'glsEjercicio').css({width: "65px", float: "left" , display: "cell"});
			
			jQuery('<div/>', { id: row + 'nota', Class:row + 'nota', text: item.informeMensaje }).appendTo('.'+row);
			$('.' + row + 'nota').css({width: "225px", float: "left" , display: "cell"});
			if ( $.browser.mozilla == true && $.browser.version < '3.0' ) {
				console.log("mozilla");
				$('.' + row + 'nota').css({width: "350px", float: "left", display: "cell" });
			  }
			else{console.log("other Browser");
				
				$('.' + row + 'nota').css({width: "300px", float: "left", display: "cell" });
			}
		}else{
			if (iNOk==0){ 
				mensaje='<div id="erroresEnvio"><div id="TituloErrorEnvio"></div>'; 
			}
	    	mensaje=mensaje+'<div id="errorTitulo">'+ $('#inf0'+ item.informeId).text()+'</div>';
			mensaje=mensaje+'<div id="errorMensaje">'+item.informeMensaje+'</div>';
			iNOk=iNOk+1;
		}
	});
	
	console.log('infOk: '+iOk);
	console.log('iNOk: '+iNOk);
	if(iNOk>0){
		var $dialog = $('<div></div>')
    	.dialog({height: 250,width: 600,zIndex:10090,
    		id: "erroresSelEnvio",
    		title: 'Errores en seleccion de envio',
    		close: function(event, ui){	$(this).remove();}});
		//$dialog.css({'zIndex': 1005});
		$dialog.dialog('open');
		$dialog.html(mensaje);
		
	}else{
		$('#formEnvio').hide();
		$('#formEnvio1').hide();
		$('#formEnvio2').show();
		
	}
}


function enviaInformesDos(){
	var infSends = [];
	
	$("#tblEnvInformes input:checked").each(
		function(){
			var infs=[];
			if(jQuery(this).is(":checked")){
				infs=$(this).attr('name').split("/");
			}
			infSends.push(infs);
	});

	if (infSends.length > 0) {
		$.post('./informes/showInforSendDos', {infSends: JSON.stringify(infSends)}).done(function (data) {
			$('body').append('<div id="fadeComp"  style="display:block;"></div>');//class="overlay"
			$('body').append(data);

			$('#fadeComp').show();
			$('#fadeLoadSend').show();
			$('#formEnvio2').show();
			$('#formEnvio').hide();
			$('body').css('cursor', 'auto');
		});
	} else {
		dialogAlertEnvInf.html('<p>Debe seleccionar un informe para enviar</p>');
		dialogAlertEnvInf.dialog('open');
		dialogAlertEnvInf.dialog('option', 'width', 320);
	}
}


function enviaInformes(){
	$.post('./informes/showInforSend').done(function (data) {
		dialogEnvioInformes.html(data);
		dialogEnvioInformes.dialog('open');
		dialogEnvioInformes.dialog('option', 'width', '1000');
		dialogEnvioInformes.dialog('option', 'position', 'center');
	});
}


function enviaCertificado(){
	
	informes="";
	var infSends=[];
	$("#detInfEnvio input:checked").each(function(index){
		var infs=[];
		if(jQuery(this).is(":checked")){
			infs=$(this).attr('name').split("/");
		} 
		infSends.push(infs);
	});

	console.log(infSends);
	var action = 'showInforSendInfTres';
	$('body').css('cursor', 'wait');
	
	$.ajax({url: action,
			type:'POST',
			dataType:'html',
			async:false,
			data: {	ejercicio:ejercicio,
					tpInforme: tipoInforme,
					'infSends':JSON.stringify(infSends)},
			success: function(data){
		    	console.log(data);
				
				$("body").css("cursor", "default");
				$('#fadeComp').css({ display: "block"});
				
				$('#formEnvio').hide();
				$('#formEnvio1').hide();
				$('#formEnvio2').hide();  
				$('#fadeComp').show;
				//$('#certificado').show();
				//$('#formEnvio').css({ display: "none"});
				//$('#formEnvio1').css({ display: "none"});
				//$('#formEnvio2').css({ display: "block"});
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	console.log('Error');
		    }
	});
	
	$('body').css('cursor', 'auto');
}


function enviaCertificado1(){
	
	var infSends=[];
	$("#detInfEnvio input:checked").each(function(index){
		var infs=[];
		if(jQuery(this).is(":checked")){infs=$(this).attr('name').split("/");} 
		infSends.push(infs);
	});
	
	console.log(infSends);
	$('#fadeComp').css({ display: "none"});
	$('#formEnvio').css({ display: "none"});
	$('#formEnvio1').css({ display: "none"});
	$('#formEnvio2').css({ display: "none"});
	
	var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=1100px, height=600px,top=0, left=0";
	window.open("enviaInformes?infSends="+JSON.stringify(infSends),"Browse",opciones);
	
	setTimeout(function(){loadPeriodo();}, 5000);
	
}

function enviaCertificado21(){	
	imprimir();
	var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900px, height=550px, top=85px, left=140px";
	window.open( "enviaInformes?listaejercicio=" + listaejercicio,"Browse",opciones);
}

function cierraEnvio_1(){
	
	$('#fadeComp').remove();
	$('#formEnvio').remove();
	$('#formEnvio1').remove();
	$('#formEnvio2').remove();
	$('#fadeLoadSend').remove();
}

function cierraEnvio_2(){
	$('#formEnvio2').hide();
	$('#formEnvio').css({'display':'block'});
	$('#fadeComp').css({'display':'block'});
}

function pasaRegistro(){
	var selecion =null;
	$('#detInfEnvio input:checked').each(function() {
		  if (jQuery(this).is(":checked")){
			  selecion = null;  selecion = $(this).attr('name')+",";
			  console.log('listaEjercicio'+listaejercicio); console.log('seleccion: '+selecion);
			  listaejercicio.push(selecion);
       }  
	});
}

function certificadoPDF(){
	location.href='getCertificadoEnvioPDF.action?cert='+$('#Ncertificado').text();
}

function certificadoFinal(){
	
	var tipoInforme = $("#contTipoInformes option:selected").val();
	var infSends = [];

	$("#tblEnvInformes input:checked").each(
		function(){
			var infs=[];
			if(jQuery(this).is(":checked")){
				infs=$(this).attr('name').split("/");
			}
			infSends.push(infs);
		});

	$('#formEnvio2').hide();
	dialogEnvioInformes.dialog('close');

	$.post('./informes/showInforSendInfTres', {
		tpInforme: tipoInforme,
		infSends: JSON.stringify(infSends)
	}).done(function () {
		dialogEnvioInformesOK.dialog('open');
		dialogEnvioInformesOK.dialog('option', 'width', '320');
	});
}

function cerrarCertificadoFinal(){
	window.close();
	
}

function closeDialogEnvioInforme() {
	dialogEnvioInformes.dialog('close');
}