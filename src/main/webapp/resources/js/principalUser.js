
$(document).ready(function() {
	
	/*var ejercicio = $("#cbEjercicio option:selected").val();
	
	console.log("principalUser.js (document.ready()) esto se ejecuta primero. #cargaInformesLink.click -> validaInfPendientesPpal(0,"+ejercicio+",-1)");
	
	$('#cargaInformesLink').click(function(){
		
		//ejercicio=$("#cbEjercicio option:selected").val();
		var estado=validaInfPendientesPpal(0,ejercicio,-1);
		if (estado==1){
			return false;
		}
		
	});

	loadEstadosInformeAnual($("#cbEjercicio option:selected").val(), $("#cbTipoInformes option:selected").val());*/
	
});

$('#btn_envio').click(function(){
	
//	 alert("Envio - principalUser");
	console.log("btn_envio # principalUser.js ");
	
	ejercicio=$("#cbEjercicio option:selected").val();
	ventana=1;
	var estado=validaInfPendientesPpal(0,ejercicio,-1);
	if (estado==1){
		intervalo=setInterval(function()
		{
			reconsultaPendientesAnual(0,ejercicio,-1)
		},5000);
		return false;
	}
	
});

function cierraValidandoseAlert(){
	$('#validandoseAlert').hide();
	$('#fade').hide();
	console.log('Cerrando');
}

