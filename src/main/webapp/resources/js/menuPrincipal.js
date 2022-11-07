function loadComunaByRegion(regId){	
	try {
	$('#textoCargando').text('Cargando Comunas');
/*	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';*/
	 var action = 'getComunaById.action?regId='+regId;
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    /*	document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';*/
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		    },
		    success: function(data){
				    	//$('#cbComuna').r
    	    	$('#cbComuna').empty();
    	    	$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option( 'Selec. Comuna',-1);
    	    	$.each(data.listaComunas, function(i, itm) {
    	    		$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option(itm.nombre, itm.comId);                
                });
    	    	/*document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
*/		    }
		});
	}
	catch(err) {
	   console.log("Javascript==>loadComunaByRegion ");
	}
	
	
}

function loadComunaByRegionintoComuna(regId, comuna){	
	$.ajax({
		url: 'getComunaById.action',
		type: "POST",
		dataType: "json",
		data:{
		    	regId:regId
		},beforeSend: function (xhr){
				$('body').append('<div id="fadeLoadComByReg" class="overlay" style="display:block"></div>'+
						'<div id="waitLoadComByReg" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
						' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Comunas</div>'+
						' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
						'</div>');
		},complete: function (data) {
				$('#fadeLoadComByReg').remove();
				$('#waitLoadComByReg').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
		    	document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		 
		},
		success: function(data){
				$('#'+comuna).removeAttr('disabled');
    	    	$('#'+comuna).empty();
    	    	$("#"+comuna).get(0).options[$("#"+comuna).get(0).options.length] = new Option( 'Selec. Comuna',-1);
    	    	$.each(data.listaComunas, function(i, itm) {
    	    		$("#"+comuna).get(0).options[$("#"+comuna).get(0).options.length] = new Option(itm.nombre, itm.entId);                
                });
		}
	});
}

function loadPeriodo(ejercicio,cbPeriodo){
	console.log("Ejercicio:"+ejercicio);
	console.log("Periodo:"+cbPeriodo);
	
	$('#textoCargando').text('Cargando Periodos');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	console.log('Ejerciccio: '+ ejercicio);
	var action = 'getPeriodos.action?ejercicioId=' + ejercicio; 
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		        document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    },
		    success: function(data){
		    	$('#'+cbPeriodo).removeAttr('disabled');
		    	$('#'+cbPeriodo).empty();
		    	$("#"+cbPeriodo).get(0).options[$("#"+cbPeriodo).get(0).options.length] = new Option( 'Selec. Periodo',-1);
                $.each(data.listaPeriodos, function(i, item) {			                	
                    $("#"+cbPeriodo).get(0).options[$("#"+cbPeriodo).get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
                });	
                document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    }
		});
}

function loadPeriodos(ejercicio,cbPeriodo){
	console.log("Ejercicio:"+ejercicio);
	console.log("Periodo:"+cbPeriodo);
	
	console.log('Ejerciccio: '+ ejercicio);
	$.ajax({
		 url: 'getPeriodos.action?ejercicioId='+ejercicio,
		 type: "POST",
		 dataType: "json",
		 beforeSend: function (xhr){
				$('body').append('<div id="fadeLoadPeriodo" class="overlay" style="display:block"></div>'+
						'<div id="waitLoadPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
						' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Periodos</div>'+
						' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
						'</div>');
		},complete: function (data) {
				$('#fadeLoadPeriodo').remove();
				$('#waitLoadPeriodos').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		        document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		},success: function(data){
			console.log(data);
			$('#'+cbPeriodo).removeAttr('disabled');
			$('#'+cbPeriodo).empty();
			$("#"+cbPeriodo).get(0).options[$("#"+cbPeriodo).get(0).options.length] = new Option( 'Selec. Periodo',-1);
			$.each(data.listaPeriodos, function(i, item) {			                	
			    $("#"+cbPeriodo).get(0).options[$("#"+cbPeriodo).get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
			});
		}
	});
}

// Funciones Jquery
/**
 * Funcion para eliminar la ultima columna de la tabla.
 * Si unicamente queda una columna, esta no sera eliminada
 */
function removeRow(arg){
    // Obtenemos el total de columnas (tr) del id "tabla"
/*    var trs=$("#datagridTable tr").length;
    if(trs>1)
    {
        // Eliminamos la ultima columna
        $("#datagridTable tr:last").remove();
    }*/
	$("#cbinformePre"+arg).val(-1);
	$("#cbEjercicioAno"+arg).val(-1);
	$("#cbPeriodos"+arg).val(-1);	
}
$(function() {
	  if(!$.support.placeholder) { 
	   var active = document.activeElement;
	   $(':text').focus(function () {
	     if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
	      $(this).val('').removeClass('hasPlaceholder');
	     }
	   }).blur(function () {
	     if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
	      $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	     }
	   });
	   $(':text').blur();
	   $(active).focus();
	   $('form:eq(0)').submit(function () {
	     $(':text.hasPlaceholder').val('');
	   });
	  }
	});




