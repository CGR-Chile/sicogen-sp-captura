function cargaSinMovimiento(infId){
	
	$('#fileUpload' + infId).attr("disabled", "disabled");
	$('#inf'+infId+'_cel03').css({"background":"url(images/examinarNok.png) left top no-repeat"});
	$('#inf'+infId+'_respCarga').attr( "src", "images/blanco.png" );
	$('#inf'+infId+'_filename').val( "" );
	$('#inf'+infId+'_cel06').text( "Sin Movimiento" );
	
	$('#inf'+infId+'_State').text( 0 );
	$('#inf'+infId+'_validCarga').attr( "src", "images/NotMov.png" );
	$('#inf'+infId+'_Reportvalid').attr( "src", "images/blanco.png" );
	$('#inf'+infId+'_Reportvalid').attr( "onchange", "" );
	
	console.log('infId: '+infId);
	console.log('Estado: '+$('#Inf'+infId+'_smov').attr('src').substr(13,3));
	
	$('#inf'+infId+'_smov').attr('src','images/check_sel.png');
	$('#2inf'+infId+'_cel06').text('Sin Movimiento');
}
function borraSinMovimiento(infId){
	console.log('Informe: '+infId);
	$('#inf'+infId+'_respCarga').attr( "src", "images/blanco.png" );
	$('#inf'+infId+'_cel06').text( '' );
	$('#inf'+infId+'_State').text( '0' );
	$('#inf'+infId+'_filename').val( "" );
	
	$("#fileUpload"+infId).removeAttr("disabled");
	$('#inf'+infId+'_cel03').css({"background":"url(images/examinar.png) left top no-repeat"});
	$('#inf'+infId+'_smov').attr('src','images/check_on.png');
	
	$('#inf'+infId+'_validCarga').attr( "src", "images/blanco.png" );
	$('#inf'+infId+'_Reportvalid').attr( "src", "images/blanco.png" );
	document.getElementById('fade').style.display='none';
	document.getElementById('formEnvio').style.display='none';
}