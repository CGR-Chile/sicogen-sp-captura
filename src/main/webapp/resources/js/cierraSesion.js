$(document).ready(function () {
	
	$('#imgCerrarSesion').css('cursor','pointer');
	$("#imgCerrarSesion").click(function () {
		$.ajax({url:'logout.action',type: "POST",dataType: "html",async:false,    
			error: function(data){},
		    success: function(data){}
		});
		
		//url='http://'+ window.location.hostname+'/pkmslogout';
		//window.location = url;
    });
});