/** Carga */
function HabilitaInformeCorrecion(){
	
	console.log('paso 1');
	var accion = 'CargaArchivo';
	
	$.ajax({
		url: accion,
		type: "POST",
		dataType:"html",
		error: function(XMLHttpRequest, textStatus, errorThrown){
			
		},
	    success: function(data){
	    	console.log('ok');

	    }
	});
}

function loadEntidadesComunaByRegionintoComuna(regId, comuna){	
	$('#textoCargando').text('Cargando Comunas');
	var action = 'getEntidadesComunaById.action?regId='+regId;
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		 
		    },
		    success: function(data){
				    	//$('#cbComuna').r
		    	$('#'+comuna).removeAttr('disabled');
    	    	$('#'+comuna).empty();
    	    	$("#"+comuna).get(0).options[$("#"+comuna).get(0).options.length] = new Option( 'Selec. Comuna',-1);
    	    	$.each(data.listaComunas, function(i, itm) {
    	    		$("#"+comuna).get(0).options[$("#"+comuna).get(0).options.length] = new Option(itm.nombre, itm.entId);                
                });
    	    	//document.getElementById('fade').style.display='none';
		    	//document.getElementById('formEnvio').style.display='none';
		   
		    }
		});
	
	
	
}

function actualizarGrillaInformesJSON(xml, idEjercicio){
	var hayComplemento;
	
	//limpia titulo correcciones
	console.log('complemento? '+xml.hayComplementos);
	/*if(xml.hayComplementos==1){
		$("#titCorr").text("COR"); $("#titCorr").css("width","37px");
		$('.grillaInformes').css('width','925px');
	} else{ 
		$("#titCorr").text("");  $("#titCorr").css("width","0px");
		$('.grillaInformes').css('width','103%');
	}*/
	$('.rwEncInf').text('');
	
	//limpia contenedor
	$('#contEstInfAnual').text('');
	$.each(xml.listEstInfAnual, function(i, itm) {
		if(i==0){
		var header = 
			"<div  class=\"tituloInfCol01\" style=\"width: 335px;\">INFORMES </div>"+
			"<div  class=\"tituloInfColPer\">APE<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 0+"' value='"+itm.pejrApe+"'/></div>"+
			"<div  class=\"tituloInfColPer\">ENE<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 1+"' value='"+itm.pejrEne+"'/></div>"+
		    "<div  class=\"tituloInfColPer\">FEB<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 2+"' value='"+itm.pejrFeb+"'/></div>"+
			"<div  class=\"tituloInfColPer\">MAR<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 3+"' value='"+itm.pejrMar+"'/></div>"+
			"<div  class=\"tituloInfColPer\">ABR<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 4+"' value='"+itm.pejrAbr+"'/></div>"+
			"<div  class=\"tituloInfColPer\">MAY<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 5+"' value='"+itm.pejrMay+"'/></div>"+
			"<div  class=\"tituloInfColPer\">JUN<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 6+"' value='"+itm.pejrJun+"'/></div>"+
			"<div  class=\"tituloInfColPer\">JUL<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 7+"' value='"+itm.pejrJul+"'/></div>"+
			"<div  class=\"tituloInfColPer\">AGO<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 8+"' value='"+itm.pejrAgo+"'/></div>"+
			"<div  class=\"tituloInfColPer\">SEP<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 9+"' value='"+itm.pejrSep+"'/></div>"+
			"<div  class=\"tituloInfColPer\">OCT<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 10+"' value='"+itm.pejrOct+"'/></div>"+
			"<div  class=\"tituloInfColPer\">NOV<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 11+"' value='"+itm.pejrNov+"'/></div>"+
			"<div  class=\"tituloInfColPer\">DIC<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 12+"' value='"+itm.pejrDic+"'/></div>"+
			"<div  class=\"tituloInfColPer\">CIE<input type='hidden'  style='width: 0px; visibility: hidden;' id='per"+ 13+"' value='"+itm.pejrCie+"'/></div>";
            $('.rwEncInf').append(header);
		} 
		var row = 'rw_inf0' + (i+1);
		var clase = '';
		if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp";}
		jQuery('<div/>', {id:row,class:clase}).appendTo('.contEstInfAnual');
		
		//imprime contenedor con el nombre del informe
		var rowcol = 'inf0' + (i+1);
		clase = 'detalleInfCol01_menuPricipal';
		jQuery('<div/>', { id: rowcol, class: clase, text: itm.informe}).appendTo('#'+row);
		
		clase = 'detalleInfColPer';
		var periodos = [ 'Ape','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Cor','Cie' ];
		
		var a=0;

		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		var objeto=	"<img id='inf0"+i+'_p'+itm.idApe+'Ape'+"' src='"+itm.imageApe+"' class='img18 pi"+itm.idApe+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageApe != "images/blanco.png")
		{
			objeto=	"<input type='checkbox' id='inf0"+i+"_p_Ape' name='"+ +"'>";
		}
		$('#' + rowcol).append(objeto);
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		// Apertura
		// cambiar valor cabecera 
		//alert(itm.pejrApe);
		if(itm.pejrApe != null){
			$("#per"+a).val(itm.pejrApe);
		}
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idEne+'Ene'+"' src='"+itm.imageEne+"' class='img18 pi"+itm.idEne+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageEne != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Ene' name='check'>";
		}
		$('#' + rowcol).append(objeto);
		 // Enero
		//alert(itm.pejrEne);
		if(itm.pejrEne != null){
			
			$("#per"+a).val(itm.pejrEne);
		}
		a++;
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idFeb+'Feb'+"' src='"+itm.imageFeb+"' class='img18 pi"+itm.idFeb+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageFeb != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Feb' name='check'>";
		}
		$('#' + rowcol).append(objeto);
		// Febrero
		if(itm.pejrFeb != null){
			
			$("#per"+a).val(itm.pejrFeb);
		}
		a++;

		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idMar+'Mar'+"' src='"+itm.imageMar+"' class='img18 pi"+itm.idMar+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageMar != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Mar' name='check'>";
		}
		$('#' + rowcol).append(objeto);
		// Marzo 
		if(itm.pejrMar != null){
			
			$("#per"+a).val(itm.pejrMar);
		}
		a++;
		//Abril
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idAbr+'Abr'+"' src='"+itm.imageAbr+"' class='img18 pi"+itm.idAbr+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageAbr != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Abr' name='check'>";
		}
		$('#' + rowcol).append(objeto);
		
		if(itm.pejrAbr != null){
			
			$("#per"+a).val(itm.pejrAbr);
		}
		
		a++;
		// Mayo
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idMay+'May'+"' src='"+itm.imageMay+"' class='img18 pi"+itm.idMay+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageMay != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_May' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		if(itm.pejrMay != null){
			
			$("#per"+a).val(itm.pejrMay);
		}
		a++;
		// Junio
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idJun+'Jun'+"' src='"+itm.imageJun+"' class='img18 pi"+itm.idJun+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageJun != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Jun' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		if(itm.pejrJun != null){
			
			$("#per"+a).val(itm.pejrJun);
		}
		a++;
		// Julio
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idJul+'Jul'+"' src='"+itm.imageJul+"' class='img18 pi"+itm.idJul+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageJul != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Jul' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		if(itm.pejrJul != null){
			
			$("#per"+a).val(itm.pejrJul);
		}
		a++;
		// Ago
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idAgo+'Ago'+"' src='"+itm.imageAgo+"' class='img18 pi"+itm.idAgo+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageAgo != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Ago' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		if(itm.pejrAgo != null){
			
			$("#per"+a).val(itm.pejrAgo);
		}
		a++;
		// Sep
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idSep+'Sep'+"' src='"+itm.imageSep+"' class='img18 pi"+itm.idSep+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageSep != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Sep' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		
		if(itm.pejrSep != null){
			
			$("#per"+a).val(itm.pejrSep);
		}
		a++;
		// Octubre
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idOct+'Oct'+"' src='"+itm.imageOct+"' class='img18 pi"+itm.idOct+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageOct != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Oct' name='check'>";
		}
		$('#' + rowcol).append(objeto);
		
		
		if(itm.pejrOct != null){
			
			$("#per"+a).val(itm.pejrOct);
		}
		a++;
		// Noviembre
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idNov+'Nov'+"' src='"+itm.imageNov+"' class='img18 pi"+itm.idNov+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageNov != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Nov' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		
		if(itm.pejrNov != null){
			
			$("#per"+a).val(itm.pejrNov);
		}
		a++;
		// Diciembre
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idDic+'Dic'+"' src='"+itm.imageDic+"' class='img18 pi"+itm.idDic+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageDic != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Dic' name='check'>";
		}
		$('#' + rowcol).append(objeto);

		
		if(itm.pejrDic != null){
			
			$("#per"+a).val(itm.pejrDic);
		}
		a++;
		// Diciembre
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		var claseComp='detalleInfColComp';
		jQuery('<div/>', { id: rowcol, class: claseComp}).appendTo('#' + row);
		console.log('contenedor '+'#inf0'+itm.informeId+'_Cor');
		$('#inf0'+itm.informeId+'_Cor').css({'width':'30px'});
		
		a++;
		// Cierre
		var rowcol='inf0'+(i+1)+'_'+periodos[a];
		jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
		objeto=	"<img id='inf0"+i+'_p'+itm.idCie+'Cie'+"' src='"+itm.imageCie+"' class='img18 pi"+itm.idCie+"' aria-describedby='ui-tooltip-8' />";
		if(itm.imageCie != "images/blanco.png")
		{
		 objeto=	"<input type='checkbox' id='inf0"+i+"_p_Cie' name='check'>";
		}
		$('#' + rowcol).append(objeto);
	
		if(itm.pejrCie != null){
			
			$("#per"+a).val(itm.pejrCie);
		}
		
		
	});
