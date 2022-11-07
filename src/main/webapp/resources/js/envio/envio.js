 
//function validaPendientes(pPeriodo, ejercicio, tipoArchivo)
//{
//	alert("TTTT");
//	alert(pPeriodo + ejercicio + tipoArchivo);
//	
//}


function cambiaTpInfEnvio(idCombo){
	
	var action = 'showInforSendFilt.action?ejercicio='+$("#cbEjercicio option:selected").val()+
	'&tpInforme='+idCombo.value+'&stpInforme='+$("#cbSubTipoInformes option:selected").val();
	 //alert(action);
	
	//debugger;
	$.ajax({url: action, type: "POST", dataType: "json",async:true,
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeWaitEnvio" class="overlay" style="display:block"></div>'+
				 '<div id="waitEnvio" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#fadeWaitEnvio').remove();
			$('#waitEnvio').remove();
		},success: function(data){
	    	switch(data.estado){
	    		case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='home.action'); return false;}} );break;
	    		case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login.action');return false;}} );break;
	    	};
	    	updListaInformesEnvio(data);
	    	//$('body').append('<div id="fadeComp" class="overlay" style="display:block;"></div>');
	    	$('body').append(data);
	    	
	    },error: function(XMLHttpRequest, textStatus, errorThrown){
	    	$('#fadeComp').css({ display: "block"}); $('body').append(XMLHttpRequest.responseText);
	    	
	    },
	});
}


function updListaInformesEnvio(xml){
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