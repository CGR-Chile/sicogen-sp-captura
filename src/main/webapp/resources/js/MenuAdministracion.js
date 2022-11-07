function ChangeMantenedor(accion){
	
	//$('#contAdministracion').html(data);
	
	if((accion=='verMantenedorTblPLanCuenta')||(accion=='verMantenedorTblPLanCuentaPresup')){
		$('#contAdministracion').html('<iframe id="carga" src="'+accion+'" width="925px" height="500px" style="float:left;margin: 0 -12px 0" scrolling="auto"></iframe>');
	}else{
		$.ajax({url: accion,
		    type: "POST",
		    dataType: "html",
		    //contentType: "text/html;charset=windows-1252",
		    //contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		    //contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    //contentType:"text/plain; charset=windows-1252",
		    //beforeSend : function(xhr) {
	            //xhr.setRequestHeader('Accept', "text/html; charset=windows-1252");
	        //},
		    error: function(data){	},
		    success: function(data){
		    	$('#contAdministracion').html(data);
		    }
		});
	}
	/*
	console.log(accion);
	if(accion == "-1"){
	$("#carga").attr('src',"");
	}
	else
	{
		$("#carga").attr('src',accion);
	}*/
}


function visualizaCertificadoEnvio(certificado){
	if ('0'==certificado){	
		console.log('entre a mostrar alerta');
		jAlert('No se a enviado el informe a Contraloria', "Certificados");			
	}else{
		console.log('entre a mostrar el certificado');
		url='certificadoEnvio.action?certificado='+ certificado;
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(url, windowName, windowSize);
	}
}