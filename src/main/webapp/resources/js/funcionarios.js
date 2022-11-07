function loadRegion(){
	$('#cbRegion').removeAttr("disabled");
	$('#cbRegion').val(-1);
	$("#cbComuna").get(0).options.length = 0; $("#cbComuna").get(0).options[0] = new Option("Selec. Comuna", "-1");
	$('#cbComuna').attr("disabled", "disabled");
}
function loadComuna(region){
	var action='getComunaById?regId='+region;
	$.ajax({
		 url: action,
			type: "POST",
			dataType: "json",
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				console.log(data);
				switch(data.estado){
					case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='correcciones.action');}} );break;
					case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='correcciones.action');}} );break;
					case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
				}
				
				$("#cbComuna").get(0).options.length = 0; $("#cbComuna").get(0).options[0] = new Option("Selec. Comuna", "-1"); 
				$.each(data.listaEntidad, function(i, item){$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option(item.nombre, item.entId);});
				
				if(data.listaEntidad.length>0){ 
					$('#cbComuna').removeAttr("disabled"); 
				}else{ 
					$('#cbComuna').attr("disabled", "disabled");
				}
			}
	});
}
$(document).ready(function() {

});
function muestraCorrecion(objeto){
	var action='loadCorreccion?corr='+$(objeto).attr('id').replace('mCorr_','');
	$.ajax({
	url: action,
	type: "POST",
	dataType: "json",
	error: function(XMLHttpRequest, textStatus, errorThrown){
		alert('Error ' + textStatus);
		alert(errorThrown);
		alert(XMLHttpRequest.responseText);
	},
	success: function(data){
		switch(data.estado){
			case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
			case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
			case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
		}
		console.log(data);
		
		$('body').append('<div id="fadeComp" class="overlay" ></div>'+
				 '<div id="formComplemento" class="contenedorEnvio modal" style="left:12%; width:800px;height:470px;">'+
				 
				 '		<div style="clear: both; font: bold 14px sans-serif;float:left;" >COMPLEMENTO N&deg; '+$(objeto).attr('id').replace('mCorr_','')+'</div>'+
				 '		<img src="images/close.png" class="icoImage25" style="float:right;" onclick="cierraComplementos()" ></img>'+
				 '		<div id="comuna" style="clear: both; font: bold 14px sans-serif;" ></div>'+
				 '      <table id="tblDatosCorr" class="tabla" style="width:300px;margin:20px;float:left;border:none;">'+
				 '		<tr><td style="background-color:#F8F8F8;">Periodo</td><td style="background-color:#D7D7D9;;"><div id="periodo" style="clear: both; font: normal 12px sans-serif;"></div></td></tr>'+
				 '		<tr><td style="background-color:#F8F8F8;">Usuario</td><td style="background-color:#D7D7D9;"><div id="usuario" style="clear: both; font: normal 12px sans-serif;"></div></td></tr>'+
				 '		<tr><td style="background-color:#F8F8F8;">Fecha Creaci&oacute;n</td><td style="background-color:#D7D7D9;"><div id="creacion" style="clear: both; font: normal 12px sans-serif;"></div></td></tr>'+
				 '		<tr><td style="background-color:#F8F8F8;">Fecha Desde</td><td style="background-color:#D7D7D9;"><div id="fechaDesde" style="clear: both; font: normal 12px sans-serif;"></div></td></tr>'+
				 '		<tr><td style="background-color:#F8F8F8;">Fecha Hasta</td><td style="background-color:#D7D7D9;"><div id="fechaHasta" style="clear: both; font: normal 12px sans-serif;"></div></td></tr>'+
				 '		</table>'+
				 '  	'+
				 '  	<div id="archivo" style="font: bold 10px sans-serif;float:right;margin:70px 123px 10px 0px;"></div>'+
	 			 ' 			<table id="tblCorrecciones" class="tabla" style="width:700px;margin:20px;">'+
				 ' 				<thead style="display:block;">'+
				 '					<tr class="rw_cabecera">'+
				 '						<td style="width:360px;padding:10px;">Informe</td>'+
				 '						<td style="width:140px;padding:10px;">Archivo Asociado</td>'+					
				 '						<td style="width:200px;padding:10px;">Estado</td>'+
				 '      			</tr>'+
				 '      		</thead>'+
				 '      		<tbody style="height:100px; overflow-y:scroll; display:block;font: normal 12px arial;">'+
				 '      		</tbody>'+
				 '			</table>'+
				 '  	<div id="Contcomentario" style="clear:both; font: bold 12px sans-serif;">Comentario</div>'+
				 '  	<div id="comentario" class="areaTxt" style="clear:both; width:700px;height:90px;overflow-x:hiden;overflow-y:auto;"></div>'+
				 '</div>');
		
		console.log(data.regCorr.length);
		$.each(data.regCorr, function(i, item) {
			$('#comuna').text(item.comuna);
			$('#periodo').text(item.periodo);
			$('#fechaDesde').text(item.fechaInicio);
			$('#fechaHasta').text(item.fechaFin);
			$('#usuario').text(item.usuario);
			$('#creacion').text(item.fecha);
			$('#comentario').text(item.comentario);
			
			//console.log(item.urlFile);
			
			if (item.urlFile){
				console.log('Existe Archivo');
				$('#archivo').html('<a href="descargaCorreccion.action?corr='+$(objeto).attr('id').replace('mCorr_','')+'" ><img src="images/descarga_archivo.png" style="float:right;width:140px;height:35px;"></img></a>');
			}else{
				console.log('Existe No Archivo');
				$('#archivo').text('');
			}
			
			$.each(this.informes, function(a, itm) {
				if(a%2==0){clase='rwdetInfPar';}else{clase='rwdetInfImp';}
				var tr= '<tr id="secInf'+a+'" class="'+clase+'" style="font: 10px arial;">' +
						'<td style="width:325px;padding:0 5px;"><label id="nom_inf_'+a+'">'+itm.informeNombre+'</label></td>'+
						'<td style="width:148px;"><label id="arc_inf_'+a+'">'+itm.informeArchivo+'</label></td>'+
						'<td style="width:170px;"><label id="est_inf_'+a+'">'+itm.informeEstado+'</label></td>'+
						'</tr>';
			    console.log(tr);
			    $('#tblCorrecciones > tbody').append(tr);
			  //  $("#lista > tbody>tr:first").after("<tr><td>some</td><td>content</tr></tr>");
			});
			
        });
    	$('body').css('cursor', 'default');
		$('#fadeComp').show();
		$('#formComplemento').show();
		
		//if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
	}
	});
}
function respaldoComplemento(correcion){
	$.ajax({
		 url: 'descargaCorreccion.action?corr='+correcion,
			type: "POST",
			dataType: "html",
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},
			success: function(data){
				switch(data.estado){
					case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
					case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
					case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
				}
				console.log(data);
				$('#correccionesTable > tbody').text('');
				
				console.log(data.correccion.length);
				
				if(data.correccion.length==0){$('#correccionesTable > tbody:last').append('<tr  style="display:table-row;"><td colspan="5" class="rwdetInfPar" style="display:table-cell;">No hay Correcciones para el filtro seleccionado</td></tr>');}
				$.each(data.correccion,function(i,item){
					var informes='';
					$.each(this.informes,function(a,itm){
						informes=informes+itm.informeNombre+'<br>';
					});
					if ((i+1) %2 == 0){ clase= "rwdetInfImp"; }else{ clase= "rwdetInfPar";}
					$('#correccionesTable > tbody:last').append('<tr class="'+clase+'" style="display:table-row;"><td>'+item.comuna+'</td><td id="'+item.correccionId+
						'" class="popUp"><div id="mCorr_'+item.correccionId+'" onclick="muestraCorrecion(this)">'+item.periodo+'<div></td><td>'+item.fechaInicio+
						'</td><td>'+item.fechaFin+'</td><td>'+item.usuario+'</td>'+'<td><img>'+item.usuario+'</td><td style="display:none"><div id=rw_'+item.correccionId+'>'+informes+'</div></td></tr>');
				});
				
				//if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
			}
	});
}
function cierraComplementos(){
	$('#fadeComp').remove();
	$('#formComplemento').remove();
}
$(document).ready(function() {
	$(".popUp").live({
		mouseenter: function(){
			$('body').append("<div class='ui-tooltip-content' style='width:450px;position:absolute; left:330px;'>"+ 
					"<div class='tooltip-title'>Informes Habilitados para correcci&oacute;n</div>"+
					"<div class='tooltip-content'>"+
					$('#rw_'+$(this).attr('id')).html()+"</div></div>");
			izq=0;
			top=0;
			if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
			else{							izq=$(this).offset().left-450;}
			
			if ($(this).offset().top>820){	top=$(this).offset().top-10;}
			else{							top=$(this).offset().top-20;}
			
			$('.ui-tooltip-content').css({left:parseInt($(this).offset().left+50),top: parseInt($(this).offset().top-(parseInt($('.ui-tooltip-content').css('height'))-20))});
		},
		mouseleave: function(){
			$('div').remove('.ui-tooltip-content');
		}
	});
});
function loadData(){
	var action='loadListCorreccion?tipoInforme='+$("#TipoInforme :selected").val()+
				'&ejercicio='+$("#cbEjercicioC1 :selected").val()+
				'&regionId='+$("#cbRegion :selected").val()+'&comunaId='+$("#cbComuna :selected").val();
	$.ajax({
		 url: 'loadListCorreccion',
			type: "POST",
			dataType: "json",
			data:{
				tipoInforme:$("#TipoInforme :selected").val(),
				ejercicio:$("#cbEjercicioC1 :selected").val(),
				regionId:$("#cbRegion :selected").val(),
				comunaId: $("#cbComuna :selected").val()
			},error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('Error ' + textStatus);
				alert(errorThrown);
				alert(XMLHttpRequest.responseText);
			},success: function(data){
				switch(data.estado){
					case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
					case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
					case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
				}
				console.log(data);
				$('#correccionesTable > tbody').text('');
				
				console.log(data.Records.length);
				
				if(data.Records.length==0){$('#correccionesTable > tbody:last').append('<tr  style="display:table-row;"><td colspan="5" class="rwdetInfPar" style="display:table-cell;width:770px;">No hay Correcciones para el filtro seleccionado</td></tr>');}
				$.each(data.Records,function(i,item){
					var informes='';
					var hayProc=0;
					$.each(this.informes,function(a,itm){
						informes=informes+itm.informeNombre+'<br>';
						if((itm.informeEstadoId==6)||(itm.informeEstadoId==7)||(itm.informeEstadoId==10)){
							hayProc++;
						}
					});
					if ((i+1) %2 == 0){ clase= "rwdetInfImp"; }else{ clase= "rwdetInfPar";}
					console.log('hayProc: '+hayProc);
					
					var estadoinf='<td style="width:18px;"></td>';
					if(hayProc==0){
						estadoinf='<td class="colDel"><img id="delCorr'+i+'" src="images/eliminar.png" alt="descripción" class="imgDel" onclick="delCorreccion('+item.correccionId+')" /></td>';
					}
						
					$('#correccionesTable > tbody:last').append('<tr class="'+clase+'" style="display:table-row;">'+
							'<td class="colCom">'+item.comuna+'</td>'+
							'<td id="'+item.correccionId+'" class="colPer popUp"><div id="mCorr_'+item.correccionId+'" onclick="muestraCorrecion(this)">'+item.periodo+'<div></td>'+
							'<td class="colFIn">'+item.fechaInicio+'</td>'+
							'<td class="colFFn">'+item.fechaFin+'</td>'+
							'<td class="colUsr">'+item.usuario+'</td>'+
							estadoinf+
							'<td style="display:none"><div id=rw_'+item.correccionId+'>'+informes+'</div></td></tr>');
				});
				
				//if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
			}
	});
}