/*	$.each(xml.listaInformeConCorrecciones, function(i, itm) {
		var param=$("#cbEjercicio option:selected").val()+','+itm.informeId+',"'+$('#inf0'+itm.informeId).text()+'","'+$("#cbEjercicio option:selected").text()+'"';
		console.log(param);
		var objeto="<a class='gbgt gbes' id='gbg3' onclick='verComplementosEnviados("+param+")'><div id='gbgs3'><span id='gbi3'>Ver</span></div></a>";
		$(objeto).appendTo('#inf0'+itm.informeId+'_Cor');
		
	});	*/
	console.log('fin xml');
	document.getElementById('fade').style.display='none';
	document.getElementById('formEnvio').style.display='none';
}

function loadPeriodo(){
	
	$('#textoCargando').text('Cargando Periodos');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	console.log('paso 1');
	
	var accion = 'getStateInfAnualUsers?tipoInfId=' + $("#cbtipoInformeCorrec option:selected").val() + 
		'&ejercicioId=' + $("#cbEjercicioAnoCorrec option:selected").val()+
		'&ejercicioName=' + $("#cbEjercicioAnoCorrec option:selected").text();
		
	$('.rwEncInf').text('');
	//limpia contenedor
	$('#contEstInfAnual').text('');
	
	$.ajax({
		url: accion,
		type: "POST",
		dataType:"json",
		error: function(XMLHttpRequest, textStatus, errorThrown){
			document.getElementById('fade').style.display='none';
	    	document.getElementById('formEnvio').style.display='none';
		},
	    success: function(data){
			document.getElementById('fade').style.display='none';
	    	document.getElementById('formEnvio').style.display='none';
	    	
	    	console.log('data : ' + data);
	    	console.log(data);
	    	actualizarGrillaInformesJSON(data, $("#cbEjercicio option:selected").val() );
	    }
	});
 }

