function SunCampos(inf, ejer){
	$('#ExpenseTableContainer').jtable('load', {informe:$('#cbLInforme option:selected').val(),ejercicio:$('#cbEjercicioC1 option:selected').val()});
} 

function loadTblInforme(value){
	var action='listInforme?subTipoInf=' + $("#cbLstSubTipoInforme option:selected").val();
	$.ajax({url: action,
		type: "POST",
		dataType: "json",	    
		error: function(data){	    	
	    	$('#cbLInforme').empty();
	    	$("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    },
	    success: function(data){
	    	$('#cbLInforme').empty();
	    	$("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    	$.each(data.listaInformes, function(i, itm) {	    		
	    		$("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option(itm.nombre,itm.id );
            });
	    }
	});
}

function loadTblWS(informe, periodo){
	SunCampos(informe, periodo);
}

$(document).ready(function() {          		 
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Periodos Informe WEBSERVICES',
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
		},actions: {
			listAction: 'listTblPeriodoInformeWS',
			createAction: 'addTblPeriodoInformeWS',
			updateAction: 'updTblPeriodoInformeWS',
			deleteAction: 'delTblPeriodoInformeWS'
		},
		fields:{
			id:{		title: 'ID',key: true,list: false,create: false,edit: false},
			periodo:{	title: 'Periodo',width: '15%',list: true,options: function(data) {return 'GetPeriodosOption';}},
			url:{		title: 'Version Url',width: '15%',options: function(data) {return 'GetWebServicesOption';}},
			tipo:{		title: 'Tipo',width: '15%',options: { '1': 'Carga', '2': 'Validaci&oacute;n', '3': 'Env&iacute;o' }},
			ejercicio:{	visibility: 'hidden',inputClass: 'InputHidden'},
			informe: {	visibility: 'hidden',inputClass: 'InputHidden'},
			anulacion:{	title: 'Fecha Anulaci&oacute;n',edit: false,create: false,width: '15%'},
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', {informe:$('#cbLInforme option:selected').val(),ejercicio:$('#cbEjercicioC1 option:selected').val()});
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', {informe:$('#cbLInforme option:selected').val(),ejercicio:$('#cbEjercicioC1 option:selected').val()});
		},formCreated: function (event, data) {
			alert($("#cbEjercicioC1 option:selected").val());
			$("#Edit-informe").val($("#cbLInforme option:selected").val());
			$("#Edit-ejercicio").val($("#cbEjercicioC1 option:selected").val());
		}
	});
    $("#newItem").each(function(i){	$(this).attr({'onClick' : 'loadInput()'});});
}); 

function loadInput(){
	$("#Edit-ejercicio").val($("#cbEjercicioC1 option:selected").val());
	$("#Edit-informe").val($("#cbLInforme option:selected").val());
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
			$("#cbPeriodosC1").get(0).options.length = 0;
			$("#cbPeriodosC1").get(0).options[0] = new Option("Selec. Periodo", "-1"); 
			$.each(data.listaPeriodos, function(i, item) {			                	
				$("#cbPeriodosC1").get(0).options[$("#cbPeriodosC1").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);
			});
		}
	});
}
function loadSubTipoInforme(value){
	var action='loadSubTipoInforme?tipoInfo=' + $("#cbtipoInforme option:selected").val();
	$.ajax({url: action,
		type: "POST",
		dataType: "json",	    
		error: function(data){	    	
			$('#cbLstSubTipoInforme').empty();
			$("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option( 'Selec.',-1);
		},
		success: function(data){
			$('#cbLstSubTipoInforme').empty();
			$("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option( 'Selec.',-1);
			$.each(data.listaSubTipoInf, function(i, itm) {	    		
				$("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option(itm.nombre,itm.subTipoID );
			});
		}
	});
}
function loadEjercicios(){
	var action = 'ChangeEjercicio.action';
	$.ajax({
		url: action,
		type:'POST',
		dataType:'json',
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('Error: ' + textStatus);
			alert(XMLHttpRequest.responseText);
		},
		success: function(data){
			$("#cbEjercicioC1").get(0).options.length = 0;
			$("#cbEjercicioC1").get(0).options[0] = new Option("Selec. Ejercicio", "-1"); 
			list="listaEjercicios";
			$.each(data.listaEjercicios, function(i, item) {			                	
				$("#cbEjercicioC1").get(0).options[$("#cbEjercicioC1").get(0).options.length] = new Option(item.ejercicioNombre, item.ejercicioId);
			});			                
		}
	});
}