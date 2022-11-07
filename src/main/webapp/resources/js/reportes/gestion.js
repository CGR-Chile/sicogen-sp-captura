$(document).ready(function(){
	$('#scrollbar1').tinyscrollbar({});	
});
function verCertificado(cert, ent){
	console.log('entre a mostrar el certificado');
	url='certificadoEnvioReporte.action?certificado='+cert+'&entidad='+ent;
	var windowSizeArray = [ "width=200,height=200",
		                    "width=300,height=400,scrollbars=yes" ];
	var windowName = "popUp";
	var windowSize = windowSizeArray[  $(this).attr("rel")  ];
	window.open(url, windowName, windowSize);
	/*
	$.ajax({url:'certificadoEnvioReporte.action',
	    type: 'POST',
	    dataType: "html",
	    data:{certificado:cert,       entidad:ent,},
	    beforeSend : function(xhr) {
    	$('body').append('<div id="fadeCertificado" class="overlay" style="display:block"></div>'+
				 '<div id="waitCertificado" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#fadeCertificado').remove();
			$('#waitCertificado').remove();
		},error: function(data){	
		
		},success: function(data){
			
			$('body').html(data);
	    	//$('#contFrame').remove();
	    	//$('#contCorrecciones').append('<div id="contFrame" style="clear:both;width: 930px;height:400px;"></div>');
	    	
	    	//$('#contFrame').html(data);
	    }
	});
	*/
}
