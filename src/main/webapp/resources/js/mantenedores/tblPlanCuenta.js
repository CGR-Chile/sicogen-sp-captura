$(document).ready(function() {
	$('#loading').hide();
	$('#nombre').attr('maxlength',50); 
	$('#descripcion').attr('maxlength',50);
	$('#fechaDesde').attr('maxlength',10); 
	$('#fechaHasta').attr('maxlength',10);
});

var builddata=function (data) {
    var source = [];
    var items = [];
   
    var parentid 	= -1;
    var id			= 0;
    var label 		= '<div>'+$('#cbEjercicio option:selected').text();+'</div>';
    label=label+"<div id='info_0' style='display:none'>";
    label=label+"<div id='idPadre'>0</div>";
    label=label+"<div id='CodigoPadre'>-1</div>";
    label=label+"<div id='Codigo'>000000</div>";
    label=label+"<div id='nombre'></div>";
    label=label+"<div id='descripcion'></div>";        
    label=label+"<div id='titulo'>00</div>";
    label=label+"<div id='grupo'>0</div>";
    label=label+"<div id='subgrupo'>0</div>";
    label=label+"<div id='cuenta'>00</div>";
    label=label+"<div id='cuenta2'></div>";
    label=label+"<div id='desde'></div>";
    label=label+"<div id='hasta'></div>";
    label=label+"<div id='vigencia'></div>";
    label=label+"<div id='tipoCta'>0</div>";
    label=label+"<div id='IndArtCuarto'>0</div>";
    label=label+"<div id='IndCuadDisp'>0</div>";
    label=label+"<div id='IndDeudaPub'>0</div>";
    label=label+"<div id='IndExePartCto'>0</div>";
    label=label+"<div id='ImpContable'>0</div>";
    label=label+"<div id='IndObligacion'>0</div>";
    label=label+"<div id='IndPresup'>0</div>";
    label=label+"<div id='IndSaldoCaja'>0</div>";
    label=label+"<div id='IndTipoCta'>0</div>";    
    label=label+"</div>";
    
    if (items[parentid]) {
    	var item = { id:id, parentid:parentid, label:label, item:item, checked:true };
        if (!items[parentid].items) {
        	items[parentid].items = [];
        }
        items[parentid].items[items[parentid].items.length] = item;
        items[id]=item;
    }
    else {
    	items[id] = { id:id, parentid: parentid, label: label, item: item, checked:true };
        source[id] = items[id];
    }
    console.log(data);
    $.each(data.listaCtas, function(i, item) { 
    	
    	var parentid 	= item["idListaPad"];
        var id			= item["idLista"];
        
        var label 		= '';
        
        if (parseInt(item.cuentaTipo)==1){
        	label='<div>'+item["cuentaCod"]+' - '+item["cuentaNombre"] +'</div>';
        	//stId='1'+item["cuentaCod"]+item["cuentaAna"];
        }else{
        	label='<div>'+item["cuentaAna"]+' - '+item["cuentaNombre"] +'</div>';
        	//stId='2'+item["cuentaCod"]+item["cuentaAna"];
        }
        
        /*item.cuentaTipo+*/
        label=label+"<div id='info_"+id+"' style='display:none'>";
        label=label+"<div id='idPadre'>"+item.cuentaIdPadre+"</div>";
        label=label+"<div id='CodigoPadre'>"+item.cuentaCodPadre+"</div>";
        label=label+"<div id='Codigo'>"+item.cuentaCod+"</div>";
        label=label+"<div id='CodigoCta'>"+item.cuentaCod2+"</div>";
        label=label+"<div id='nombre'>"+item.cuentaNombre+"</div>";
        label=label+"<div id='descripcion'>"+item.cuentaDescripcion+"</div>";        
        label=label+"<div id='titulo'>"+item.cuentaTitulo+"</div>";
        label=label+"<div id='grupo'>"+item.cuentaGrupo+"</div>";
        label=label+"<div id='subgrupo'>"+item.cuentaSubgrupo+"</div>";
        label=label+"<div id='cuenta'>"+item.cuentaCuenta+"</div>";
        label=label+"<div id='cuenta2'>"+item.cuentaCuenta2+"</div>";
        label=label+"<div id='desde'>"+item.cuentaDesde+"</div>";
        label=label+"<div id='hasta'>"+item.cuentaHasta+"</div>";
        label=label+"<div id='vigencia'>"+item.cuentaVigencia+"</div>";
        label=label+"<div id='tipoCta'>"+parseInt(item.cuentaTipo)+"</div>";
        
        label=label+"<div id='IndArtCuarto'>"+item.cuentaIndArtCuarto+"</div>";
        label=label+"<div id='IndCuadDisp'>"+item.cuentaIndCuadDisp+"</div>";
        label=label+"<div id='IndDeudaPub'>"+item.cuentaIndDeudaPub+"</div>";
        label=label+"<div id='IndExePartCto'>"+item.cuentaIndExePartCto+"</div>";
        
        label=label+"<div id='ImpContable'>"+item.cuentaIndImpContable+"</div>";
        
        label=label+"<div id='IndObligacion'>"+item.cuentaIndObligacion+"</div>";
        label=label+"<div id='IndPresup'>"+item.cuentaIndPresup+"</div>";
        label=label+"<div id='IndSaldoCaja'>"+item.cuentaIndSaldoCaja+"</div>";
        label=label+"<div id='IndTipoCta'>"+item.cuentaIndTipoCta+"</div>";
        label=label+"<div id='CodigoAna'>"+item.cuentaAna+"</div>";
        label=label+"<div id='CodigoId'>"+item.cuentaId+"</div>";
        label=label+"</div>";
      
        //label=label+item.varDiv;
        if (items[parentid]) {
        	var item = { id:id, parentid:parentid, label:label, item:item, checked:true };
            if (!items[parentid].items) {
            	items[parentid].items = [];
            }
            items[parentid].items[items[parentid].items.length]=item;
            items[id]=item;
        }
        else {
        	items[id] = { id:id, parentid: parentid, label: label, item: item, checked:true };
            source[id] = items[id];
        }
    });
    return source;
};

