$(document).ready(function(){
	if($('#detalle >tbody >tr').length>10){
		$('#titulo').css({'width':'1101px'}); 
		$('#cabecera').css({'width':'1126px'});
	}else{
		$('#titulo').css({'width':'1081px'}); 
		$('#cabecera').css({'width':'1106px'});
	}
	
});