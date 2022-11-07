var aCtasPresup=new Array();
var vlistAreas;
var vlistCtas;
var tAumento=0;
var tDisminucion=0;
var descuentoAux=0;
var aumentoAux=0;;
var tempAum=0;
var tempDis=0;


$.strPadRight = function(i,l,s) {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = o + s;
	}
	return o;
};
$.strPadLeft = function(i,l,s) {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = s + o;
	}
	return o;
};
$(document).ready(function () {
	$('#new').click(function (){
		$('#lineaId').text(0);
		$('#txtArea').val("");
		$('#DenomArea').val("");
		$('#txtCodigo').val("");
		$('#txtDenominacion').val("");
		$('#txtDebito').val(0);
		$('#txtCredito').val(0);
		tempAum=0;
		tempDis=0;
	});
	
	$('#add').click(function (){
		var vtitulo="Error";
		var vCuentaInv='Debe ingresar una cuenta contable v&aacute;lida';
		var vDebInv='El valor de debito no es numerico';
		var vCredInv='El valor de credito no es numerico';
		var vDeuInv='El valor de Saldo Deudor aumento no es numerico';
		var vAcrInv='El valor de Saldo Acreedor no es numerico';
		
		if($("#txtCodigo").val()==null || $("#txtCodigo").val()=="" || getObjects(vlistCtas, 'cuentaCod', $("#txtCodigo").val())==false){
			jAlert(vCuentaInv,vtitulo);
			return;
		}
		if($.isNumeric($('#txtDebito').val())==false){
			jAlert(vDebInv,vtitulo);
			return;
		}
		if($.isNumeric($('#txtCredito').val())==false){
			jAlert(vCredInv,vtitulo);
			return;
		}
		if($.isNumeric($('#txtDeudor').val())==false){
			jAlert(vDeuInv,vtitulo);
			return;
		}
		if($.isNumeric($('#txtAcreedor').val())==false){
			jAlert(vAcrInv,vtitulo);
			return;
		}
		
		
		
		if($("#cbPeriodos").attr('disabled') == 'disabled'){ 
			tipoArchivo=2; 
			periodo=$("#cbComplPeriodos option:selected").val(); 
		}else{
			tipoArchivo=0;
			periodo=$("#cbPeriodos option:selected").val(); 
		}
		
		newAum=parseFloat($('#Tdebito').val() )+ (parseFloat($('#txtDebito').val()-tAumento));
		newDis=parseFloat($('#Tcredito').val())+ (parseFloat($('#txtCredito').text()-tDisminucion));
		
		cant=parseFloat($('#Registros').val());
		if (parseInt($('#fileId').text())===0){
			cant++;
		}
		$('#Registros').val(cant);
		$.ajax({url: 'saveLineFile.action',
		    type: 'POST',
		    dataType: 'json',
		    data:{
		    	fileId:	$('#fileId').text(),
		    	cabId:	$('#cabId').text(),	
		    	cabLine:'1'+
		    			$('#periodo').val()+
		    			'00'+$('#muni').val()+'01'+
						'CLP'+
						$.strPadRight($('#rut').val().substring(0, 9),9,'0')+
						$.strPadRight($('#dv').val().substring(0, 1),1,'0')+
						$.strPadLeft(cant,9,0)+
						$.strPadLeft(newAum,16,0)+
						$.strPadLeft(newDis,16,0),
				detId:	$('#lineaId').text(),
		    	detLine:'00'+$('#muni').val()+'01'+
		    			$('#entRegion').val()+
		    			$('#txtCodigo').val()+
		    			$.strPadLeft($('#txtDebito').val().substring(0, 16),16,0)+
		    			$.strPadLeft($('#txtCredito').val().substring(0, 16),16,0)+
		    			$.strPadLeft($('#txtDeudor').val().substring(0, 16),16,0)+
		    			$.strPadLeft($('#txtAcreedor').val().substring(0, 16),16,0)+
		    			$.strPadRight($('#txtDenominacion').val().substring(0, 80),80,' '),
		    	tpFile:	 tipoArchivo,
		    	periodo: periodo,
		    	informe: $('#infId').text(),
		    },error: function(data){
		    	alert("Ocurrio un problema insertaCabecera");
		    	document.getElementById('fade').style.display='none';
			    document.getElementById('formEnvio').style.display='none';
		    },success: function(data){
		    	jAlert(data.mensaje,'Guardar Registro');
				if(data.estado>0){
					$('#Registros').val(cant);
					if($("#lista tbody tr").length>0){
						if ($("#lista tbody tr")[0].classList[1]==='rw_DetImp') {clase='rw_DetPar'; }else{ clase='rw_DetImp';}
						newAddRow='#ListaItem tbody:first';
					}else{
						clase='rw_DetImp';
						newAddRow='#ListaItem tbody';
					}
					if(parseInt($('#fileId').text())===0){
						$('#fileId').text(data.linea.fileId);
						$('#cabId').text(data.linea.cabId);
					}
					
			    	$(newAddRow).append('<tr id="row'+data.linea.lineaId+'" class="regDetalle '+clase+'">'+							
							'<td id="dtCuenta" >'+data.linea.linea.substring(10,16)+'</td>'+
							'<td id="dtDenomin" style="text-align:left;">'+data.linea.linea.substring(80,159)+'</td>'+
							'<td id="dtDebito" >'+data.linea.linea.substring(16,32)+'</td>'+
							'<td id="dtCredito" >'+data.linea.linea.substring(32,48)+'</td>'+
							'<td id="dtDeudor" >'+data.linea.linea.substring(48,64)+'</td>'+
							'<td id="dtAcreedor" >'+data.linea.linea.substring(64,80)+'</td>'+
							'<td id="dtlinea" style="display:none;">'+data.linea.linea+'</td>'+
							'<td id="dtBotones">'+
								'<img id="edt'+data.linea.lineaId+'" src="images/edititem.png" alt="descripción" class="img25"/>' +
								'<img id="del'+data.linea.lineaId+'" src="images/delete.png" alt="descripción" class="img25"/></td>'+
							'</tr>');
			    	
			    	
			    	$('#row'+data.linea.lineaId).find('td#dtBotones #edt'+data.linea.lineaId).click(function (){
			    		jConfirm('&iquest;Est&aacute; seguro que desea editar el registro?', 'Editar Registro', function(r) {
							if(r){
					    		$('#lineaId').text(data.linea.lineaId);
					    		$('#txtCodigo').val(data.linea.linea.substring(10,16));
					    		$('#txtDenominacion').val(data.linea.linea.substring(80,159));
					    		$('#txtDebito').val(parseFloat(data.linea.linea.substring(16,32)));
					    		$('#txtCredito').val(parseFloat(data.linea.linea.substring(32,48)));
					    		$('#txtDeudor').val(parseFloat(data.linea.linea.substring(48,64)));
					    		$('#txtAcreedor').val(parseFloat(data.linea.linea.substring(64,80)));
					    		if(!$.isNumeric(data.linea.linea.substring(16,32) )){
					    			tempAum=0;
					    		}else{
					    			tempAum=data.linea.linea.substring(16,32);
					    		}
					    		if(!$.isNumeric(data.linea.linea.substring(32,48) )){
					    			tempDis=0;
					    		}else{
					    			tempDis=data.linea.linea.substring(32,48);
					    		}
							}
			    		});
			    		
			    	});
			    	
			    	$('#row'+data.linea.lineaId).find('td#dtBotones #del'+data.linea.lineaId).click(function (){
			    		jConfirm('&iquest;Est&aacute; seguro que desea eliminar el registro?', 'Eliminar Registro', function(r) {
							if(r){
								console.log($(this));
								console.log($('#row'+data.linea.lineaId+' #dtDebito').text());
								rowid=data.linea.lineaId;
								$.ajax({url: 'deleteLineFile.action',
									type:'POST',dataType:'json',
									data:{	cabId:	data.linea.cabId,
											detId:	data.linea.lineaId,
											cabLine:'1'+
													'00'+$('#muni').val()+'01'+
													$('#periodo').val()+
													$.strPadRight($('#entCom').val().substring(0, 20),20,' ')+
													'CLP'+
													$.strPadRight($('#rut').val().substring(0, 20),20,' ')+
													$.strPadRight($('#dv').val().substring(0, 20),20,' ')+
													$.strPadLeft(parseInt($('#Registros').val()-1),9,0)+
													$.strPadLeft(parseFloat($('#Tdebito').val()-parseFloat($('#row'+rowid+' #dtDebito').text())),16,0)+
													$.strPadLeft(parseFloat($('#Tcredito').val()-parseFloat($('#row'+rowid+' #dtCredito').text())),16,0)				
									},beforeSend: function (xhr){
										$('body').append('<div id="fadeDeleteLine" class="overlay" style="display:block"></div>'+
												'<div id="waitDeleteLine" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
												' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Eliminado Linea</div>'+
												' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
												'</div>');
									},complete: function (data) {
										$('#fadeDeleteLine').remove();
										$('#waitDeleteLine').remove();
									},success: function(data){
										jAlert(data.mensaje,'Eliminar Registro');
										if(data.estado>0){
											$('#Registros').val($.strPadLeft(parseInt($('#Registros').val()-1),9,0));
											$('#Tdebito').val($.strPadLeft(parseFloat($('#Tdebito').val()-parseFloat($('#row'+rowid+' #dtDebito').text())),16,0));
											$('#Tcredito').val($.strPadLeft(parseFloat($('#Tcredito').val()-parseFloat($('#row'+rowid+' #dtCredito').text())),16,0));
											if(data.estado==2){
												$('#fileId').text(0);
												$('#cabId').text(0);
											}
											$('#row'+rowid).remove();
											$('#new').trigger( "click" );
										}
									}
								});
							}
			    		});
			    	});
			    	
			    	$('#Tdebito').val( newAum );
			    	$('#Tcredito').val(newDis );
			    	$('#new').trigger( "click" );
				}
		    }
		});
	});
	
	$('body').css('cursor', 'wait');
	/*
	$.ajax({url: 'getAreasSubAreasById.action',
		type:'POST',dataType:'json',
		beforeSend: function (xhr){
			$('body').append('<div id="fadeAreasSubareas" class="overlay" style="display:block"></div>'+
			'<div id="waitAreasSubareas" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
			' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando las areas y sub areas</div>'+
			' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
			'</div>');
		},complete: function (data) {
			$('#fadeAreasSubareas').remove();
			$('#waitAreasSubareas').remove();
		},success: function(data){
	    	switch(data.estado){
		    	case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='home'); return false;}} );break;
		    	case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');return false;}} );break;
	    	}
	    	$('#popCargaManual').append('<div id="contTblAreas"></div>');
	    	$('#contTblAreas').append('<table id="tblAreas" class="tablaAreas" style="display:none;"><thead><tr><th>N&deg;</th><th>Codigo</th><th>Denominaci&oacute;n</th></tr></thead><tbody></tbody></table>');
	    	vlistAreas=data.lAreas;
	    	$('#tblAreas tbody').empty();
	    	
	    	$.each(data.lAreas, function(i, itm) {
	    		if (i%2===0) {clase='rw_DetPar'; }else{ clase='rw_DetImp';}
	    		
	    		$("#tblAreas tbody").append('<tr id="rowArea'+i+'" class="'+clase+'">'+							
						'<td style="width:30px;text-align:center;">'+(i+1)+'</td>'+
						'<td id="clCodArea'+i+'" style="width:80px;">'+itm.codigo+'</td>'+
						'<td id="clDenomArea'+i+'" style="width:200px;text-align:center;">'+itm.nombre+'</td>'+
						'</tr>');
	    	});
	    	$("body").css("cursor", "default");
	    },error: function(XMLHttpRequest, textStatus, errorThrown){		    	
			
	    }
	});
	
	$('#searchArea').click(function (){
		if($('#popAreas').length){
			$('#popAreas').show();
		}else{
			var $dialog = $('<div></div>')
			.dialog({height: 250,width: 350,zIndex: 20001,
				id :'popAreas',
				title: 'Seleccione El Area',
				close: function(event, ui){	$(this).remove();}});
			$dialog.attr('id','popAreas');
			$dialog.dialog('open');
			$dialog.html('<table id="tblAreasPop" class="tablaAreas" style="display_bock"><thead><tr><th>N&deg;</th><th>Codigo</th><th>Denominaci&oacute;n</th></tr></thead></table>');
			$("#tblAreasPop").append($('#tblAreas tbody').clone());
			
			$('#tblAreasPop tbody tr').each(function(i,item){
				$(item).click(function (){
	    			$('#txtArea').val( $('#clCodArea'+i).text());
	    			$('#DenomArea').val(   $('#clDenomArea'+i).text());
	    		});
			});
			
		}
	});
	*/
	$('#popCargaManual').append('<div id="contArbolCta" style="height: 100%;width:460px;background-color:#fff;font: normal 9px arial;display:none;"><ul id="browser" class="filetree treeview"></ul></div>');
	
	$('body').css('cursor', 'wait');
	$.ajax({url: 'getAccountContabAG.action',
			type:'POST',
			dataType:'json',
			data:{
				ejercicio:$('#ejercicioInt').text()
			},
		beforeSend: function (xhr){
			$('body').append('<div id="fadeCargaCuentas" class="overlay" style="display:block"></div>'+
					'<div id="waitCargaCuentas" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando Plan de cuentas Contable</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeCargaCuentas').remove();
			$('#waitCargaCuentas').remove();
		},success: function(data){
			$('#popCargaManual').append(
					'<div id="contArbolCtaPop" style="display:none;">'+
						'<ul id="browser" class="filetree treeview"></ul>'+
					'</div>');
			vlistCtas=data.listaCtas;
			$.each(data.listaCtas, function(i,rw){
	    		var tHtml='';
	    		var result=getObjects(vlistCtas, 'cuentaCodPadre', rw.cuentaCod);
	    		if(result){
	    			tHtml='<li class="collapsable '+rw.cuentaCod+'">'+
	    					'<div class="hitarea collapsable-hitarea"></div>'+
	    					'<span class="folder seleccionable">'+rw.cuentaCod+' - '+rw.cuentaNombre+'</span><ul id="'+rw.cuentaCod+'"></ul>'+
	    					'</li>';
	    		}else{
	    			tHtml='<li><span class="file seleccionable">'+rw.cuentaCod+' - '+rw.cuentaNombre+'</span></li>';
	    		}
	    		if(parseInt(rw.cuentaCodPadre)==0){
	    			$('#browser').append(tHtml);
	    		}else{
	    			$('#'+rw.cuentaCodPadre).append(tHtml);
	    		}
	    	});
	    	$("#browser").treeview({collapsed:true});
	    	$('body').css('cursor', 'default');
	    },error: function(XMLHttpRequest, textStatus, errorThrown){		    	
			
	    }
	});

	$('#searchCuenta').click(function (){
		if($('#popCuentas').length){
			$('#popCuentas').show();
		}else{
			var $dialog = $('<div></div>')
			.dialog({height: 350,width: 530,zIndex: 20001,
				id :'popCuentas',
				title: 'Seleccione la cuenta',
				close: function(event, ui){	$(this).remove();}});
			$dialog.attr('id','popCuentas');
			$dialog.dialog('open');
			$dialog.html('<div id="tblCuentas" style="height: 100%;width:460px;background-color:#fff;font: normal 9px arial;">'+
					'<ul id="browser" class="filetree treeview"></ul></div>');
			$("#tblCuentas").append($('#contArbolCtaPop #browser').clone());
			$("#tblCuentas #browser").css('display','block');
			$("#tblCuentas #browser").treeview({collapsed:true});
			
			$('.seleccionable').dblclick(function(){
				var cta=$(this).text().split(" - ");$('#txtCodigo').val(cta[0]);
				$('#txtDenominacion').val(cta[1]);
			});
		}
	});
	
	if($("#cbPeriodos").attr('disabled') == 'disabled'){ tipoArchivo=2; periodo=$("#cbComplPeriodos option:selected").val(); }
	else{tipoArchivo=0;periodo=$("#cbPeriodos option:selected").val(); }
	
	$('body').css('cursor', 'wait');
	$.ajax({url: 'getLinesInforme.action',type:'POST',dataType:'json',
		data:{	inf: $('#infId').text(),
				per: periodo,
				tpArchivo: tipoArchivo
		},beforeSend: function (xhr){
			$('body').append('<div id="fadeLoadFile" class="overlay" style="display:block"></div>'+
					'<div id="waitLoadFile" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
					' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Buscando archivo subido</div>'+
					' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
					'</div>');
		},complete: function (data) {
			$('#fadeLoadFile').remove();
			$('#waitLoadFile').remove();
		},success: function(data){
			$('#mensajeCargaManual').text('Cargando Contenido del archivo');
	    	$('#fileId').text( data.file.archivoId);
	    	$('#cabId').text( data.file.cabId);
		if(data.file.archivoId>0){
	    		$('#Registros').val( data.file.cabecera.substring(25,33));
		    	$('#Tdebito').val( data.file.cabecera.substring(33,49));
		    	$('#Tcredito').val( data.file.cabecera.substring(49,65));
		    	$('#rut').val( data.file.cabecera.substring(14,23));
		    	$('#dv').val( data.file.cabecera.substring(23,24));
	    	}else{
	    		$('#Registros').val( 1);
		    	$('#Tdebito').val( 0);
		    	$('#Tcredito').val( 0);
		    	$('#rut').val( 0);
		    	$('#dv').val( 0);
	    	}
	    	console.log(data.file);
	    	
	    	$.each(data.file.detalle, function(i,rw){
	    		if (i%2===0) {clase='rw_DetPar'; }else{ clase='rw_DetImp';}
	    		
		    	$("#ListaItem tbody").append('<tr id="row'+rw.lineaId+'" class="regDetalle '+clase+'">'+							
						'<td id="dtCuenta" >'+rw.linea.substring(10,16)+'</td>'+
						'<td id="dtDenomin" style="text-align:left;">'+rw.linea.substring(80,159)+'</td>'+
						'<td id="dtDebito" >'+rw.linea.substring(16,32)+'</td>'+
						'<td id="dtCredito" >'+rw.linea.substring(32,48)+'</td>'+
						'<td id="dtDeudor" >'+rw.linea.substring(48,64)+'</td>'+
						'<td id="dtAcreedor" >'+rw.linea.substring(64,80)+'</td>'+
						'<td id="dtlinea" style="display:none;">'+rw.linea+'</td>'+
						'<td id="dtBotones">'+
							'<img id="edt'+rw.lineaId+'" src="images/edititem.png" alt="descripción" class="img25"/>' +
							'<img id="del'+rw.lineaId+'" src="images/delete.png" alt="descripción" class="img25"/></td>'+
						'</tr>');
		    	$('#row'+rw.lineaId).find('td#dtBotones #edt'+rw.lineaId).click(function (){
		    		jConfirm('&iquest;Est&aacute; seguro que desea editar el registro?', 'Editar Registro', function(r) {
						if(r){
				    		$('#lineaId').text(rw.lineaId);
				    		$('#txtCodigo').val(rw.linea.substring(10,16));
				    		$('#txtDebito').val(parseFloat(rw.linea.substring(16,32)));
				    		$('#txtCredito').val(parseFloat(rw.linea.substring(32,48)));
				    		$('#txtDeudor').val(parseFloat(rw.linea.substring(48,64)));
				    		$('#txtAcreedor').val(parseFloat(rw.linea.substring(64,80)));
				    		$('#txtDenominacion').val(rw.linea.substring(80,159));

				    		if(!$.isNumeric(rw.linea.substring(123,139) )){
				    			tempAum=0;
				    		}else{
				    			tempAum=rw.linea.substring(123,139);
				    		}
				    		if(!$.isNumeric(rw.linea.substring(139,155) )){
				    			tempDis=0;
				    		}else{
				    			tempDis=rw.linea.substring(139,155);
				    		}
						}
		    		});
		    		
		    	});
		    	$('#row'+rw.lineaId).find('td#dtBotones #del'+rw.lineaId).click(function (){
		    		jConfirm('&iquest;Est&aacute; seguro que desea eliminar el registro?', 'Eliminar Registro', function(r) {
						if(r){
							console.log($(this));
							console.log($('#row'+rw.lineaId+' #dtDebito').text());
							
							$.ajax({url: 'deleteLineFile.action',
								type:'POST',dataType:'json',
								data:{	cabId:	data.file.cabId,
										detId:	rw.lineaId,
										cabLine:'1'+
												'00'+$('#muni').val()+'01'+
												$('#periodo').val()+
												$.strPadRight($('#entCom').val().substring(0, 20),20,' ')+
												'CLP'+
												$.strPadRight($('#rut').val().substring(0, 20),20,'0')+
												$.strPadRight($('#dv').val().substring(0, 20),20,'0')+
												$.strPadLeft(parseInt($('#Registros').val()-1),9,0)+
												$.strPadLeft(parseFloat($('#Tdebito').val()-parseFloat($('#row'+rw.lineaId+' #dtDebito').text())),16,0)+
												$.strPadLeft(parseFloat($('#Tcredito').val()-parseFloat($('#row'+rw.lineaId+' #dtCredito').text())),16,0)
								},beforeSend: function (xhr){
									$('body').append('<div id="fadeDeleteLine" class="overlay" style="display:block"></div>'+
											'<div id="waitDeleteLine" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
											' <div id="mensajeCargaManual" style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Eliminado Linea</div>'+
											' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
											'</div>');
								},complete: function (data) {
									$('#fadeDeleteLine').remove();
									$('#waitDeleteLine').remove();
								},success: function(data){
									jAlert(data.mensaje,'Eliminar Registro');
									if(data.estado>0){
										$('#Registros').val($.strPadLeft(parseInt($('#Registros').val()-1),9,0));
										$('#Tdebito').val($.strPadLeft(parseFloat($('#Tdebito').val()-parseFloat($('#row'+rw.lineaId+' #dtDebito').text())),16,0));
										$('#Tcredito').val($.strPadLeft(parseFloat($('#Tcredito').val()-parseFloat($('#row'+rw.lineaId+' #dtCredito').text())),16,0));
										if(data.estado==2){
											$('#fileId').text(0);
											$('#cabId').text(0);
										}
										$('#row'+rw.lineaId).remove();
									}
								}
							});
						}
		    		});
		    	});
	    	});
	    	
	    	$('body').css('cursor', 'default');

	    },error: function(XMLHttpRequest, textStatus, errorThrown){		    	
			
	    }
	});
	
	$(".regDetalle").live({
		mouseenter: function(){
			$(this).css({'cursor':'pointer'});
			
			tooltip="<div class='ui-tooltip-content' style='width:920px;position:absolute;z-index: 11001;left:50x;'>"+ 
						"<div class='tooltip-title'>Linea Generada</div>"+
						"<div class='tooltip-content'><p style='margin:0;padding:0;'>"+$(this).find('td#dtlinea').text()+"</p></div></div>"; 
			$('body').append(tooltip);
			
			izq=0;
			if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
			else{							izq=$(this).offset().left-450;}
			$('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});

		},
		mouseleave: function(){	$('div').remove('.ui-tooltip-content');
		}
	});
	
});

function getObjects(obj, key, val){ var newObj = false; $.each(obj, function(){var testObject = this; $.each(testObject, function(k,v){if(val == v && k == key){newObj = testObject;}});}); return newObj;}

function completeSpace(txt,largo){
	if(txt.length>largo){return txt.substr(0,largo);}else{while(txt.length<largo){txt+=' ';} return txt;}
}
function completeZero(txt,largo){
	while(txt.length<largo){txt='0'+txt;} return txt;
}

// acumula los totales del saldo debito y saldo credito
function Totales(aumento, dism,informe) {

    var tdebito = $('#Tdebito').val();
    var tcredito= $('#Tcredito').val();
    if (tdebito == ""  || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    
    tdebito = parseFloat(tdebito) + parseFloat(aumento);
    tcredito = parseFloat(tcredito) + parseFloat(dism);
        
    $('#Tdebito').val(tdebito);
    $('#Tcredito').val(tcredito);
    
}
// disminuye los totales de saldos debito y saldos creditos
function Disminucion(x, informe) {
	
    var debe = $("#laumento" + x).val();
    var haber = $("#ldisminucion" + x).val();
    var tdebito = $("#Tdebito").val();
    var tcredito = $("#Tcredito").val();
    
    if (debe == "" || isNaN(debe)) debe = 0;
    if (haber == "" || isNaN(haber)) haber = 0;
    if (tdebito == "" || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    
    var totald = 0;
    var totalc = 0;
 
    totald = parseFloat(tdebito) - parseFloat(debe);
    totalc = parseFloat(tcredito) - parseFloat(haber);
    $("#Tdebito").val(totald);
    $("#Tcredito").val(totalc);
}

//Validacion campos numericos
function numerico(x, c) {
    if (!/^([0-9])*[,]?[0-9]*$/.test(x)) {
        alert("El valor " + x + " no es un número Valido, solo se aceptan numeros(0-9) y coma(,)");
        document.getElementById(c).value = "";
        return false;
    }
}
//funciones cargadas al inicio de la pagina, principalmente se encuentran funciones o los atributos del popup del plan de cuenta

//pop up analiticos
function mostrar2() {
    $("#pop2").fadeIn('slow');
}

function Solo_Numerico(variable){
    Numer=parseInt(variable);
    if (isNaN(Numer)){
        return "";
    }
    return Numer;
}
function ValNumero(Control){
    Control.value=Solo_Numerico(Control.value);
}