function loadAccount(){
	limpia();
	action='loadAccount?ejercicio='+$('#cbEjercicio').val();
	$.ajax({url: action, type: "GET", dataType:'json',
		
	beforeSend: function ( data ) {
	 $('#loading').show();
	},
	complete: function ( data ) {
		 $('#loading').hide();
	},	
	success: function(data){
		
		switch(data.estado){
			case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
			case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
		}
		var source = builddata(data);
		$('#jqxTree').jqxTree({ source: source});
	    $.contextMenu({
			selector: '.jqx-tree-item-li', 
			callback: function(key, options){
				
				//console.log(new String(this[0].id));
				console.log(this[0].id.toString(8));
				//xmlDoc = $.parseXML(this[0].innerHTML),$xml=$(xmlDoc),$title=$xml.find("title");
				
				/*
				var ele1=this.children();
				var p1=ele1[1];
				console.log(p1);
				var ele2=p1.children();
				console.log(ele2);
				
				
				var arr = this.children('div').map(function() {
				    return $(this).attr("name");
				});
				
				console.log(arr.prevObject.prevObject[0]);
				var lala =arr.prevObject.prevObject[0].children('div');
				console.log(lala);
				
				
				$.each(this.children('div'), function(i, itm) {
					console.log('Primer nivel');
					console.log(itm);
					console.log(i);
					if (i==0){
						$.each(this.children(), function(i, itm) {
							console.log('2 nivel');
							console.log(item);
						});
					}
					console.log('----------------------------');
				});
				console.log('-----   FIN   ----------');
				
				console.log('----------------------------');
				//console.log($ele1[0]);
				console.log('----------------------------');
				
				var $ele2=$ele1[0].children();
				
				console.log(this);
				$.each(this, function(i, itm) {
					$.each(this, function(i, data) {
						console.log(this);
						$.each(this[30], function(i, data) {
							console.log(this);
						});
					
					});
				});
				//var $variable = this[0].innerHTML; 
                //console.log($variable);
				
				var arr = jQuery.makeArray( this[0]);
				
				//console.log(arr.itm[0]);
				
				$.each(arr, function(i, itm) {
					
					$.each(itm, function(i, data) {
						console.log(i+' - '+data);
					});
				});
				
				
	    		console.log(arr);
	    		console.log(this[0].innerHTML);
				alert(this[0].innerHTML);
				console.log(this[0].childnodes[0]);
				*/
				seleccionaItem(this[0].id, key);
			},
			items: {
				"new": {name: "Nuevo", icon: "new"},
				"edit": {name: "Editar", icon: "edit"},
				/*"sep": "---------",
				"del": {name: "Delete", icon: "del"},*/
			}
		});
		$('.context-menu-one').on('click', function(e){
			console.log(1);
			console.log( e);
			console.log('clicked', this);
		});
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		console.log('error');
	}
	});
	$('#btnGrabar').attr("disabled", "disabled");
}

