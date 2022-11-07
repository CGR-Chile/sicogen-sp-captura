var listaejercicio  = new Array(); 
var imprime  = new Array();
function abreCargaManual(idinforme, param){
	var opc='left=50,top=50,width=1250,height=640,toolbar=0,resizable=1';
	var url='chargeInforme';
	switch(idinforme){
		case 1:url=url+'PI';break;case 2:url=url+'AP';break;case 3:url=url+'II';break; case 4:url=url+'IP';break;
		case 5:url=url+'AG';break;case 6:url=url+'AN';break;case 7:url=url+'DP';break; case 8:url=url+'AI';break;
	}
	
	$.ajax({url: url, type: "POST", dataType: "html",data:param,
		beforeSend: function (xhr) {
			$('body').append('<div id="fadeCargaManual" class="overlay" style="display:block"></div>'+
				 '<div id="popCargaManual" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
				 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
				 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
				 '</div>');
		},complete: function (data) {
			$('#popCargaManual').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			$("body").css("cursor", "default");
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },success: function(data){
	    	$('body').append('<div id="popCargaManual" class = "contenedorEnvioArchivo modalCarga" style="display:block;left:5%;top:2%;position:absolute;width:1075px;height:600px;z-index:2005;padding:15px !important">'+ 
	   			 '    <div id="cerrar" style="float:rigth;">'+
	   			 '		 <img src="images/close.png" class="icoImage25" style="float:right;border: 0px none;" onclick="cierraCargaManual()"></img>'+
	   			 '	  </div>'+
	   			 '	  <div id ="contCargaManual" style="width:97%;height:550px;border:0px none;float:left;"></div>'+
	   			 '</div>');
	    	
	    	
	    	$('#contCargaManual').html(data);
	    	$('#popCargaManual').show();
	    }
	});
}
function cierraCargaManual(){
	$('#fadeCargaManual').remove();
	$('#popCargaManual').remove();
}
function cierraReporteCuadratura(){
	$('#fade').remove();
	$('#fadeRC').remove();
	$('#popup1').remove();
}
function cargaManual(idinforme){
	var periodo;
	if($("#cbPeriodos").attr('disabled')=='disabled'){
		periodo=$("#cbComplPeriodos option:selected").val();
		param={ tpArchivo: 	2,
				tpInforme:	$("#cbTipoInformes option:selected").val(),
				inf:		idinforme,
				ejr:		$("#cbComplPeriodos option:selected").text().substr(0,4),
				per:		$("#cbComplPeriodos option:selected").val(), 
				glsPer:		$("#cbComplPeriodos option:selected").text().substr(7), 
				glsEjr: 	$("#cbComplPeriodos option:selected").text().substr(0,4)
			};
	}else{
		periodo=$("#cbPeriodos option:selected").val();
		param={ tpArchivo: 	0,
				tpInforme:	$("#cbTipoInformes option:selected").val(),
				inf:		idinforme,
				ejr:		$("#cbEjercicio option:selected").val(),
				per:		$("#cbPeriodos option:selected").val(), 
				glsPer: 	$("#cbPeriodos option:selected").text(), 
				glsEjr: 	$("#cbEjercicio option:selected").text()
		};
	}
	if (periodo < 0){ jAlert('Debe seleccionar un periodo valido para el informe', "Carga Manual"); $("body").css("cursor", "default"); return false; }	

	$.ajax({
		url: 'validaCargaManual.action', 
		type: "POST", 
		dataType: "json",
		data:param,
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$("body").css("cursor", "default");
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
			document.getElementById('formEnvio').style.display='none';
			$("body").css("cursor", "default");
	    	if ((data.estado==-1)||(data.estado==-2)) { if (data.estado==-1){ url='login';}else{ url='showFormCarga.action?abreCarga=0';} 
	    			jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url);}} ); }
	    	document.getElementById('fade').style.display='none';
	    	
	    	switch(data.estado){
	    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
	    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
	    	}
	    	
	    	console.log(data);
	    	$('#inf0'+idinforme+'_filename').val( data.nombreArchivo );
	    	
	    	$('#inf0'+idinforme+'_respCarga').attr( 'src',data.imgCarga );
	    	$('#2Inf0'+idinforme+'_respCarga').attr( 'src',data.imgCarga );
	    	
	    	$('#inf0'+idinforme+'_State').text(data.estado);
	    	$('#2inf0'+idinforme+'_State').text(data.estado);
	    	
			var texto=data.mensaje;
			texto= texto.split("correcto|").join(""); texto=texto.split("Correcto|").join(""); texto= texto.split("|Correcto").join(""); texto= texto.split("correcto |").join(""); texto= texto.split("Correcto |").join("");
			var errores=texto.split('|');			

			var mensaje='';
			$.each( errores, function( i, value ) { if (i%2 == 0){ mensaje=mensaje+'<div class="errorPar">'+value+'</div>'; }else{ mensaje=mensaje+'<div class="errorImpar">'+value+'</div>';}});
			$('#Ainf0'+idinforme+'_cel12').html( mensaje ); $('#Minf0'+idinforme+'_cel12').html( mensaje );
			
			var fila=''; var fila2='';
			if((data.estado==1)||(data.estado==2)){ fila='<div id="inf0'+idinforme+'_mensajes">Carga Exitosa</div>'; fila2='<div id="2inf0'+idinforme+'_mensajes">Carga Exitosa</div>';}
			else{ fila='<div id="inf0'+idinforme+'_mensajes">Errores en la carga</div>'; fila2='<div id="2inf0'+idinforme+'_mensajes">Errores en la carga</div>';}
			$('#inf0'+idinforme+'_cel06').html('');  $('#inf0'+idinforme+'_cel06').append(fila); $('#2inf0'+idinforme+'_cel06').html(''); $('#2inf0'+idinforme+'_cel06').append(fila2);

			if((data.estado==3)||(data.estado==2)){
				$('#inf0'+idinforme+'_mensajes').attr('onclick','verErroresCarga('+idinforme+')');  $('#inf0'+idinforme+'_mensajes').css('cursor','pointer');
				$('#2inf0'+idinforme+'_mensajes').attr('onclick','verErroresCarga('+idinforme+')'); $('#2inf0'+idinforme+'_mensajes').css('cursor','pointer');
			}
			if((data.estado==1)||(data.estado==2)){ abreCargaManual(idinforme, param); }
			$('#inf0'+idinforme+'_validCarga').attr('src', data.imgBlanca ); $('#inf0'+idinforme+'_Reportvalid').attr('src', data.imgBlanca ); $('#inf0'+idinforme+'_Reportvalid').attr('onchange', data.urlReporte );	    	
	    }
	});
	
}
	
	function verReporteValidacion(idReporte){
		var tpInforme=0;
		var periodo;
		var ejercicio = $("#cbEjercicio option:selected").text();
		if($("#cbPeriodos").attr('disabled') == 'disabled'){ periodo=$("#cbComplPeriodos option:selected").val();tpInforme=periodo; }
		else{ tpInforme=0; periodo = $("#cbPeriodos option:selected").val(); }
		
		var parametro='periodo='+periodo+'&tpInforme='+tpInforme+'&glosaEjercicio='+ ejercicio;
		var opciones='left=50,top=50,width=1235,height=600,toolbar=0,resizable=0,scrolling=auto, scrollbars=yes';
		switch (idReporte){
			case 1: window.open("getValidacionInformePI.action?"+parametro,"Browse",opciones); break;
			case 2: window.open("getValidacionInformeAP.action?"+parametro,"Browse",opciones); break;
			case 3: window.open("getValidacionInformeII.action?"+parametro,"Browse",opciones); break;
			case 4:	window.open("getValidacionInformeIP.action?"+parametro,"Browse",opciones); break;
			case 5: window.open("getValidacionInformeAG.action?"+parametro,"Browse",opciones); break;
			case 6: window.open("getValidacionInformeAN.action?"+parametro,"Browse",opciones); break;
			case 7: window.open("getValidacionInformeDP.action?"+parametro,"Browse",opciones); break;
			case 8: window.open("getValidacionInformeAI.action?"+parametro,"Browse",opciones); break;
			case 9: window.open("getValidacionInformeBD.action?"+parametro,"Browse",opciones); break;
		}
	}
	
	function showContent(idTab){
		if ("01" == idTab){
			$('#TabbedPanelsTab' + "02").removeClass('TabbedPanelsTabSelected');
			$('#TabbedPanelsContent' + "02").css({'display':'none'});
			$('#TabbedPanelsTab' + "01").addClass('TabbedPanelsTabSelected');
			$('#TabbedPanelsContent' + "01").css({'display':'block'});
		}else{
			$('#TabbedPanelsTab' + "01").removeClass('TabbedPanelsTabSelected');
			$('#TabbedPanelsContent' + "01").css({'display':'none'});
			$('#TabbedPanelsTab' + "02").addClass('TabbedPanelsTabSelected');
			$('#TabbedPanelsContent' + "02").css({'display':'block'});
		}
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