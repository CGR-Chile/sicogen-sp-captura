function load(){	SunTipoInformes();}

function SunTipoInformes(value){
	$('#Edit-StudentId').val(value);
	$('#ExpenseTableContainer').jtable('load', { tipoInf: $('#cbtipoInforme').val()});
} 

$(document).ready(function () {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Subtipo Informes',
		selecting: true, //Enable selecting 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
		defaultSorting: 'Name ASC', //Set default sorting
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
			listAction: 'obtenerSubTipoInforme',
			createAction: 'addTblSubTipoInforme',
			updateAction: 'updateSubTipoInforme.action',
			deleteAction: 'delSubTipoInforme'
		},fields: {
			tipoInf: {  title: 'tipoInf', width: '10%',visibility: 'hidden',inputClass: 'InputHidden'},
			subTipoID: {title: 'Sub Tipo',key: true,list: false,create: false,edit: false,visible:false},
			codigo: {   title: 'Codigo', edit: true, create: true, width: '50px', constructorinputClass: 'validate[required]'},
			nombre: {	title: 'Nombre',width: '400px',edit: true,inputClass: 'validate[required]'},
			isValid: {	title: 'Fecha Anulación',edit: false,create: false,width: '15%',list: true,}
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
 		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { tipoInf:$("#cbtipoInforme option:selected").val()});
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { tipoInf:$("#cbtipoInforme option:selected").val()});
		},
	});
	$("#newItem").each(function(i){
		$(this).attr({'onClick' : 'loadInput()'});
	});
	load();
});   

function loadInput(){
	$("#Edit-tipoInf").val($("#cbtipoInforme option:selected").val());
	$("#Edit-tipoInf").parent().parent().hide(); 
}