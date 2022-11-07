$(document).ready(function() {
	cargaAdministracion(0);
});

function changeIframeCGR(idMantenedor){
	/*
	var url='';
	switch(idMantenedor){
	case 1: url='inicioCGR'; break;
	case 2: url='segimiento'; break;
	case 3: url='reportes'; break;
	case 4: url='funcionesEspeciales'; break;
	case 5: url='administracion'; break;
	}
	
	$('#iMantenedores').html('<html><body>div style="margin:0 auto;"><img src="images/cargando3.gif"></img></div></body></html>');
	$("#iMantenedores").contents().find("body").html('<html><body style="background-color:#fff;"><div style="margin:0 auto;width:300px;"><img src="images/cargando3.gif"></img></div></body></html>');
	
	var id=idMantenedor-1;
	$('li').each(function(i, itm) {
		if (i!=id){$('#'+itm.id).removeClass('TabbedPanelsTabSelected');}else{$('#'+itm.id).addClass('TabbedPanelsTabSelected');}
    });
	
	$("#iMantenedores").src(url, function(iframe, duration) {	
		}, {
		  timeout: function() { alert("oops! timed out."); },
		  timeoutDuration: 10000
		});
	
	*/
}

function showContentByTabb(idTab){
	$('.TabbedPanelsTab').removeClass('TabbedPanelsTabSelected');
	$('.TabbedPanelsContent').css({'display':'none'});

	$('#TabbedPanelsTab' + idTab).addClass('TabbedPanelsTabSelected');
	$('#TabbedPanelsContent' + idTab).css({'display':'block'});
}
function showContentRedirect(urlAction){
	top.location.href= urlAction;
}