function loadRegionByPeriodo(){	
	$('.rwEncInf').text('');
	//limpia contenedor
	$('#contEstInfAnual').text('');
	$('#textoCargando').text('Cargando Regiones');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	 var action = 'getRegionesByPeriodo.action';
	$.ajax({
		 url: action,
		    type: "POST",
		    dataType: "json",
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    	console.log('Error ' + textStatus);
		    	console.log(errorThrown);
		    	console.log(XMLHttpRequest.responseText);
		    },
		    success: function(data){
				
		    	//$('#cbRegionCorrec').removeAttr('disabled');
	  	    	$('#cbComunaCorrec').empty();
    	    	$("#cbComunaCorrec").get(0).options[$("#cbComunaCorrec").get(0).options.length] = new Option( 'Selec. Comuna',-1);
    	    	$('#cbRegionCorrec').empty();
    	    	$("#cbRegionCorrec").get(0).options[$("#cbRegionCorrec").get(0).options.length] = new Option( 'Selec. Region',-1)
    	    	$.each(data.listaRegiones, function(i, itm) {
    	    		$("#cbRegionCorrec").get(0).options[$("#cbRegionCorrec").get(0).options.length] = new Option(itm.nombre, itm.regId);                
                });
    	    	document.getElementById('fade').style.display='none';
		    	document.getElementById('formEnvio').style.display='none';
		    }
		});
}

