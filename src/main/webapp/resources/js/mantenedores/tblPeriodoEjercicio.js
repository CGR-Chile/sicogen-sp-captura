function SunCampos(value){
	$('#ExpenseTableContainer').jtable('load', { periodo:value, ejercicio:$("#cbEjercicio option:selected").val()});
}

function loadTbl(value){
	SunCampos(value);
}

$(document).ready(function() {          		 
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Periodos Ejercicio',
		selecting: true, //Enable selecting 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
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
		},actions:{
             listAction: 	'listTblPeriodoEjercicio',
             createAction: 'addTblPeriodoEjercicio',
             updateAction: 'updTblPeriodoEjercicio',
             deleteAction: 'delTblPeriodoEjercicio'
		},fields:{   
			id: 			{title: 'ID',key: true,list: false,create: false,edit: false},
			padreId: 		{title: 'Ejercicio Id',list: false, width: '15%',options: function(data) {return $.map($('#cbEjercicio')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			nombrePadre:	{title: 'Ejercicio',list:true,width: '50px',list:true,edit: false,create: false},
			
			padreId2: 		{title: 'Periodo Id',list: false, width: '15%',options: function(data) {return $.map($('#cbPeriodos')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			nombrePadre2:	{title: 'Periodo',list:true,width: '50px',list:true,edit: false,create: false},
			//padreId: {title: 'Ejercicio',list: false, width: '15%',options: function(data) {return $.map($('#cbEjercicio')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			//nombrePadre: {title: 'Codigo Ejercicio',width: '15%',list:true,edit: false,create: false},
			//nombrePadre2: {title: 'Periodo',width: '15%',options: function(data) {return $.map($('#cbPeriodos')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			//padreId2: {visibility: 'hidden',inputClass: 'InputHidden'},
			anulacion: {edit: false,create: false,title: 'Fecha Anulaci&oacute;n',width: '15%'}
		},
		rowInserted:  function(event,data){$('#ExpenseTableContainer').jtable('selectRows', data.row);},
		recordAdded:  function(event,data){
			$('#ExpenseTableContainer').jtable('load', { periodo:$("#cbPeriodos option:selected").val(),ejercicio:$("#cbEjercicio option:selected").val()});
			SunCampos($("#cbPeriodos option:selected").val());
		},recordUpdated:function(event,data){
			$('#ExpenseTableContainer').jtable('load', { periodo:$("#cbPeriodos option:selected").val(),ejercicio:$("#cbEjercicio option:selected").val()});
			SunCampos($("#cbPeriodos option:selected").val());
		}
	});
	$("#newItem").each(function(i){
		$(this).attr({'onClick' : 'loadInput()'});
	});
}); 

function loadInput(){
	$("#Edit-periodo").val($("#cbPeriodos option:selected").val());
	$("#Edit-periodo").hide();
}
    
function loadPeriodo(ejercicio){
	var action = 'getPeriodos.action?ejercicioId=' + ejercicio; 
	$.ajax({
		url: action,
		type: "POST",
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('Error: ' + textStatus);
			alert(XMLHttpRequest.responseText);
		},
		success: function(data){
			$("#cbPeriodos").get(0).options.length = 0;
			$("#cbPeriodos").get(0).options[0] = new Option("Selec. Periodo", "-1"); 

			$.each(data.listaPeriodos, function(i, item) {			                	
				$("#cbPeriodos").get(0).options[$("#cbPeriodos").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
			});			                
		}
	});
}