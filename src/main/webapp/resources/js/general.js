
function muestraCorreo(){
	$('#fadeMail').remove();
	$('#contEmail').remove();
	$('body').append('<div id="fadeMail" class="overlay" style="display:block"></div>');
	
	var action='muestraMail.action';
	$.ajax({url: action,type: "POST",dataType: "html",
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('Error ' + textStatus);
			alert(errorThrown);
			alert(XMLHttpRequest.responseText);
		},
		success: function(data){
			$('body').append(data);
			$('#contEmail').css({ display: "block"});
		}
	});
	
}
function cierraEnvioCorreo(){
	// $("#formID").validationEngine();

	$('#fadeMail').remove();	
	$('#contEmail').remove();
}


function enviaEmail(){
	var cuerpo = $("#mensaje").val();
	var asunto = $("#titEmail").text();
    var action = "envioMail.action?cuerpo=" + cuerpo+"&asunto="+asunto; 	
    console.log("Validar");
 
    $("#sendEmail").validate({    
		 ignore: ".ignore",
		  rules: {
			  userEmail: {
			      required: true,
			      email: true
			    },
			    userFono: {
			    	 required: true,
			    	 minlength: 2, 
			    	 maxlength: 15
				    }
			  },
		  messages: {
			  userEmail: "Email v&aacute;lido es requerido.",
			  userFono: "Tel&eacute;fono v&aacute;lido es requerido."
            },

           
	  }).form(); 
	
 if(  $("#sendEmail").valid())    {
	if($("#mensaje").val().length== 0)
	{
		jAlert("Debe agregar comentario", "Correo");
		return;
	}
	$.ajax({
		url: action, type: "POST", dataType: "json",
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				jAlert("Mensaje Enviado","Envio de Correo");
				cierraEnvioCorreo();
			}
		});
}
}
function cierraNoAutorizado(){
	$('#fadeComp').remove();
	$('#contNoAutorizado').remove();
	$('#fadeNoAutorizado').remove();
}
