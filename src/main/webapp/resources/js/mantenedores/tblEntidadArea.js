function load(){
	entidadSubAreas();
}
function entidadSubAreas(){
	console.log("Paso 1");
	$('#ExpenseTableContainer').jtable('load');
	return false;
}
$(document).ready(function() {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Entidad Area',
		selecting: true, //Enable selecting
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
		actions: {
			listAction: 'listTblEntidadArea',
			createAction: 'addTblEntidadArea',
			updateAction: 'updTblEntidadArea',
			deleteAction: 'delTblEntidadArea'
		},messages: {
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
		},fields: {
			id: {title: 'ID',key:true,list:false},
			entid: {title: 'Entidad',type: 'hidden',},
			areaID: {title: 'Area',width: '10%',list: false, options: function(data) {return 'loadAreaOption';}},
			region: {title: 'Regi&oacute;n',width: '15%',edit: false,create:false},
			
			nombre: {title: 'Entidad',width: '10%',edit:false,create:false},
			codigo: {title: 'Codigo Area',width: '10%',create:false,edit:false},
			valor1: {title: 'Area',width: '10%',edit:false,create:false},
			
			usercreate: {width: '15%',edit: false,create: false,title: 'Usuario Creaci&oacute;n'},
			datecreate: {width: '15%',edit: false,create: false,title: 'Fecha Creaci&oacute;n'},
			dateupdate: {width: '15%',edit: false,create: false,title: 'Fecha Actualizaci&oacute;n'},
			
			anulacion: {title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create: false},
			
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', {
				region: $("#cbRegion :selected").val(),
				tentidad: $("#cbTipoEntidad :selected").val(),
				entidad: $("#cbEntidad :selected").val()
			});
			$("#Edit-entid").parent().parent().hide();
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', {
				region: $("#cbRegion :selected").val(),
				area: $("#cbArea :selected").val(),
				tentidad: $("#cbTipoEntidad :selected").val(),
				entidad: $("#cbEntidad :selected").val()
			}); 
			$("#Edit-entid").parent().parent().hide();
		}
	});
	$("#newItem").each(function(i){$(this).attr({'onClick' : 'loadInput()'});});
	$("#editForm").each(function(i){$(this).attr({'onClick' : 'loadInput()'});});
	$("#EditDialogSaveButton").each(function(i){		$(this).attr({'onClick' : 'loadInput()'});	});
	
	$("#AddRecordDialogSaveButton").each(function(i){	$(this).attr({'onClick' : 'loadInput()'});	});
	$('#LoadRecordsButton').attr('style','display:none');
});
function loadInput(){
	$("#Edit-reg").val($("#cbRegion :selected").val());
	$("#Edit-comunaId").val($("#cbComuna :selected").val());
	$("#Edit-tipoent").val($("#cbTipoEntidad :selected").val());
	$("#Edit-entid").val($("#cbEntidad :selected").val());
}
function loadBombo(){ loadData(); }
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
	e.preventDefault();
	$('#ExpenseTableContainer').jtable('load', {
			region: $("#cbRegion :selected").val(),
			area: $("#cbArea :selected").val(),
			tentidad: $("#cbTipoEntidad :selected").val(),
			entidad: $("#cbEntidad :selected").val()
		});
	});
	$('#LoadRecordsButton').click();
}
function cargaEjercicio(){
	console.log('loadInformes1: '+ ejercicio);
	
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
			$("#cbInforme").get(0).options.length = 0;		$("#cbInforme").get(0).options[0] = new Option("Selec. Informe", "-1");
			$.each(data.listaInformes, function(i, item){$("#cbInforme").get(0).options[$("#cbInforme").get(0).options.length] = new Option(item.tipoNombre, item.tipoId);});
			if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
		}
	});
}
function loadEntidad(region, tipoEntidad){
	var action='loadEntidadByRegTipoEnt?region='+region+'&tipoEntidad='+tipoEntidad;
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
			$("#cbEntidad").get(0).options.length = 0;
			$("#cbEntidad").get(0).options[0] = new Option("Selec. Entidad", "-1");
			$.each(data.listaEntidadReg, function(i, item){$("#cbEntidad").get(0).options[$("#cbEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);});
			if(data.listaEntidadReg.length>0){
				$('#cbEntidad').removeAttr("disabled");
			}else{
				$('#cbEntidad').attr("disabled", "disabled");
			}
		}
	});
}
function loadArea(Entidad){
	var action='loadAreaByEnt?Entidad=' + Entidad;
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
			$("#cbArea").get(0).options.length = 0;
			$("#cbArea").get(0).options[0] = new Option("Selec. Entidad", "-1");
			$.each(data.listaEntidadArea, function(i, item){$("#cbArea").get(0).options[$("#cbArea").get(0).options.length] = new Option(item.nombre, item.codigo);});
			if(data.listaEntidadArea.length>0){
				$('#cbArea').removeAttr("disabled");
			}else{
				$('#cbArea').attr("disabled", "disabled");
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