function seleccionaItem(objeto, accion){
	
	console.log('----------------------------');
	console.log(objeto);
	console.log('----------------------------');
	var $kids = $('#info_'+objeto).children();
	
	console.log($kids);
	
	$('#tpCuenta').val(0);
	switch(accion){
	case 'new': nuevoItem($kids,objeto); break;	
	case 'edit':editaItem($kids,objeto); break;
	case 'del':
		if ((parseInt($kids[13].innerHTML)==0) && ($kids[0].innerHTML='-1')){
			jAlert("No se puede editar este nivel de cuenta","Plan de Cuentas");
			return;
		}
		$('#btnGrabar').attr("disabled", "disabled");
		$('#btnGrabar').css('cursor','default');
		
		
		console.log($kids);
		if (parseInt($kids[14].innerHTML)==1){ 
			action='delTblPlanCuenta?AccountId='+$kids[25].innerHTML;}
		else{ 
			action='delTblPlanCuentaNvl?AccountId='+$kids[25].innerHTML; }
		
		
		$.ajax({url: action, type: "GET", dataType:'json',
			beforeSend: function ( data ) {
				 $('#loading').show();
				},
				complete: function ( data ) {
					 $('#loading').hide();
				},					
				success: function(data){
					console.log(data);
					
					switch(data.estado){
						case -2:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='verMantenedorTblPLanCuenta.action');}} );break;
						case -1:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='login');}} );break;
						case -3:jAlert(data.mensaje, "Plan de cuentas"); return; break;
						case -4:jAlert(data.mensaje, "Plan de cuentas"); return; break;
						default:jAlert(data.mensaje, "Plan de cuentas"); return; break;
					}
					if (data.estado>0){		loadAccount();	}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					console.log('error');
				}
			});
			break;
	}
}

function grabaCuenta(){
	var vCodigoAna='';
	var vCodigo='';
	var vAnulado=0;
	var vTipoCuenta=$('#tpCuenta').html();
	if ((vTipoCuenta=='0')||(vTipoCuenta=='1')) {
		vCodigo=$('#codigo1').val()+$('#codigo2').val()+$('#codigo3').val()+$('#codigo4').val();
		vCodigoAna=null;
	}else{
		vCodigo=$('#codigoCta').text();
		vCodigoAna=$('#codigo1').val()+$('#codigo2').val()+$('#codigo3').val()+$('#codigo4').val()+$('#codigo5').val();
	}

	if($('#stateAccount').attr('src').substr(13,3)=='on.'){vEstado=0;}else{vEstado=1;}
	
	console.log('v2 Tipo de Cuenta: '+vTipoCuenta+' Codigo de cuenta: '+vCodigo+' Codigo Analitico: '+vCodigoAna);
	
	var flag=0;
	if (+$('#nombre').val()==''){
		jAlert('Debe ingresar un nombre a la cuenta presupuestaria', "Plan de cuentas");
		flag=flag+1;
		return;
	}
	if (+$('#descripcion').val()==''){
		jAlert('Debe ingresar una descripcion a la cuenta presupuestaria', "Plan de cuentas");
		flag=flag+1;
		return;
	}
	
	
	
	if (flag==0){
		
		if ($('#idCuenta').text()=='0'){action='addTblPlanCuenta';}
		else{ 							action='updTblPlanCuenta';}
		
		action=action+'?ejercicio='+$('#cbEjercicio').val()+'&idCuenta='+$('#idCuenta').text()+'&codigo='+vCodigo+'&codigoAna='+vCodigoAna;
		action=action+'&codigoPadre='+$('#accountFather').val()+'&nombre='+$('#nombre').val();
		action=action+'&descr='+$('#descripcion').val()+'&desde='+$('#fechaDesde').val()+'&hasta='+$('#fechaHasta').val();
		
		action=action+'&indArtCuarto='+$('#cbArtCuarto option:selected').val();
		action=action+'&indCuadDisp='+$('#cbCuadrDisp option:selected').val();
		action=action+'&indDeudaP='+$('#cbDeudaPubl option:selected').val();
		action=action+'&indExePartCto='+$('#cbExePartCto option:selected').val();		
		action=action+'&impContable='+$('#cbImpContable option:selected').val();		
		action=action+'&indObl='+$('#cbObligacion option:selected').val();
		action=action+'&indPresup='+$('#cbPresup option:selected').val();
		action=action+'&indSaldoCaja='+$('#cbSaldoCaja option:selected').val();
		action=action+'&indTpoCta='+$('#cbTipoCta option:selected').val();
		action=action+'&tpEntidad=2';
		action=action+'&tipoCta='+vTipoCuenta;
		action=action+'&codigo2='+$('#codigoCta').val();
		action=action+'&anulado='+vEstado;

		
		$.ajax({url: action, type: "GET", dataType:'json',
			beforeSend: function(data){$('#loading').show();},
			complete:   function (data){$('#loading').hide();},	
			success:	function(data){
				console.log(data);
				
				switch(data.estado){
					case -2:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='verMantenedorTblPLanCuenta');}} );break;
					case -1:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='login');}} );break;
					default:jAlert(data.mensaje, "Plan de cuentas");break;
				}
				
				loadAccount();
				limpia();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log('error');
			}
		});
		
		$('#btnGrabar').attr("disabled", "disabled");
		$('#btnGrabar').css('cursor','default');
	}
}
$(document).ready(function() {
	
	$("#cbEjercicio").each(function(i){ $(this).attr({'onChange': 'loadAccount()'}); });
	$("#btnGrabar").attr({'onclick':'grabaCuenta()'});
	$('#jqxTree').jqxTree({ height: '200px', width: '800px' });
    $('#jqxTree').bind('select', function (event) {
        var htmlElement = event.args.element;
        $('#jqxTree').jqxTree('getItem', htmlElement);
    });
  });
