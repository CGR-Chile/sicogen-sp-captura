var NEW_LOC = document.URL;
function goNow(){ 
	document.location=NEW_LOC; 
}

function printPage() {
	$('#botones').css({ display: "none"});
	window.print();
	//goNow();
	$('#botones').css({ display: "block"});
}

function generaCodigo(codigo){
	$('#qrcode').qrcode({width: 96,height: 96,text: codigo});
}