function getValidandose(){
	
	console.log('getValidandose');
	
	var action = 'getValidandose.action?periodo=0';
	var validandose = 0;
	
	$.ajax({url: action, type: "GET", dataType:'json', async: false,cache: false,
		success: function(data){
			console.log(data);
			if(data.estado==99){
				validandose = 1;
				
				$('#validandoseAlert').hide();
				$('#fade').hide();
				$('#formEnvio').hide();
				
				var validandoseAlert = 'Sr. Usuario, actualmente hay informes en proceso de validacion';
				var listaInformeValidandoseHTML = '<ul>';	
				console.log(data.listaInformeValidandose.length);
				for (var i=0;i<data.listaInformeValidandose.length;i++){
					console.log(data.listaInformeValidandose[i].informeEstado);
					if(data.listaInformeValidandose[i].informeEstado == 2){
						var estado = '<img id="estado_'+(i+1)+'" src="images/loader.gif" style="width:15px;height:15px;" />';
					}else{
						var estado = '<img id="estado_'+(i+1)+'" src="images/ok.jpg" style="width:15px;height:15px;" />';
					}
					
					listaInformeValidandoseHTML = listaInformeValidandoseHTML +'<li>' + estado + ' ' + data.listaInformeValidandose[i].informeNombre + '</li>';
				}
				listaInformeValidandoseHTML = listaInformeValidandoseHTML + '</ul>';
				console.log(listaInformeValidandoseHTML);
						
				$('#validandoseAlert #textoCargando').css('text-align','left');
				$('#validandoseAlert #textoCargando').html(validandoseAlert+'<br>'+listaInformeValidandoseHTML);
				$('#fade').show();
				$('#validandoseAlert').show();
				$('#formEnvio').hide();
				$('body').css('cursor','auto');
				
			}
			else{
				validandose = 0;
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert(XMLHttpRequest.responseText());
			validandose = 0;
			console.log('error');
		}
	});
	
	return validandose;
}

function on_over(objeto){
	console.log('objeto:' +objeto);
	$('#'+objeto).attr("src").match(/[^\.]+/) + "_over.png";	
}

function verificaPopup(){
	if($('#abrePopup').val() =="1"){
		$('#cbEjercicio').val($('#campoUno').val());
		loadPeriodo();
		abrePopUp($('#campoUno').val(),$('#campoDos').val(),3,'Contraloria','30/04/2013 10:35:21','29',0,3);
	}
	if($('#abrePopup').val() =="2"){
		$('#cbEjercicio').val($('#campoUno').val());
		loadPeriodo();
	}
}

/*
function actualizarGrillaInformes(xml, idEjercicio){
	var hayComplemento;
	
	//limpia titulo correcciones
	//console.log('complemento? '+xml.hayComplementos);
	if(xml.hayComplementos==1){
		$("#titCorr").text("COR"); $("#titCorr").css("width","37px");
		//$('.grillaInformes').css('width','925px');
	} else{ 
		$("#titCorr").text("");  $("#titCorr").css("width","0px");
		//$('.grillaInformes').css(;
	}
	
	//limpia contenedor
	$('#contEstInfAnual').text('');
	$.each(xml.listEstInfAnual, function(i, itm) {
		var row = 'rw_inf0' + (i+1);
		var clase = '';
		if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp";}
		jQuery('<div/>', {id:row,class:clase}).appendTo('.contEstInfAnual');
		
		//imprime contenedor con el nombre del informe
		var rowcol = 'inf0' + (i+1);
		clase = 'detalleInfCol01';
		jQuery('<div/>', { id: rowcol, class: clase, text: itm.informe}).appendTo('#'+row);
		
		clase = 'detalleInfColPer';
		var periodos = [ 'Ape','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Cor','Cie' ];
		
		var a=0;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		
		
		var objeto=	"<img id='inf0"+i+'_p'+itm.idApe+'Ape'+"' src='"+itm.imageApe+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		$("#inf0"+i+'_p'+itm.idApe+'Ape').attr("onclick",itm.evApe);
		//$("#inf0"+i+'_p'+itm.idApe+'Ape').attr("title",  itm.altApe);
		$('#userSendCGR').val(itm.userApe);
		$('#userSendCGRError').val(itm.userApe);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idEne+'Ene'+"' src='"+itm.imageEne+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idEne+'Ene').attr("onclick",itm.evEne);
		//$("#inf0"+i+'_p'+itm.idEne+'Ene').attr("title",  itm.altEne);
		$('#userSendCGR').val(itm.userEne);
		$('#userSendCGRError').val(itm.userEne);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idFeb+'Feb'+"' src='"+itm.imageFeb+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idFeb+'Feb').attr("onclick",itm.evFeb);
		//$("#inf0"+i+'_p'+itm.idFeb+'Feb').attr("title",  itm.altFeb);
		$('#userSendCGR').val(itm.userFeb);
		$('#userSendCGRError').val(itm.userFeb);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idMar+'Mar'+"' src='"+itm.imageMar+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idMar+'Mar').attr("onclick",itm.evMar);
		//$("#inf0"+i+'_p'+itm.idMar+'Mar').attr("title",  itm.altMar);
		$('#userSendCGR').val(itm.userMar);
		$('#userSendCGRError').val(itm.userMar);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idAbr+'Abr'+"' src='"+itm.imageAbr+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idAbr+'Abr').attr("onclick",itm.evAbr);
		//$("#inf0"+i+'_p'+itm.idAbr+'Abr').attr("title",  itm.altAbr);
		$('#userSendCGR').val(itm.userAbr);
		$('#userSendCGRError').val(itm.userAbr);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idMay+'May'+"' src='"+itm.imageMay+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idMay+'May').attr("onclick",itm.evMay);
		//$("#inf0"+i+'_p'+itm.idMay+'May').attr("title",  itm.altMay);
		$('#userSendCGR').val(itm.userMay);
		$('#userSendCGRError').val(itm.userMay);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idJun+'Jun'+"' src='"+itm.imageJun+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idJun+'Jun').attr("onclick",itm.evJun);
		//$("#inf0"+i+'_p'+itm.idJun+'Jun').attr("title",  itm.altJun);
		$('#userSendCGR').val(itm.userJun);
		$('#userSendCGRError').val(itm.userJun);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idJul+'Jul'+"' src='"+itm.imageJul+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idJul+'Jul').attr("onclick",itm.evJul);
		//$("#inf0"+i+'_p'+itm.idJul+'Jul').attr("title",  itm.altJul);
		$('#userSendCGR').val(itm.userJul);
		$('#userSendCGRError').val(itm.userJul);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idAgo+'Ago'+"' src='"+itm.imageAgo+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idAgo+'Ago').attr("onclick",itm.evAgo);
		//$("#inf0"+i+'_p'+itm.idAgo+'Ago').attr("title",  itm.altAgo);
		$('#userSendCGR').val(itm.userAgo);
		$('#userSendCGRError').val(itm.userAgo);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idSep+'Sep'+"' src='"+itm.imageSep+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idSep+'Sep').attr("onclick",itm.evSep);
		//$("#inf0"+i+'_p'+itm.idSep+'Sep').attr("title",  itm.altSep);
		$('#userSendCGR').val(itm.userSep);
		$('#userSendCGRError').val(itm.userSep);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idOct+'Oct'+"' src='"+itm.imageOct+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idOct+'Oct').attr("onclick",itm.evOct);
		//$("#inf0"+i+'_p'+itm.idOct+'Oct').attr("title",  itm.altOct);
		$('#userSendCGR').val(itm.userOct);
		$('#userSendCGRError').val(itm.userOct);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idNov+'Nov'+"' src='"+itm.imageNov+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idNov+'Nov').attr("onclick",itm.evNov);
		//$("#inf0"+i+'_p'+itm.idNov+'Nov').attr("title",  itm.altNov);
		$('#userSendCGR').val(itm.userNov);
		$('#userSendCGRError').val(itm.userNov);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idDic+'Dic'+"' src='"+itm.imageDic+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idDic+'Dic').attr("onclick",itm.evDic);
		//$("#inf0"+i+'_p'+itm.idDic+'Dic').attr("title",  itm.altDic);
		$('#userSendCGR').val(itm.userDic);
		$('#userSendCGRError').val(itm.userDic);
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		var claseComp='detalleInfColComp';
		jQuery('<div/>', { id: rowcol, class: claseComp}).appendTo('#' + row);
		//console.log('contenedor '+'#inf0'+itm.informeId+'_Cor');
		$('#inf0'+itm.informeId+'_Cor').css({'width':'30px'});
		
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idCie+'Cie'+"' src='"+itm.imageCie+"' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
		$('#' + rowcol).append(objeto);
		$("#inf0"+i+'_p'+itm.idCie+'Cie').attr("onclick",itm.evCie);
		//$("#inf0"+i+'_p'+itm.idCie+'Cie').attr("title",  itm.altCie);
		$('#userSendCGR').val(itm.userCie);
		$('#userSendCGRError').val(itm.userCie);
		
		
	});
	$.each(xml.listaInformeConCorrecciones, function(i, itm) {
		var param=$("#cbEjercicio option:selected").val()+','+itm.informeId+',"'+$('#inf0'+itm.informeId).text()+'","'+$("#cbEjercicio option:selected").text()+'"';
		console.log(param);
		var objeto="<a class='gbgt gbes' id='gbg3' onclick='verComplementosEnviados("+param+")'><div id='gbgs3'><span id='gbi3'>Ver</span></div></a>";
		$(objeto).appendTo('#inf0'+itm.informeId+'_Cor');
		
	});	
	//console.log('fin xml');
}
*/



