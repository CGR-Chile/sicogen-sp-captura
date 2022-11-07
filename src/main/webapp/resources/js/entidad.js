function comunasByRegion(objeto){
	
	$.ajax({url:'getEntidadesComunaById.action?tpEnt='+$("#cbTpEntidad option:selected").val()+'&regId='+objeto,
		type: "GET", 
		dataType:'json',
		success: function(data){
			console.log(data);
			$("#cbComuna").empty();
			$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option( 'Selec. Comuna',-1);
	    	$.each(data.listaComunas, function(i, itm) {
	    		$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option(itm.nombre, itm.entId);
	    		$("#cbComuna").removeAttr("disabled");
            });
	    	console.log(data);
	    	if (data.listaComunas.length==0){
	    		$("#cbComuna").attr('disabled','disabled');
	    	}
		}
	});
}
