$(document).ready(function() {
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
    var label  ='<div>'+$('#cbEjercicio option:selected').text();+'</div>';
    label=label+"<div id='info_0' style='display:none'>";                      	
    label=label+"<div id='idPadre'>-1</div>";						//0
    label=label+"<div id='CodigoPadre'>0000000000</div>";
    label=label+"<div id='Codigo'>0000000000</div>";
    label=label+"<div id='nombre'></div>";
    label=label+"<div id='descripcion'></div>";        
    label=label+"<div id='titulo'>00</div>";
    label=label+"<div id='grupo'>00</div>";
    label=label+"<div id='subgrupo'>000</div>";
    label=label+"<div id='cuenta'>000</div>";
    label=label+"<div id='desde'></div>";
    label=label+"<div id='hasta'></div>";
    label=label+"<div id='vigencia'></div>";                   	//11
    
    label=label+"<div id='indArtCuarto'>0</div>";				//12
    label=label+"<div id='indCuadDisp'>0</div>";
    label=label+"<div id='indDeudaPub'>0</div>";
    label=label+"<div id='indIndExePartCto'>0</div>";
    label=label+"<div id='indObligacion'>0</div>";
    label=label+"<div id='indPresup'>0</div>";
    label=label+"<div id='indSaldoCaja'>0</div>";
    label=label+"<div id='indTipoCta'>0</div>";
    
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
    
    $.each(data.listaCtas, function(i, item) {    	 
        var parentid 	= item["cuentaIdPadre"];
        var id			= item["cuentaId"];
        var label 		= '';
        if (item.cuentaVigencia!='null'){imagen='<img class="icoImage" src="images/check_on.png" />';}
        else{							 imagen='<img class="icoImage" src="images/check_sel.png" />';}
        
        //var label  ="<div><div>"+imagen+'</div><div>'+item['cuentaCod']+" - "+item['cuentaNombre'] +"</div></div>";
        label=label+"<div>"+item['cuentaCod']+" - "+item['cuentaNombre'] +"</div>";
        label=label+"<div id='info_"+id+"' style='display:none'>";                      	
        label=label+"<div id='idPadre'>"+item.cuentaIdPadre+"</div>";						//0
        label=label+"<div id='CodigoPadre'>"+item.cuentaCodPadre+"</div>";
        label=label+"<div id='Codigo'>"+item.cuentaCod+"</div>";
        label=label+"<div id='nombre'>"+item.cuentaNombre+"</div>";
        label=label+"<div id='descripcion'>"+item.cuentaDescripcion+"</div>";        
        label=label+"<div id='titulo'>"+item.cuentaTitulo+"</div>";
        label=label+"<div id='grupo'>"+item.cuentaGrupo+"</div>";
        label=label+"<div id='subgrupo'>"+item.cuentaSubgrupo+"</div>";
        label=label+"<div id='cuenta'>"+item.cuentaCuenta+"</div>";
        label=label+"<div id='desde'>"+item.cuentaDesde+"</div>";
        label=label+"<div id='hasta'>"+item.cuentaHasta+"</div>";
        label=label+"<div id='vigencia'>"+item.cuentaVigencia+"</div>";                   	//11
        
        label=label+"<div id='indArtCuarto'>"+item.cuentaIndArtCuarto+"</div>";				//12
        label=label+"<div id='indCuadDisp'>"+item.cuentaIndCuadDisp+"</div>";
        label=label+"<div id='indDeudaPub'>"+item.cuentaIndDeudaPub+"</div>";
        label=label+"<div id='indIndExePartCto'>"+item.cuentaIndExePartCto+"</div>";
        label=label+"<div id='indObligacion'>"+item.cuentaIndObligacion+"</div>";
        label=label+"<div id='indPresup'>"+item.cuentaIndPresup+"</div>";
        label=label+"<div id='indSaldoCaja'>"+item.cuentaIndSaldoCaja+"</div>";
        label=label+"<div id='indTipoCta'>"+item.cuentaIndTipoCta+"</div>";   				//19
        
        label=label+"</div>";
        
        //label=label+labelRow;
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
    });
    		
    return source;
};

function loadAccount(){
	limpia();
	action='loadAccountPresup?ejercicio='+$('#cbEjercicio').val();
	$.ajax({url: action, type: "GET", dataType:'json',
		success: function(data){
			
			switch(data.estado){
				case -2:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
				case -1:jAlert(data.mensaje, "Carga Manual", function(r){if(r){$(location).attr('href',url='login');}} );break;
			}
			var source = builddata(data);
			$('#jqxTree').jqxTree({ source: source});
		    $.contextMenu({
				selector: '.jqx-tree-item-li', 
				callback: function(key, options) {
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
	$('#AddRecordDialogSaveButton').attr("disabled", "disabled");
}

function seleccionaItem(objeto, accion){
	var $kids = $('#info_'+objeto).children();
	/*
	var id=objeto;  				var idPadre=$kids[0].innerHTML; var CodigoPadre=$kids[1].innerHTML;
	var codigo=$kids[2].innerHTML;  var nombre=$kids[3].innerHTML; 	var descripcion=$kids[4].innerHTML; 
	var titulo=$kids[5].innerHTML;	var grupo=$kids[6].innerHTML;	var subgrupo=$kids[7].innerHTML;
	var cuenta=$kids[8].innerHTML;	var desde=$kids[9].innerHTML;	var hasta=$kids[10].innerHTML;
	*/
	switch(accion){
	case 'new':
			
			if ($kids[8].innerHTML!='000'){
				jAlert('No se puede agregar cuentas a este nivel','Nueva Cuenta');
			}else{
				$('#AddRecordDialogSaveButton').removeAttr("disabled");
				$('#AddRecordDialogSaveButton').css('cursor','pointer');
				var flag=0;
				$('#idCuenta').text(0);
				$('#accountFather').val($kids[2].innerHTML);
				
				$('#nombre').val('');
				$('#descripcion').val('');
				$('#fechaDesde').val('');
				$('#fechaHasta').val('');
				
				$('#codigo1').val('00');
				$('#codigo2').val('00');
				$('#codigo3').val('000');
				$('#codigo4').val('000');
				
				for(var i=5;i<9;i++){
					$('#codigo'+(i-4)).val($kids[i].innerHTML);
					
					if (parseInt($kids[i].innerHTML)!=0){
						$('#codigo'+(i-4)).attr("disabled", "disabled");
					}else{
						if (flag==0){
							$('#codigo'+(i-4)).removeAttr("disabled");
							flag=flag+1;
						}
					}
				}
				$('#cbArtCuarto').val(0);
				$('#cbCuadrDisp').val(0);
				$('#cbDeudaPubl').val(0);
				$('#cbExePartCto').val(0);		
				$('#cbObligacion').val(0);
				$('#cbPresup').val(0);
				$('#cbSaldoCaja').val(0);
				$('#cbTipoCta').val(0);
				
				$('#stateAccount').attr('src','images/check_on.png');
			}
			break;
	case 'edit':
			//if(parseInt(objeto[14].innerHTML)==0){ jAlert("No se puede editar este nivel de cuenta","Plan de Cuentas"); return; }
		if(parseInt(objeto)==0){ jAlert("No se puede editar este nivel de cuenta","Plan de Cuentas Presupuestarias"); return; }
			$('#AddRecordDialogSaveButton').removeAttr("disabled");
			$('#AddRecordDialogSaveButton').css('cursor','pointer');
			$('#idCuenta').text(objeto);
			$('#accountFather').val($kids[1].innerHTML);
			$('#nombre').val($kids[3].innerHTML);
			$('#descripcion').val($kids[4].innerHTML);
			$('#fechaDesde').val($kids[9].innerHTML);
			$('#fechaHasta').val($kids[10].innerHTML);
			
			for(var i=5;i<9;i++){
				$('#codigo'+(i-4)).val($kids[i].innerHTML);
				$('#codigo'+(i-4)).attr("disabled", "disabled");
			}
			
			if ($kids[11].innerHTML!='null'){
				$('#stateAccount').attr('src','images/check_sel.png');
			}else{
				$('#stateAccount').attr('src','images/check_on.png');
			}
			$('#cbArtCuarto').val($kids[12].innerHTML);
			$('#cbCuadrDisp').val($kids[13].innerHTML);
			$('#cbDeudaPubl').val($kids[14].innerHTML);
			$('#cbExePartCto').val($kids[15].innerHTML);
			$('#cbObligacion').val($kids[16].innerHTML);
			$('#cbPresup').val($kids[17].innerHTML);
			$('#cbSaldoCaja').val($kids[18].innerHTML);
			$('#cbTipoCta').val($kids[19].innerHTML);
			$('#AddRecordDialogSaveButton').removeAttr("disabled");
			break;
	case 'del':	
			$('#AddRecordDialogSaveButton').attr("disabled", "disabled");
			$('#AddRecordDialogSaveButton').css('cursor','default');
			action='delTblPlanCuentaPresup?AccountId='+objeto;
			$.ajax({url: action, type: "GET", dataType:'json',
				success: function(data){
					console.log(data);
					
					switch(data.estado){
						case -2:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
						case -1:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='login');}} );break;
						case -3:jAlert(data.mensaje, "Plan de cuentas");break;
						case -4:jAlert(data.mensaje, "Plan de cuentas");break;
						default:jAlert(data.mensaje, "Plan de cuentas");break;
					}
					loadAccount();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					console.log('error');
				}
			});
			break;
	}
}
$(document).ready(function() {
	
	$("#cbEjercicio").each(function(i){ $(this).attr({'onChange': 'loadAccount()'}); });
	$("#AddRecordDialogSaveButton").attr({'onclick':'grabaCuenta()'});
	$('#jqxTree').jqxTree({ height: '200px', width: '800px' });
    $('#jqxTree').bind('select', function (event) {
        var htmlElement = event.args.element;
        var item = $('#jqxTree').jqxTree('getItem', htmlElement);
    });
  
  });

function grabaCuenta(){
	var vEstado=0;
	codigo=$('#codigo1').val()+$('#codigo2').val()+$('#codigo3').val()+$('#codigo4').val();
	codPadre='';
	if($('#accountFather').val()=='-1'){codPadre='';}else{codPadre=$('#accountFather').val();}
	
	console.log('codPadre: '+codPadre);
	console.log('accountFather: '+$('#accountFather').val());
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
	if($('#stateAccount').attr('src').substr(13,3)=='on.'){vEstado=0;}else{vEstado=1;}
	if ($('#idCuenta').text()=='0'){action='setTblPlanCuentaPresup';}
	else{ 							action='updTblPlanCuentaPresup';}
	
	
	if (flag==0){
		action=action+'?ejercicio='+$('#cbEjercicio').val()+'&idCuenta='+$('#idCuenta').text()+'&codigo='+codigo;
		action=action+'&codigoPadre='+codPadre+'&nombre='+$('#nombre').val();
		action=action+'&descr='+$('#descripcion').val()+'&desde='+$('#fechaDesde').val()+'&hasta='+$('#fechaHasta').val();
		action=action+'&indArtCuarto='+$('#cbArtCuarto option:selected').val();
		action=action+'&indCuadDisp='+$('#cbCuadrDisp option:selected').val();
		action=action+'&indDeudaP='+$('#cbDeudaPubl option:selected').val();
		action=action+'&indExePartCto='+$('#cbExePartCto option:selected').val();		
		action=action+'&indObl='+$('#cbObligacion option:selected').val();
		action=action+'&indPresup='+$('#cbPresup option:selected').val();
		action=action+'&indSaldoCaja='+$('#cbSaldoCaja option:selected').val();
		action=action+'&indTpoCta='+$('#cbTipoCta option:selected').val();
		action=action+'&impContable='+$('#cbImpPresup option:selected').val();
		action=action+'&anulado='+vEstado;
		
		
		$.ajax({url: action, type: "GET", dataType:'json',
			success: function(data){
				console.log(data);
				
				switch(data.estado){
					case -2:jAlert(data.mensaje, "Plan de cuentas", function(r){if(r){$(location).attr('href',url='verMantenedorTblPLanCuentaPresup');}} );break;
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
		
		$('#AddRecordDialogSaveButton').attr("disabled", "disabled");
		$('#AddRecordDialogSaveButton').css('cursor','default');
	}
}
function limpia(){
	$('#idCuenta').text(0);
	$('#accountFather').val('0000000000');
	
	$('#nombre').val('');
	$('#descripcion').val('');
	$('#fechaDesde').val('');
	$('#fechaHasta').val('');	
	for(var i=5;i<9;i++){
		$('#codigo'+(i-4)).val('');
		$('#codigo'+(i-4)).attr("disabled", "disabled");
	}
	$('#cbArtCuarto').val(0);
	$('#cbCuadrDisp').val(0);
	$('#cbDeudaPubl').val(0);
	$('#cbObligacion').val(0);
	$('#cbPresup').val(0);
	
	$('#cbExePartCto').val(0);
	$('#cbSaldoCaja').val(0);
	$('#cbTipoCta').val(0);
	$('#cbImpPresup').val(0);
	
	$('#stateAccount').attr('src','images/check_on.png');
	
}
function estadoCuenta(objeto){	
	var message = '';
	titulo = 'Cuentas Presupuestarias';
	console.log($('#accountFather').val());
	if (parseInt( $('#accountFather').val())==0){	jAlert('Debe seleccionar la cuenta que desea anular',titulo);	return;	}
	
	
	
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