/*$(document).ready(function() {
// Handler for .ready() called.
generaCodigo();
});*/



function generaCodigo(codigo){
	$('#qrcode').qrcode({width: 96,height: 96,text: codigo});

}