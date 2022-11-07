function load(){	entidadSubAreas();	}
function entidadSubAreas(){		$('#ExpenseTableContainer').jtable('load');		return false;	} 
$(document).ready(function() {       
	$('#ExpenseTableContainer').jtable({
		title: 'Entidad Ventana&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;             ',
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
			listAction: 'listTblEntidadVentana',
			createAction: 'addTblEntidadVentana',
			updateAction: 'updTblEntidadVentana',
			deleteAction: 'delTblEntidadVentana'
		},
		fields: {
			id: {title: 'ID', key: true,list:false},
			entid: {title: 'Entidad',width: '15%',options: function(data) {return $.map($('#cbEntidad')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			param: {title: 'Tipo Par&aacute;metro',width: '15%',options: function(data) {return 'listTblParamByID?paramID=4';}},
			usercreate: {title: 'Tipo Entidad',width: '20%' ,edit: false,create:false},
			datecreate: {title: 'id Comuna',width: '20%',list:false},
			
			usercreate: {title: 'Usuario Creaci&oacute;n',width: '15%',edit: false,create: false},
			datecreate: {title: 'Fecha Creaci&oacute;n',width: '15%',edit: false,create: false},
			dateupdate: {title: 'Fecha Actualizaci&oacute;n',width: '15%',edit: false,create: false},
			isValid: 	{title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create: false}
		},
		formClosed: function (event, data) {
			data.form.validationEngine('hide');
			data.form.validationEngine('detach');
		},
		rowInserted: function (event, data) {	$('#ExpenseTableContainer').jtable('selectRows', data.row);	},
		recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { 	
				region: $("#cbRegion :selected").val(),
				tentidad:  $("#cbTipoEntidad :selected").val(),
				entidad:  $("#cbEntidad :selected").val()
			});  
		},
		recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', {
				region: $("#cbRegion :selected").val(),
				tentidad:  $("#cbTipoEntidad :selected").val(),
				entidad:  $("#cbEntidad :selected").val()
			});   
		}             
	});
	$("#newItem").each(function(i){$(this).attr({'onClick' : 'loadInput()'});});
	$("#AddRecordDialogSaveButton").each(function(i){$(this).attr({'onClick' : 'loadBombo()'});});
	$('#LoadRecordsButton').attr('style','display:none'); 
});  
    

function loadInput(){
	console.log($("#Edit-param").val());
	/*var x = $("#cbRegion :selected").val();	$("#Edit-reg").val(x);
	x = $("#cbComuna :selected").val();	$("#Edit-comunaId").val(x);
	x = $("#cbTipoEntidad :selected").val();	$("#Edit-tipoent").val(x);
	  $("#Edit-reg").parent().parent().hide();
	  $("#Edit-comunaId").parent().parent().hide();
	  $("#Edit-tipoent").parent().parent().hide();
	  $("#Edit-comuna").parent().parent().hide();*/
}
function loadBombo(){	loadData();	}
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			region: $("#cbRegion :selected").val(),
			area:  $("#cbArea :selected").val(),
			tentidad:  $("#cbTipoEntidad :selected").val(),
			entidad:  $("#cbEntidad :selected").val()
		});
		});
	$('#LoadRecordsButton').click();}
function loadRegiones(){
	var action='loadRegion.action';
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
				$("#cbRegion").get(0).options.length = 0; $("#cbRegion").get(0).options[0] = new Option("Selec. Regi&oacute;n", "-1"); 
				$.each(data.listaRegiones, function(i, item){$("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.regId);});
				
				if(data.listaRegiones.length>0){ 
					$('#cbRegion').removeAttr("disabled"); 
				}else{ 
					$('#cbRegion').attr("disabled", "disabled");
				}
			}
	});
}
function loadEntidad(region, tipoEntidad){
	var action='loadEntidadByRegTipoEnt?region=' + region+ '&tipoEntidad='+tipoEntidad;
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