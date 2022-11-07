function SunCampos(ejercicio,informe){$('#ExpenseTableContainer').jtable('load', { informe:informe,ejercicio:ejercicio});} 
function loadTbl(ejercicio,informe){	SunCampos(ejercicio,informe);	}
$(document).ready(function() {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Periodos Informe',
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
			listAction:  'listTblPeriodoInforme',
			createAction:'addTblPeriodoInforme',
			updateAction:'updTblPeriodoInforme',
			deleteAction:'delTblPeriodoInforme'
		},fields: { 
			id: {title:'ID',key: true,list:false,create:false,edit:false},			
			//perID:{title:'Periodo',width:'15%',list:true,options:function(data){return $.map($('#cbPeriodos')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			//periodo:{visibility: 'hidden',inputClass: 'InputHidden'},
			//nombre:{title:'Periodo',width: '15%',create: false, edit:false},
			padreId:{title:'Periodo',list:false,options:function(data){return $.map($('#cbPeriodos')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			nombrePadre:{title:'Periodo',width:'15%',create: false, edit:false},
			padreId2:{title:'Informe',width:'15%',list:false,options: function(data) {return $.map($('#cbInformes')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			codigo:{title: 'secuencia',width: '15%'},
			anulacion:{edit: false,create: false,title: 'Fecha Anulaci&oacute;n',width: '15%'},
		},
		rowInserted: function(event, data){$('#ExpenseTableContainer').jtable('selectRows', data.row);},
		recordAdded: function(event, data){   $('#ExpenseTableContainer').jtable('load', { ejercicio:$("#cbEjercicio option:selected").val(),informe:$("#cbInformes option:selected").val()});},
		recordUpdated: function(event, data){ $('#ExpenseTableContainer').jtable('load', { ejercicio:$("#cbEjercicio option:selected").val(),informe:$("#cbInformes option:selected").val()});},
	});
	$("#newItem").each(function(i){
		$(this).attr({'onClick' : 'loadInput()'});
	});
});
function loadInput(){
	$('#Edit-inf').val($("#cbInformes option:selected").val());
	$("#Edit-periodo").val($("#cbPeriodos option:selected").val());
	$("#Edit-periodo").parent().parent().hide();
}
function loadInformesyPeriodos(ejercicio){
	var action = 'getInfAndPerd.action?ejercicio=' + ejercicio; 
	$.ajax({
		 url: action,type: "POST",dataType: "json",
			error: function(XMLHttpRequest, textStatus, errorThrown){console.log('Error ' + textStatus);console.log(errorThrown);console.log(XMLHttpRequest.responseText);},
			success: function(data){
				$("#cbInformes").get(0).options.length = 0;
				$("#cbInformes").get(0).options[0] = new Option("Selec. Informe", "-1"); 
				
				$("#cbPeriodos").get(0).options.length = 0;
				$("#cbPeriodos").get(0).options[0] = new Option("Selec. Periodos", "-1");
				
				$.each(data.periodosInformes.listInformes, function(i, item) {$("#cbInformes").get(0).options[$("#cbInformes").get(0).options.length] = new Option(item.informeNombre, item.informeId);});
				$.each(data.periodosInformes.listPeriodos, function(i, item) {$("#cbPeriodos").get(0).options[$("#cbPeriodos").get(0).options.length] = new Option(item.periodoNombre, item.periodoId);});
			}
	});
}