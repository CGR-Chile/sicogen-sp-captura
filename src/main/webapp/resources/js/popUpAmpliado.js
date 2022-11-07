$(document).ready(function() {
	
	$('.verInformeBD').click(function() {
		verInf = 'verInforme.action?periodo='+$('#periodo').text()+'&tpArchivo=0'+'&informe='+$('#informe').text()+'&entidad='+sessEntidad;
		var windowSizeArray = ["width=200,height=200","width=300,height=400,scrollbars=yes"];
		var windowName = "popUp";
		var windowSize = windowSizeArray[$(this).attr("rel")];
		window.open(verInf, windowName, windowSize);
	});
	
	$('.verInformeCM').click(function() {
		verInf = 'verArchivoPdfCM.action?periodo='+$('#periodo').text()+'&tpArchivo=0'+'&informe='+$('#informe').text()+'&entidad='+sessEntidad;
		var windowSizeArray = ["width=200,height=200","width=300,height=400,scrollbars=yes"];
		var windowName = "popUp";
		var windowSize = windowSizeArray[$(this).attr("rel")];
		window.open(verInf, windowName, windowSize);
	});
	
	$('.repValidacion').click(function() {
		alert("alert");
		repVal = 'getValidacionInforme.action?periodo='+$('#periodo').text()+'&tpArchivo=0'+'&informe='+$('#informe').text()+'&entidad='+sessEntidad;
		console.log(repVal);
		var windowSizeArray = [ "width=200,height=200","width=300,height=400,scrollbars=yes" ];
		var windowName = "popUp";
		var windowSize = windowSizeArray[  $(this).attr("rel")  ];
		window.open(repVal, windowName, windowSize);
    });
	
	$('.verCertEnvio').click(function() {
		if ('0' == $('#corrEnvio').text()) {	
			console.log('entre a mostrar alerta');
			jAlert('No se ha enviado el informe a Contraloria', "Certificados");			
		} else {
			console.log('entre a mostrar el certificado');
			var windowSizeArray = ["width=200,height=200","width=300,height=400,scrollbars=yes"];
			var windowName = "popUp";
			var windowSize = windowSizeArray[$(this).attr("rel")];
			window.open('certificadoEnvio.action?certificado='+ $('#corrEnvio').text(), windowName, windowSize);
		}
    });
	
	$('.descFile').click(function() { 
		
		//jAlert($('#periodo').text()+" "+$('#informe').text()+" "+sessEntidad);	
		
		location.href = 'descargaInforme.action?periodo='+$('#periodo').text()+'&tpArchivo=0'+'&informe='+$('#informe').text()+'&entidad='+sessEntidad; 
	});
	$('.descFileCM').click(function() { 
		location.href = 'descargaInformeCM.action?periodo='+$('#periodo').text()+'&tpArchivo=0'+'&informe='+$('#informe').text()+'&entidad='+sessEntidad; 
	});
	$('.verListErr').click(function() {
		//alert("1 .verListErr");
		//alert("idInforme_form: " + $('#idInforme_form').text());
		//alert("periodo: " + $('#periodo').text());		
		
		//loadResumenErrores($('#idInforme_form').text(), $('#periodo').text(), 0);
		/*
		 alert("2 .verListErr");	
		$("#dialogErrorCGF").dialog({}).dialog("open");
		$("#dialog").dialog( "close" );
		$("#dialog").css('width','680px');
		$("#dialog").css('left','300px');
		$("#dialogErrorCGF").parent().css('width','680px');
		$("#dialogErrorCGF").parent().css('left','25%');
		$("#dialogErrorCGF").parent().css('top','10%');
		$("#dialogErrorCGF").parent().css('scroll','hidden');
		$("#ui-id-2").text($("#inf0" + $('#informe').text()).text());
		$(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');		
		return false; 
		*/
	});
	
	console.log("popUpAmplaido.js - document.ready.function");
	
	$("#liVerBitacora").unbind('click');
	$("#liVerBitacora").click(function() { popUpBitacora(parametros); });
	
});