function nuevoItem(objeto,idCta){
	if (objeto[14].innerHTML=='2' && objeto[9].innerHTML!='0000'){
		jAlert('No se puede agregar cuentas a este nivel','Nueva Cuenta');
	}else{
		console.log(objeto);
		$('#codigo1').val('00');
		$('#codigo2').val('0');
		$('#codigo3').val('0');
		$('#codigo4').val('00');
		
		if((objeto[14].innerHTML=='0')||((objeto[14].innerHTML=='1')&&(objeto[9].innerHTML=='00')) ){
			formatTitulos(1);
		}else{ 
			formatTitulos(2);
		}
		
		var flag=0;
		$('#tpCuenta').val(objeto[14].innerHTML);
		$('#btnGrabar').removeAttr("disabled");
		$('#btnGrabar').css('cursor','pointer');
		$('#idCuenta').text(0);
		var sCuentaPadre='';
		if(objeto[14].innerHTML=='1'){
			sCuentaPadre=objeto[2].innerHTML;
		}else{
			sCuentaPadre=objeto[24].innerHTML;
		}
		$('#accountFather').val(sCuentaPadre);
		
		$('#codigoCta').text(objeto[2].innerHTML);
		$('#nombre').val('');
		$('#descripcion').val('');
		$('#fechaDesde').val('');
		$('#fechaHasta').val('');

		if ((objeto[14].innerHTML=='1')&&(objeto[9].innerHTML=='00')){
			formatTitulos(1);
			for(var i=6;i<10;i++){
				$('#codigo'+(i-5)).val(objeto[i].innerHTML);
				if (parseInt(objeto[i].innerHTML) !=0){
					$('#codigo'+(i-5)).attr("disabled", "disabled");
				}else{
					if (flag==0){
						$('#codigo'+(i-5)).removeAttr("disabled");
						flag=flag+1;
					}
				}
			}
		}
		if ((objeto[14].innerHTML=='0')||((objeto[14].innerHTML=='1')&&(objeto[9].innerHTML=='00'))){formatTitulos(1);}else{formatTitulos(2);}

		$('#cbArtCuarto').val(0);
		$('#cbCuadrDisp').val(0);
		$('#cbDeudaPubl').val(0);
		$('#cbExePartCto').val(0);
		$('#cbObligacion').val(0);			
		$('#cbPresup').val(0);
		$('#cbSaldoCaja').val(0);
		$('cbTipoCta').val(0);
		$('#cbImpContable').val(0);
		
		$('#stateAccount').attr('src','images/check_on.png');
	}
	if (parseInt(objeto[14].innerHTML)==0){
		$('#codigo1').removeAttr("disabled");
		$('#codigo1').attr('maxlength','2');
		$('#accountFather').val("000000");
	}
	
	if ((parseInt(objeto[14].innerHTML)==0)||((parseInt(objeto[14].innerHTML)==1)&& (objeto[9].innerHTML=='00'))){
		$('#contTit5').css('display','block');$('#contTit6').css('display','none');
		$('#lblTit2').text('Codigo');$('#lblTit3').text('.');$('#lblTit4').text('.');$('#lblTit5').text('.');
		$('#codigo1').attr('maxlength','2');$('#codigo2').attr('maxlength','1');$('#codigo3').attr('maxlength','1');$('#codigo4').attr('maxlength','2');
	}
	else{
		console.log('Inner 14: '+objeto[14].innerHTML);
		if(parseInt(objeto[14].innerHTML)==1){		
			$('#codigo1').val('00'); $('#codigo2').val('000'); $('#codigo3').val('000'); $('#codigo4').val('0000'); $('#codigo5').val('0000');
			$('#codigo1').removeAttr("disabled");
		}else{
			var flag=0;
			$('#codigo1').val(objeto[6].innerHTML);  if((parseInt($('#codigo1').val())==0 )&&(flag==0)){$('#codigo1').removeAttr("disabled");flag=flag+1;} else{$('#codigo1').attr("disabled", "disabled");}
			$('#codigo2').val(objeto[7].innerHTML);  if((parseInt($('#codigo2').val())==0 )&&(flag==0)){$('#codigo2').removeAttr("disabled");flag=flag+1;} else{$('#codigo2').attr("disabled", "disabled");}
			$('#codigo3').val(objeto[8].innerHTML);  if((parseInt($('#codigo3').val())==0 )&&(flag==0)){$('#codigo3').removeAttr("disabled");flag=flag+1;} else{$('#codigo3').attr("disabled", "disabled");}
			$('#codigo4').val(objeto[9].innerHTML);  if((parseInt($('#codigo4').val())==0 )&&(flag==0)){$('#codigo4').removeAttr("disabled");flag=flag+1;} else{$('#codigo4').attr("disabled", "disabled");}
			$('#codigo5').val(objeto[10].innerHTML); if((parseInt($('#codigo5').val())==0 )&&(flag==0)){$('#codigo5').removeAttr("disabled");flag=flag+1;} else{$('#codigo5').attr("disabled", "disabled");}
		}
	}
}
function editaItem(objeto,idCta){
	
	if(parseInt(objeto[14].innerHTML)==0){ jAlert("No se puede editar este nivel de cuenta","Plan de Cuentas"); return; }
	if(parseInt(objeto[14].innerHTML)==1){ formatTitulos(1);}else{ formatTitulos(2); }
	
	$('#btnGrabar').removeAttr("disabled");
	$('#btnGrabar').css('cursor','pointer');
	
	var sCuentaPadre='';
	if(objeto[14].innerHTML=='1'){
		sCuentaPadre=objeto[1].innerHTML.substring(1,7);
	}else{
		sCuentaPadre=objeto[1].innerHTML.substring(7,24);
	}
	
	$('#codigoCta').text(objeto[2].innerHTML);
	
	$('#tpCuenta').val(objeto[14].innerHTML);
	$('#idCuenta').text(objeto[25].innerHTML);
	$('#accountFather').val(sCuentaPadre);
	
	$('#nombre').val(objeto[4].innerHTML);
	$('#descripcion').val(objeto[5].innerHTML);
	$('#fechaDesde').val(objeto[11].innerHTML);
	$('#fechaHasta').val(objeto[12].innerHTML);
	
	$('#cbArtCuarto').val(objeto[15].innerHTML);
	$('#cbCuadrDisp').val(objeto[16].innerHTML);
	$('#cbDeudaPubl').val(objeto[17].innerHTML);
	$('#cbTipoCta').val(objeto[20].innerHTML);
	
	$('#cbExePartCto').val(objeto[18].innerHTML);
	$('#cbImpContable').val(objeto[19].innerHTML);
	$('#cbObligacion').val(objeto[20].innerHTML);
	$('#cbPresup').val(objeto[20].innerHTML);
	$('#cbSaldoCaja').val(objeto[22].innerHTML);
	
	$('#codigo1').val(objeto[6].innerHTML);  $('#codigo1').attr("disabled", "disabled");
	$('#codigo2').val(objeto[7].innerHTML);  $('#codigo2').attr("disabled", "disabled");
	$('#codigo3').val(objeto[8].innerHTML);  $('#codigo3').attr("disabled", "disabled");
	$('#codigo4').val(objeto[9].innerHTML);  $('#codigo4').attr("disabled", "disabled");

	$('#codigo5').val('0000');
	if (objeto[13].innerHTML!='null'){ $('#stateAccount').attr('src','images/check_sel.png');}else{ $('#stateAccount').attr('src','images/check_on.png'); }
	$('#btnGrabar').removeAttr("disabled");
	
}

