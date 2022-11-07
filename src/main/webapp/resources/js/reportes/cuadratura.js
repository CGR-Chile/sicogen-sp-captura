$(document).ready(function(){
	try {

	$('#scrollbar1').css({'height':' 230px'});
	var viewport_size = $('#overview').height();
    $('.viewport').css('height',viewport_size);
	
	$('#scrollbar1').tinyscrollbar({});	
	
	$("#scrollbar1").tinyscrollbar_update();
	$("#scrollbar1").tinyscrollbar_update();
   
	}
	catch(err) {
	  console.log("Error a intentar mostrar scrool");
	}
});