function realizaReglasCarga(form, idInf ){
	console.log('menuPrincipal.js : realizaReglasCarga');
	
	document.getElementById('fade').style.display='none';
	document.getElementById('formEnvio').style.display='none';
	var archivo = "fileUpload0";
	switch(idInf){
		case 1: archivo = archivo + 1; break;
		case 2: archivo = archivo + 2; break;
		case 3: archivo = archivo + 3; break;
		case 4: archivo = archivo + 4; break;
		case 5: archivo = archivo + 5; break;
		case 6: archivo = archivo + 6; break;
		case 7: archivo = archivo + 7; break;
		case 8: archivo = archivo + 8; break;
	};
	
	
	if ($("#"+archivo) == ''){  return false; }
	$("body").css("cursor", "wait");
	
	/* No deben manejarse los idInformes en javaScript
	 * 
	var tipoInforme=1; var periodo=-1;
	if($("#cbPeriodos").attr('disabled') == 'disabled'){ tipoInforme = 2; periodo = $("#cbComplPeriodos option:selected").val(); }
	else{  tipoInforme = 1; periodo = $("#cbPeriodos option:selected").val(); }
	
	if (periodo < 0){
		jAlert('Debe seleccionar un periodo valido para el informe', "Carga Archivos");
		$("body").css("cursor", "default");
		return false;
	} */
	
	$('#textoCargando').text('Subiendo Archivo');
	$('#estadoForm').text('');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action = 'uploadFile.action?inf=' + idInf + '&periodo=' +  periodo + '&tipoInforme=' + tipoInforme;	
	console.log(action);
	console.log("Form: #" + form);
	
	if( $('#'+archivo)[0].files[0].size > 524288){
		jAlert('Sr Usuario el archivo no puede tener un tama\u00F1o superior al permitido.', 'Carga de archivos');
		document.getElementById('fade').style.display='none';
		document.getElementById('formEnvio').style.display='none';
		$("body").css("cursor", "default");
		return false;
	}
	
	$.ajaxSetup({ scriptCharset: "windows-1252" , contentType: "application/json; charset=windows-1252"});
	$("#" + form).ajaxSubmit({
		cache : false,
		type: "POST",
		url: action,
		scriptCharset: 'windows-1252',
		contentType: "application/x-www-form-urlencoded;charset=windows-1252",
		jsonpCallback: 'jsonpCallback',
		data: $(this).serialize(),
		dataType:'json',
		sizeLimit: (15000 * 1024),
		complete:function( XMLHttpRequest ) {
			$("body").css("cursor", "default");
		},		
		success: function(data){
			console.log('Exito');
			console.log(data);
			//actualizaObjetosPorCarga(data, idInf, periodo);
			
			$("body").css("cursor", "default");
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
		},
		onError: function (a, b, c, d) {
			jAlert('Ocurrio un problema al subor el archivo', "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );
        }
	 });	
}