function limpia(){
	$('#idCuenta').text(0);
	$('#accountFather').val('');
	
	$('#nombre').val('');
	$('#descripcion').val('');
	$('#fechaDesde').val('');
	$('#fechaHasta').val('');	
	for(var i=5;i<10;i++){
		$('#codigo'+(i-4)).val('');
		$('#codigo'+(i-4)).attr("disabled", "disabled");
	}
	$('#cbArtCuarto').val(-1);
	$('#cbCuadrDisp').val(-1);
	$('#cbDeudaPubl').val(-1);
	$('#cbExePartCto').val(-1);
	$('#cbObligacion').val(-1);
	$('#cbPresup').val(-1);
	$('#cbSaldoCaja').val(-1);
	$('#cbTipoCta').val(-1);
	$('#cbImpContable').val(-1);
	$('#stateAccount').attr('src','images/check_on.png');
}
function estadoCuenta(objeto){	
	var message = '';
	titulo = 'Cuenta Contable';
	console.log($('#accountFather').val());
	console.log($('#codigoCta').text());
	
	if (parseInt( $('#estadoCuenta').val())==0){	jAlert('Debe seleccionar la cuenta que desea anular',titulo);	return;	}
	
	if($(objeto).attr('src').substr(13,3)=='on.'){
		message='¿Está seguro que desea dejar en estado anulado la cuenta?';
		jConfirm(message, titulo, function(r) {
			if(r) {  $(objeto).attr('src','images/check_sel.png'); } 
		});
    }else{
		message='¿Esta seguro que desea activar la cuenta';
		jConfirm(message, titulo, function(r){
			if(r) {  $(objeto).attr('src','images/check_on.png'); } 
		});
	}
}
function formatTitulos(tipo){
	if (tipo==1){
		console.log('aca pase 1');
		$('#codigo1').attr('maxlength','2');
		$('#codigo2').attr('maxlength','1');
		$('#codigo3').attr('maxlength','1');
		$('#codigo4').attr('maxlength','2');
		$('#codigo2').css({'width':'20px'});
		$('#codigo3').css({'width':'20px'});
		$('#codigo4').css({'width':'20px'});
		$('#tpCuenta').text(1);
		$('#lblTit2').text('Codigo');
		$('#lblTit3').text('.');
		$('#lblTit4').text('.');
		$('#lblTit5').text('.');
		
		$('#codigo1').css({'margin-left':'55px'});
		$('#codAnalitic').css({display:'none'});
		$('#contTit5').css({display:'block'});
		$('#accountFather').css({width:'60px'});
		
	}else{
		$('#tpCuenta').text(2);
		$('#codAnalitic').css({display:'block'});
		console.log('aca pase 2');
		$('#codigo1').attr('maxlength','2');
		$('#codigo2').attr('maxlength','3');
		$('#codigo3').attr('maxlength','3');
		$('#codigo4').attr('maxlength','4');
		$('#codigo5').attr('maxlength','4');
		
		$('#codigo5').css({'display':'none'});
		$('#lblTit6').css({'display':'none'});
		
		$('#codigo1').css({'margin-left':'15px'});
		$('#codigo2').css({'width':'25px'});
		$('#codigo3').css({'width':'25px'});
		$('#codigo4').css({'width':'33px'});
		$('#lblTit2').text('Cod Analitico');
		$('#lblTit3').text('.');
		$('#lblTit4').text('.');
		$('#lblTit5').text('.');
		//$('#contTit4').css({width: '130px',margin: '0 5px'} );
		$('#lblTit6').text('.');
		$('#accountFather').css({width:'140px'});
		
	}
}