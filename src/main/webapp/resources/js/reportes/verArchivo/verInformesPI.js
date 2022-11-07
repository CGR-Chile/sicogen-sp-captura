$(document).ready(function(){
	if($('#detalle >tbody >tr').length>10){
		$('#titulo').css({'width':'1150px'}); $('#cabecera').css({'width':'1170px'});
	}else{  
		$('#titulo').css({'width':'1030px'}); $('#cabecera').css({'width':'1150px'});
	}
	
});