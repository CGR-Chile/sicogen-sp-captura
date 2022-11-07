
function cargaEstadosInformesCorreccion(ejercicioId){
	
	ejercicio = $("#cbEjercicio option:selected").val();
	periodo =  $("#cbPeriodos option:selected").val();
	tipo =     $("#cbTipoInformes option:selected").val() ;
	
//	alert("cargaEstadosInformes Correccion");
//	alert('ejercicio: '+ejercicio);
//	alert('periodo: '+periodo);
//	alert('tipo : '+tipo);
	
	console.log("cargaEstadosInformesCorreccion ejercicioId: "+ejercicio +" - Periodo: "+periodo+" - Tipo Inf.: "+tipo);
	
	var action = "getStateInf.action?ejercicioId="+ejercicio+"&periodo="+periodo+"&tipo="+tipo;
	
	$.ajax({
		url: action,
		type: "POST",
		dataType: "html",
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeEstPeriodos" class="overlay" style="display:block"></div>'+
				 '<div id="waitEstPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#fadeEstPeriodos').remove();
			$('#waitEstPeriodos').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log('No Ok');
		        console.log('Error ' + textStatus);
		        console.log(errorThrown);
		        console.log(XMLHttpRequest.responseText);
		},success: function(data){
			
			console.log('cargaEstadosInformes - Bloquea Boton Validar: '+tipo);
			if(tipo == 2){
				$('#btn_validar').hide();
				console.log('cargaEstadosInformes - Si Bloquea Boton Validar...');
			}else{
				$("#btn_validar").show();
				console.log('cargaEstadosInformes - No Bloquea Boton Validar..');
			}
			
			$('#tblUpInformes > tbody').empty();
			$('#tblUpInformes').html(data);
			
		}
	});
}
function cargaEstadosInformes(){

	var ejercicio = $("#cbEjercicio option:selected").val();
	var periodo =   $("#cbPeriodos option:selected").val();
	var tipo =      $("#cbTipoInformes option:selected").val();

//	alert("cargaEstadosInformes normal");
//	alert('ejercicio: '+ejercicio);
//	alert('periodo: '+periodo);
//	alert('tipo : '+tipo);
	//este es marco
	//console.log("cargaEstadoInforme Ejercicio: "+ejercicio+" - Periodo: "+periodo+" - Tipo Inf.: "+tipo);

	var action = '../informes/InformeUpload?ejercicio='+ejercicio+"&periodo="+periodo+"&tipo="+tipo;
	var data = {}
	//var action = "getStateInf.action?ejercicioId="+ejercicio+"&periodo="+periodo+"&tipo="+tipo;

	$.ajax({
		url: action,
		type: "POST",
		dataType: "html",
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeEstPeriodos" class="overlay" style="display:block"></div>'+
				'<div id="waitEstPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
				'	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la información</div>'+
				'    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				'</div>');
		},complete: function (data) {
			$('#fadeEstPeriodos').remove();
			$('#waitEstPeriodos').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log('No Ok');
			console.log('Error ' + textStatus);
			console.log(errorThrown);
			console.log(XMLHttpRequest.responseText);
		},success: function(data){

			console.log('cargaEstadosInformes - Bloquea Boton Validar: '+tipo);
			if(tipo == 2){
				$('#btn_validar').hide();
				console.log('cargaEstadosInformes - Si Bloquea Boton Validar...');
			}else{
				$("#btn_validar").show();
				console.log('cargaEstadosInformes - No Bloquea Boton Validar..');
			}

			$('#tblUpInformes > tbody').empty();
			$('#tblUpInformes').html(data);

		}
	});
	
}


function loadPeriodoEjercicio(){

	ejercicio = $("#cbEjercicio option:selected").val();
	
	if ($.isNumeric(ejercicio)==false ){ejercicio=0;}
	
	var action = '../informes/getPeriodos?ejercicioId='+ejercicio;
	var data = {}

	$.ajax({
		 url: action,
		    type: "POST",
		    contentType: "application/json",
		    data: JSON.stringify(data),
		    dataType: "json",
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la información</div>'+
					 '    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function (data) {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
		        alert('Error: ' + textStatus);
		        alert(XMLHttpRequest.responseText);
		    },
		    success: function(data){
		    	console.log("estamos buscando los periodos (loadPeriodoEjercicio)");
		    	//HABILITAR LUEGO MV
		    	/*switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
		    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
		    	}*/
		    	
		    	$('#tblUpInformes > tbody').empty();
		    	
	    	    $("#cbPeriodos").get(0).options.length = 0;
                //$("#cbPeriodos").get(0).options[0] = new Option("Selec. Periodo", "-1"); 
	    	    $("#cbPeriodos").append('<option data-cod="-1" value="-1">Seleccione Periodo</option>');
	    	    
                $.each(data, function(i, item) {
                    //$("#cbPeriodos").get(0).options[$("#cbPeriodos").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
                    //$("#cbPeriodos").get(0).options[i].attr('data-cod', item.periodoCodigo);
                	$("#cbPeriodos").append('<option data-cod='+item.periodoCodigo+' value="'+item.periodoId+'">'+item.periodoCodigo+'</option>');
                	
                });		
		    }	
                
		});
}


function loadTipoInformePorPerido(ejercicio, periodo, correccion){

	console.log("loadTipoInformePorPerido: ejercicio "+ejercicio+" periodo "+periodo+ " correccion "+correccion);
	
	if ($.isNumeric(ejercicio)==false ){ejercicio=0;}
	
	var action = "getTipoInformePorPeriodo.action?ejercicio="+ejercicio+"&periodo="+periodo+"&correccion="+correccion; 
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    beforeSend: function (xhr) {
				$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
					 '<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			},complete: function (data) {
				$('#fadePeriodos').remove();
				$('#waitPeriodos').remove();
			},error: function(XMLHttpRequest, textStatus, errorThrown){
		        alert('Error: ' + textStatus);
		        alert(XMLHttpRequest.responseText);
		    },
		    success: function(data){
		    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
		    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
		    	}
		    	$('#tblUpInformes > tbody').empty();
	    	    $("#cbTipoInformes").get(0).options.length = 0;
                $("#cbTipoInformes").get(0).options[0] = new Option("Selec. Tipo de Informe", "-1"); 

                $.each(data.listaTipoInformes, function(i, item) {			                	
                    $("#cbTipoInformes").get(0).options[$("#cbTipoInformes").get(0).options.length] = new Option(item.nombre, item.id);
                });			                
		    }
		});
}

