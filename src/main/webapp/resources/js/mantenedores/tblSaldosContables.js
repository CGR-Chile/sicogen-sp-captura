function load(){  entidadSubAreas();  }
function entidadSubAreas(){
	$('#ExpenseTableContainer').jtable('load', { comunas: $('#cbComunas option:selected').val(),tentidad: $('#cbTipoEntidad option:selected').val(),region: $('#cbRegion option:selected').val(),ejercicio: $('#cbEjercicio option:selected').val()});
	return false;
} 

$(document).ready(function() {       
	$('#ExpenseTableContainer').jtable({
		title: 'Saldos Inciales',
		selecting: true, //Enable selecting 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: false, //Enable sorting
		messages: {
			serverCommunicationError: 'Se ha producido un error al comunicarse con el servidor.',
			loadingMessage: 'Cargando Registros ...',
			noDataAvailable: 'No hay registros!',
			addNewRecord: 'Crear Registro',
			editRecord: 'Editar',
			areYouSure: '&iquest;Est&aacute; seguro?',
			deleteConfirmation: 'Se eliminar&aacute; este registro. &iquest;Est&aacute; seguro? ',
			save: 'Guardar',
			saving: 'Guardando',
			cancel: 'Cancelar',
			deleteText: 'Eliminar',
			deleting: 'Borrado',
			error: 'Error',
			close: 'Cerrar',
			cannotLoadOptionsFor: 'No se puede cargar las opciones para el campo {0}',
			pagingInfo: 'Mostrando: {0}-{1}, de: {2}',
			pageSizeChangeLabel: 'Numero de Registros',
			gotoPageLabel: 'ir a la p&aacute;gina',
			canNotDeletedRecords: '¡No se puede eliminar {0} de {1} registro',
			deleteProggress: 'Eliminado {0} de {1} archivos, procesamiento de ...'
		},actions: {
			listAction: 'listSaldosIniciales',
			createAction: 'addSaldoIncial',
			updateAction: 'updSaldoIncial',
			deleteAction: 'delSaldoIncial'
		},fields: {
			cuentaId: 				{title:'ID', key: true, list: false, create: false, edit: false },
			cuentaCod:				{width:'6%',edit:true,title:'Codigo Cuenta', list:true},
			cuentaAna:				{width:'6%',edit:true,title:'Codigo Analítico',list:false},
			cuentaNombre: 			{width:'20%',edit:true,title:'Nombre Cuenta'},
			cuentaSaldoDeudor:		{width:'10.3%',edit:true,title:'Saldo Deudor CLP'},
			cuentaSaldoAcreedor:	{width:'10.3%',edit:true,title:'Saldo Acreedor CLP'},
			cuentaSaldoDeudorDlr:	{width:'10.3%',edit:true,title:'Saldo Deudor DLR'}, 
			cuentaSaldoAcreedorDlr:	{width:'10.3%',edit:true,title:'Saldo Acreedor DLR' },
			cuentaVigencia:			{width:'6%',edit:false,title:'Activo'},
			ejercicioID:			{visibility: 'hidden', inputClass: 'InputHidden'}, 
			ejercicio:				{visibility: 'hidden', inputClass: 'InputHidden'},
			entidad:				{visibility: 'hidden', inputClass: 'InputHidden'}
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { comunas: $('#cbComunas option:selected').val(),tentidad: $('#cbTipoEntidad option:selected').val(),region: $('#cbRegion option:selected').val(),ejercicio: $('#cbEjercicio option:selected').val()});
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { comunas: $('#cbComunas option:selected').val(),tentidad: $('#cbTipoEntidad option:selected').val(),region: $('#cbRegion option:selected').val(),ejercicio: $('#cbEjercicio option:selected').val()});
		}
	});
	$('#LoadRecordsButton').attr('style','display:none'); 
	$("#newItem").each(function(i){
		$(this).attr({'onClick' : 'loadInput()'});
	});
	$(".jtable-command-button .jtable-edit-command-button").each(function(i){
		$(this).attr({'onClick' : 'loadInput()'});
	});
	$('.jtable thead tr').css({'height':'45px'});
});  
    

function loadInput(){
	$("#Edit-ejercicio").val($('#cbEjercicio option:selected').val());
	$("#Edit-entidad").val($('#cbComunas option:selected').val());
}

function loadBombo(){	loadData();	}

function loadData(){
	$('#ExpenseTableContainer').jtable('load', { comunas: $('#cbComunas option:selected').val(),tentidad: $('#cbTipoEntidad option:selected').val(),region: $('#cbRegion option:selected').val(),ejercicio: $('#cbEjercicio option:selected').val()});
}

function cargaEjercicio(){
	var action='chargeEjercicio?ejercicio='+ejercicio;
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
			
			$("#cbInforme").get(0).options.length = 0;
			$("#cbInforme").get(0).options[0] = new Option("Selec. Informe", "-1"); 
			$.each(data.listaInformes, function(i, item){$("#cbInforme").get(0).options[$("#cbInforme").get(0).options.length] = new Option(item.tipoNombre, item.tipoId);});
			
			if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
		}
	});
}

function loadComuna(region){
	var action='loadEntidadByRegTipoEnt?region='+region+'&tipoEntidad='+$("#cbTipoEntidad :selected").val();
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
				
			$("#cbComunas").get(0).options.length = 0;
			$("#cbComunas").get(0).options[0] = new Option("Selec. Comuna", "-1"); 
			$.each(data.listaEntidadReg, function(i, item){$("#cbComunas").get(0).options[$("#cbComunas").get(0).options.length] = new Option(item.nombre, item.codigo);});
			
			if(data.listaEntidadReg.length>0){ 
				$('#cbComunas').removeAttr("disabled"); 
			}else{ 
				$('#cbComunas').attr("disabled", "disabled");
			}
		}
	});
}

function loadTipoEntidad(Comuna){
	var action='loadTipoEntidad?Comuna=' + Comuna;
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
			
			$("#cbTipoEntidad").get(0).options.length = 0;
			$("#cbTipoEntidad").get(0).options[0] = new Option("Selec. Area", "-1"); 
			$.each(data.listaTipoEntidad, function(i, item){$("#cbTipoEntidad").get(0).options[$("#cbTipoEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);});
			
			if(data.listaTipoEntidad.length>0){ 
					$('#cbTipoEntidad').removeAttr("disabled"); 
				}else{ 
					$('#cbTipoEntidad').attr("disabled", "disabled");
				}
		}
    });
}