function delCorreccion(corr){
	
	//var message='¿Está seguro que desea eliminar la Corrección?  ';
	//var titulo='Anulación de Corrección';
	//var cancel='Se ha cancelado la operacion ';
	
	var message='&iquest;Est&aacute; seguro que desea eliminar la Correcci&oacute;n?  ';
	var titulo='Anulaci&oacute;n de Correcci&oacute;n';
	var cancel='Se ha cancelado la operaci&oacute;n ';
	//jConfirm('&iquest;Est&aacute; seguro que desea eliminar la Correcci&oacute;n?  ', 'Anulación de Corrección');
	
	
	jConfirm(message, titulo, function(r) {
		if(r) {
			$("body").css("cursor", "wait");
			$('body').append('<div id="fadeDelCorreccion" class="overlay" style="display:block"></div>'+
					 '<div id="popEsperaDelCorreccion" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
					 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
					 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					 '</div>');
			
			$('#fadeDelCorreccion').show();
			$('#popEsperaDelCorreccion').show();
			
			$('#estadoForm').text('');
			var action = 'deleteCorrection.action?correccion='+corr;
			$.ajax({url: action,
			    type: "POST",
			    dataType: "json",
			    error: function(XMLHttpRequest, textStatus, errorThrown){
					$("body").css("cursor", "default");
					$('#fadeDelCorreccion').remove();
					$('#popEsperaDelCorreccion').remove();
			    },
			    success: function(data){
			    	
			    	jAlert(data.inf.informeMensaje,'Eliminar Correccion');
			    	loadData();
			    	$("body").css("cursor", "default");
			    	$('#fadeDelCorreccion').remove();
					$('#popEsperaDelCorreccion').remove();
			    }
			});
			
			
		}else{
			jAlert(cancel,titulo);
		} 
	});
} 
