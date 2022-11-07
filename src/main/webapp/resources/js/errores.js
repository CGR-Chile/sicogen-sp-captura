$(document).ready(function() {
	$('.dropdown-toggle').dropdown();
	
	
	$('.dropdown-menu-right > li > a').click(function(){
		//alert( $(this).attr('id') );
		
		if($(this).attr('id')=='home'){
			location.href='home';
		}else{
			var modal="position: absolute;top: 3%;left: 6.5%;width: 85%;height: 710px;padding: 16px;background: #fff;color: #333;z-index: 1002;overflow: auto;";
			modal+="margin:15px auto 5px auto;padding: 25px 10px 10px 5.5%;border: 2px solid;border-radius: 25px;-moz-border-radius: 25px;";
			
			$.ajax({
				url: $(this).attr('id')
				,type: "POST"
				,dataType: "json"
				,data:{
					errorNumber:	$('.error-wrapper > h1').text(),
					errorMensaje:	$('.error-wrapper > h5').text(),
					errorDetalle:	$('#detalleError').text(),
				},beforeSend: function(xhr){
					$("body").css("cursor", "wait");
					var popCarga=	'<div id="waitLoadEmail" class="contenedorEnvioArchivo modalCarga" style="'+modal+'width:250px;height:200px;left:35%; position: absolute;display:block;background-color:#fff;">'+
									'	<div id="cargando" class="cargando">'+
									'		<img src="images/cargando2.gif" class="icoImage100" ></img>'+
									'	</div>'+
									'	<div id="textoCargando" class="textoCargando">Enviando Correo.</div>'+
									'	<div id="estadoForm" style="margin-top:15px;"></div>'+
									'</div>'+
									'<div id="fadeLoadEmail" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;max-height: 110%;background: #000;z-index: 1001;opacity: .75;-moz-opacity: 0.75;filter: alpha(opacity=75);"></div>';
					$('body').append(popCarga);
				},complete:function( XMLHttpRequest ){
					$('#waitLoadEmail').remove();
					$('#fadeLoadEmail').remove();
					$("body").css("cursor", "default");
				},error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('Error ' + textStatus);
					alert(errorThrown);
					alert(XMLHttpRequest.responseText);
				},success: function(data){
					$('#waitLoadEmail').remove();
					$('#fadeLoadEmail').remove();
					$("body").css("cursor", "default");
			    	var error = data.errorMUN;
			    	
			    	alert(error);
			    	console.log(error);
			    	
			    	if (error != null) { 
			    		$(location).attr('href',url = 'error?errorUsuario=' + error.errorUsuario + '&errorTecnico=' + error.errorTecnico + '&tipo=' + error.tipo + '&redir=' + error.redir);
			    	}
			    	else { 
						jAlert("Mensaje Enviado","Envio de Correo");
						cierraEnvioCorreo();
			    	}
				}
			});
		}
	});
});