$(document).ready(function(){

function isOdd(num) { return num % 2;}


function loadInformesStates(ejercicio,periodo,tipo){
	
	//alert("loadInformesStates "+ejercicio+" - "+periodo+" - "+tipo);
	
	clearInterval(intervalo);
	clearInterval(intervaloCarga);
	
	$.ajax({
		url: "getStateInf?ejercicioId="+ejercicio+"&periodo="+periodo+"&tipo="+tipo,
		type: "POST",
		dataType: "html",
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeEstPeriodos" class="overlay" style="display:block"></div>'+
				 '<div id="waitEstPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
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
			/*switch(data.estado){
	    		case -1:jAlert(data.mensaje, "Carga de Informes", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    		case -2:jAlert(data.mensaje, "Carga de Informes", function(r){if(r){$(location).attr('href',url='showFormCarga.action');}} );break;
		    	
	    	}*/
			$('#tblUpInformes > tbody').empty();
			
			$('#tblUpInformes').html(data);

		}
	});
}



function cargaEstadosInformes(){
	
	ejercicio = $("#cbEjercicio option:selected").val(); 
	periodo =   $("#cbPeriodos option:selected").val(); 
	tipo =      $("#cbTipoInformes option:selected").val(); 
	
	//alert("cargaEstadoInforme "+ejercicio+" - "+periodo+" - "+tipo);
	
}


function loadPeriodoEjr(ejercicio){

	//alert("loadPeriodoEjr "+ejercicio);
	
	if ($.isNumeric(ejercicio)==false ){ejercicio=0;}
	
	var action = 'getPeriodos.action?ejercicioId=' + ejercicio; 
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
		        alert('Error: ' + textStatus);
		        alert(XMLHttpRequest.responseText);
		    },
		    success: function(data){
		    	console.log("estamos buscando los periodos");
		    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
		    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
		    	}
		    	$('#tblUpInformes > tbody').empty();
	    	    $("#cbPeriodos").get(0).options.length = 0;
                $("#cbPeriodos").get(0).options[0] = new Option("Selec. Periodo", "-1"); 

                $.each(data.listaPeriodos, function(i, item) {			                	
                    $("#cbPeriodos").get(0).options[$("#cbPeriodos").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
                });			                
		    }
		});
}


function loadTipoInformePorPerido(ejercicio, periodo, correccion){

	//alert("ejercicio: "+ejercicio+" periodo: "+periodo+ " correccion: "+correccion);
	
	console.log("loadTipoInformePorPerido");
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
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
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


});
