function loadResumenErrores(informe,periodo,tpInforme){
	
	var ent="";
	if ($("#cbComuna").length > 0){ent=$("#cbComuna option:selected").val();}else{ent=0;}
	var parametros='periodo='+periodo+'&tpInforme='+tpInforme+'&informe='+informe+'&entidad='+ent;
	
	var accion = 'loadResumenErrores.action?'+parametros;
	
	$('#divResumenError').html('');
	$.ajax({
		url: accion,
		type: "POST",
		dataType:"json",
		async: false,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log('error');
			$("#dialogErrorCGF").dialog({
		    }).dialog("close");
			jAlert('No existen registros para mostrar', "Resumen errores");	
	
		},
	    success: function(data){
	    	$('#divResumenError').text("");
	    	$('#divResumenError').empty();
	    	console.log("1");
	    	var fila='';
	    	
	    	
	    	$.each(data.listaResumenErrores, function(i, item) {
	    		if(i%2==0){
	    			fila='';
	    			fila= '<div class="rwdetInfImp">'+
					   '<div class="detalleInfColError" id="inf01_Dic">'+item.nombre+'</div>'+
			           '<div class="detalleInfColError">'+item.linea+'</div>'+
			           '<div class="detalleInfColErrorFinal">'+item.errores +'</div>'+
			           '</div>';
		    		
		    		$('#divResumenError').append(fila);
	    		}
	    		else{
	    			fila='';
	    			fila ='<div class="rwdetInfPar">'+
	    			'<div class="detalleInfColError" id="inf02_Dic">'+item.nombre+'</div>'+ 
	    			'<div class="detalleInfColError">'+item.linea+' </div>'+ 
	    			'<div class="detalleInfColErrorFinal">'+item.errores +'</div>'+
	    			'</div>';
	    			$('#divResumenError').append(fila);
	    		}
            });
	    }
	});
 }

function loadResumenErroresIC(idFileUpload)
{
	var ent="";
	$('#divResumenError').html('');
	$.ajax({
		url: 'obtenerResumenErroresIC?idFileUpload='+idFileUpload,
		type: "POST",
		dataType:"json",
		async: false
		,error: function(XMLHttpRequest, textStatus, errorThrown) 
		{
			console.log('error');
			$("#dialogErrorCGF").dialog({}).dialog("close");
			jAlert('No existen registros para mostrar', "Resumen errores");
		}
		,success: function(data) {
	    	$('#divResumenError').text("");
	    	$('#divResumenError').empty();
	    	console.log("1");
	    	var fila='';
	    	$.each(data.listaReporteErrores, function(i, item) {
	    		
	    		
	    		if(i%2==0){
	    			fila='';
	    			fila= '<div class="rwdetInfImp">'+
    		           '<div class="detalleInfColError">'+item.tipoError+'</div>'+
			           '<div class="detalleInfColErrorFinal">'+item.mensajeError +'</div>'+
			           '</div>';
		    		
		    		$('#divResumenError').append(fila);
	    		}
	    		else{
	    			fila='';
	    			fila ='<div class="rwdetInfPar">'+
	    			'<div class="detalleInfColError" id="inf02_Dic">'+item.tipoError+'</div>'+ 
	    			'<div class="detalleInfColErrorFinal">'+item.mensajeError+' </div>'+ 
	    			'</div>';
	    			$('#divResumenError').append(fila);
	    		}
            });
	    }
	});
} 